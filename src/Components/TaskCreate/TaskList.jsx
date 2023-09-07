
// eslint-disable-next-line react/prop-types
const TaskList = ({setFilter,setSortBy,sortedData,handleStatusChange}) => {
    return (
      <>
        <h1>Task List</h1>
        <p>Filter Data</p>
        {/* sort data */}
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("inProgress")}>In Progress</button>
        <button onClick={() => setSortBy("dueDate")}>Sort by Due Date</button>
        <button onClick={() => setSortBy("priority")}>Sort by Priority</button>
        <table>
          <thead>
            <tr>
              <td>Title</td>
              <td>Description</td>
              <td>DueDate</td>
              <td>Priority</td>
              <td>Status</td>
              <td>TeamId</td>
              <td>AssignedTo</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {/* eslint-disable-next-line react/prop-types */}
            {sortedData.map((data, i) => (
              <tr key={i}>
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td>{data.dueDate}</td>
                <td>{data.priority}</td>
                <td>{data.status}</td>
                <td>{data.teamId}</td>
                <td>{data.assignedTo}</td>
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

export default TaskList;