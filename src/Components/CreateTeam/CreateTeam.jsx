import { useEffect, useState } from "react";
import Header from "../Share/Header/Header";

const CreateTeam = () => {
  const [team, setTeam] = useState("");
  const [allTeam, setAllTeal] = useState([]);
  const handelSubmit = (e) => {
      e.preventDefault();
      if (!team) {
        return
      }
    localStorage.setItem("team", JSON.stringify([...allTeam, team]));
    setAllTeal([...allTeam, team]);
    // console.log(team);
    setTeam("");
  };
useEffect(() => {
  return () => {
    const sessionData = localStorage.getItem("team");
    if (sessionData) {
      setAllTeal(JSON?.parse(sessionData));
    }
  };
}, []);
  return (
    <>
      <Header />
      <h1>Create Team</h1>
      <form onSubmit={handelSubmit}>
        <div>
          <label>Team Name</label>
          <input
            value={team}
            type="text"
            placeholder="Team Name"
            onChange={(e) => setTeam(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Create Team</button>
        </div>
      </form>
    </>
  );
};

export default CreateTeam;
