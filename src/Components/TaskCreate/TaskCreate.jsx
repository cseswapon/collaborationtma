import { useEffect, useState } from "react";
import useDb from "../../hooks/useDb";
import TaskList from "./TaskList";

const TaskCreate = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    assignedTo: "",
    status: "In Progress",
    teamId: "",
  });

  // console.log(newTask);

  const [storData, setStorData] = useState([]);

  const addTask = () => {
    if (newTask.title.trim() === "") return;
    const taskData = {
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      assignedTo: newTask.assignedTo,
      status: newTask.status,
      teamId: newTask.teamId,
    };

    // Use spread operator to create a new array with the taskData added
    setStorData([...storData, taskData]);

    // Save the updated array to sessionStorage
    localStorage.setItem("task", JSON?.stringify([...storData, taskData]));

    alert("Task Added");

    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
      assignedTo: "",
      status: "In Progress",
      teamId: "",
    });
  };

  const [allUser, setAllUser] = useState([]);

  const auth = useDb();
  useEffect(() => {
    auth.getAllUserInfo((user) => setAllUser(user));
    return () => {
      const sessionData = localStorage.getItem("task");
      if (sessionData) {
        setStorData(JSON?.parse(sessionData));
      }
    };
  }, []);

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");

  const filteredData = storData.filter((task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return task.status === "Completed";
    } else if (filter === "pending") {
      return task.status === "Pending";
    } else if (filter === "inProgress") {
      return task.status === "In Progress";
    }
    return true;
  });

  const sortedData = [...filteredData].sort((taskA, taskB) => {
    if (sortBy === "dueDate") {
      return new Date(taskA.dueDate) - new Date(taskB.dueDate);
      // console.log('alert');
    } else if (sortBy === "priority") {
      const priorityOrder = { Low: 0, Medium: 1, High: 2 };
      return priorityOrder[taskA.priority] - priorityOrder[taskB.priority];
    }
    return 0; // Default to no sorting
  });

  return (
    <div className="container">
      <h2>Task Manager</h2>
      <div>
        <label>Title:</label>
        <br />
        <input
          className="w-100 p-2 my-1"
          required
          placeholder="title"
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
      </div>
      <div>
        <label>Description:</label>
        <br />
        <textarea
          className="w-100 p-2 my-1"
          required
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
          className="w-100 p-2 my-1"
          required
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
      </div>
      <div>
        <label>Priority:</label>
        <br />
        <select
          className="w-100 p-2 my-1"
          required
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label>Assigned To:</label>
        <br />
        <select
          className="w-100 p-2 my-1"
          required
          value={newTask.assignedTo}
          onChange={(e) =>
            setNewTask({ ...newTask, assignedTo: e.target.value })
          }
        >
          {allUser.map(({ email }, i) => (
            <option key={i} value={email}>
              {email}
            </option>
          ))}
        </select>
      </div>
      {/* <div>
          <label>Team Name</label>
          <input
            placeholder="teamId"
            type="text"
            value={newTask.teamId}
            onChange={(e) => setNewTask({ ...newTask, teamId: e.target.value })}
          />
        </div> */}
      <div>
        <button className="btn btn-primary my-2 w-100" onClick={addTask}>
          Add Task
        </button>
      </div>
      {/* Task List */}
      <TaskList
        setFilter={setFilter}
        setSortBy={setSortBy}
        sortedData={sortedData}
        setStorData={setStorData}
        storData={storData}
      />
    </div>
  );
};

export default TaskCreate;
