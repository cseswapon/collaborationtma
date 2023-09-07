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
    alert('Team Create Successfully')
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
      <div className="container">
        <h1>Create Team</h1>
      <form onSubmit={handelSubmit}>
        <div>
          <label>Team Name</label><br />
            <input
              required
              className="my-2 w-100 p-2"
            value={team}
            type="text"
            placeholder="Team Name"
            onChange={(e) => setTeam(e.target.value)}
          />
        </div>
        <div>
          <button className="p-1 my-3 btn btn-primary w-100" type="submit">Create Team</button>
        </div>
      </form>
      </div>
      
    </>
  );
};

export default CreateTeam;
