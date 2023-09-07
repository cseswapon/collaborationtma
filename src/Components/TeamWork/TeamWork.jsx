import { useEffect, useState } from "react";
import Header from "../Share/Header/Header";

const TeamWork = () => {
  const [team, setTeam] = useState([]);
  const [newTeam, setNewTeam] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "In Progress",
    teamName: "",
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    //   console.log(newTask);
    localStorage.setItem("team-task", JSON.stringify([...newTeam, newTask]));
    setNewTeam([...newTeam, newTask]);
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
      status: "In Progress",
      teamName: "",
    });
  };
  const [allTask, setAllTask] = useState([]);

  useEffect(() => {
    const dataStore = async () => {
      const team = await localStorage.getItem("team");
      const teamTask = await localStorage.getItem("team-task");
      setAllTask(JSON.parse(teamTask));
      setTeam(JSON.parse(team));
      setNewTeam(JSON.parse(teamTask));
    };
    dataStore();
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updatedData = [...newTeam];
    updatedData[index].status = newStatus;
    setNewTeam(updatedData);
    localStorage.setItem("team-task", JSON.stringify(updatedData));
  };

  const teamFilter = (name) => {
    // console.log(name, newTeam);
    const sortFilter = newTeam.filter((value) => value.teamName === name);
    setAllTask(sortFilter);
    console.log(newTeam);
  };
  return (
    <>
      <Header />
      <h1>Team Work</h1>
      <form onSubmit={handelSubmit}>
        <div>
          <label>Title:</label>
          <input
            placeholder="title"
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            placeholder="description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
          />
        </div>
        <div>
          <label>Priority:</label>
          <select
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
          <select
            value={newTask.teamName}
            onChange={(e) =>
              setNewTask({ ...newTask, teamName: e.target.value })
            }
          >
            {team?.map((name, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
      <h1>Team Work List</h1>
      <p>Team Member Task Filtering</p>
      <button onClick={() => setAllTask(newTeam)}>all</button>
      {team.map((item, i) => (
        <button onClick={() => teamFilter(item)} key={i}>
          {item}
        </button>
      ))}
      <br />
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>DueDate</td>
            <td>Priority</td>
            <td>Status</td>
            <td>Team Name</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {/* eslint-disable-next-line react/prop-types */}
          {allTask.map((data, i) => (
            <tr key={i}>
              <td>{data.title}</td>
              <td>{data.description}</td>
              <td>{data.dueDate}</td>
              <td>{data.priority}</td>
              <td>{data.status}</td>
              <td>{data.teamName}</td>
              <td>
                <select
                  value={data.status}
                  onChange={(e) => handleStatusChange(i, e.target.value)}
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TeamWork;
