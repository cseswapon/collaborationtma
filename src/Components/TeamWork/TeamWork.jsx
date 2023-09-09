import { useEffect, useState } from "react";
import Header from "../Share/Header/Header";
import TeamWorkList from "./TeamWorkList";

const TeamWork = () => {
  const [team, setTeam] = useState([]);
  const [newTeam, setNewTeam] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "In Progress",
    teamName: team[0],
  });

  // console.log(team, newTask);

  const handelSubmit = (e) => {
    e.preventDefault();
    const updatedTeam = [...newTeam, newTask];
    localStorage.setItem("team-task", JSON.stringify(updatedTeam));
    setNewTeam(updatedTeam);
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
      status: "In Progress",
      teamName: "",
    });
  };

  useEffect(() => {
    const teamStor = () => {
      const teamData = localStorage.getItem("team");
      const teamDataTask = JSON.parse(teamData) || [];
      setTeam(teamDataTask);
    };

    const dataStore = () => {
      const teamTaskData = localStorage.getItem("team-task");
      const parsedTeamTask = JSON.parse(teamTaskData) || [];
      setNewTeam(parsedTeamTask);
    };
    dataStore();
    teamStor();
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updatedData = [...newTeam];
    updatedData[index].status = newStatus;
    localStorage.setItem("team-task", JSON.stringify(updatedData));
    setNewTeam(updatedData);
  };

  const teamFilter = (name) => {
    if (name === "") {
      // If name is empty, show all tasks
      setNewTeam(JSON.parse(localStorage.getItem("team-task")) || []);
    } else {
      // Filter tasks by team name
      const filteredTasks = JSON.parse(localStorage.getItem("team-task")) || [];
      const filteredByTeam = filteredTasks.filter(
        (task) => task.teamName === name
      );
      setNewTeam(filteredByTeam);
    }
  };

  // console.log(team);

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="my-2 fw-bold">Team Work</h1>
        <form onSubmit={handelSubmit}>
          <div>
            <label>Title:</label>
            <br />
            <input
              required
              className="w-100 my-2 py-2 px-2"
              placeholder="title"
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
          </div>
          <div>
            <label>Description:</label>
            <br />
            <textarea
              required
              className="w-100 my-2 py-2 px-2"
              placeholder="description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
          </div>
          <div>
            <label>Due Date:</label>
            <br />
            <input
              required
              className="w-100 my-2 py-2 px-2"
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
            />
          </div>
          <div>
            <label>Priority:</label>
            <br />
            <select
              required
              className="w-100 my-2 py-2 px-2"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label>Team Name</label>
            <br />
            <select
              required
              className="w-100 my-2 py-2 px-2"
              value={newTask.teamName}
              onChange={(e) =>
                setNewTask({ ...newTask, teamName: e.target.value })
              }
            >
              <option value="">select your team</option>
              {team?.map((name, i) => (
                <option key={i} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <button className="mt-3 btn btn-primary w-100" type="submit">
            Create Task
          </button>
        </form>
          <TeamWorkList
            handleStatusChange={handleStatusChange}
            newTeam={newTeam}
            team={team}
            teamFilter={teamFilter}
          />
        
      </div>
    </>
  );
};

export default TeamWork;
