
// eslint-disable-next-line react/prop-types
const TaskList = ({ setFilter, setSortBy, sortedData, storData,setStorData}) => {

  const handleStatusChange = (index, newStatus) => {
    const updatedData = [...storData];
    updatedData[index] = { ...updatedData[index], status: newStatus };
    setStorData(updatedData);
    localStorage.setItem("task", JSON.stringify(updatedData));
  };

    return (
      <div className="my-5">
        <h1>Task List</h1>
        <hr />
        <p className="mb-0 fw-bold">Filter Data</p>
        {/* sort data */}
        <div className="my-2">
          <button className="btn btn-primary" onClick={() => setFilter("all")}>
            All
          </button>
          <button
            className="btn btn-danger mx-3"
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className="btn btn-warning mx-3"
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className="btn btn-dark mx-3"
            onClick={() => setFilter("inProgress")}
          >
            In Progress
          </button>
          <button
            className="btn btn-outline-primary mx-3"
            onClick={() => setSortBy("dueDate")}
          >
            Sort by Due Date
          </button>
          <button
            className="btn btn-outline-danger mx-3"
            onClick={() => setSortBy("priority")}
          >
            Sort by Priority
          </button>
        </div>

        {/* eslint-disable-next-line react/prop-types */}
        {sortedData?.length > 0 ? (
          <table className="my-4 table text-center">
            <thead>
              <tr className="fw-bold">
                <td>Title</td>
                <td>Description</td>
                <td>DueDate</td>
                <td>Priority</td>
                <td>Status</td>
                {/* <td>TeamId</td> */}
                {/* <td>AssignedTo</td> */}
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {/* eslint-disable-next-line react/prop-types */}
              {sortedData.map((data, i) => (
                <tr className="py-2" key={i}>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.dueDate}</td>
                  <td>{data.priority}</td>
                  <td>{data.status}</td>
                  {/* <td>{data.teamId}</td> */}
                  {/* <td>{data.assignedTo}</td> */}
                  <td>
                    <select
                      className="form-select"
                      aria-label="Default select example"
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
        ) : (
          <p>loading...</p>
        )}
      </div>
    );
};

export default TaskList;