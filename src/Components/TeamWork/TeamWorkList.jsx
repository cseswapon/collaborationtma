import React from 'react';

const TeamWorkList = ({team,newTeam,handleStatusChange,teamFilter}) => {
    return (
      <>
        <div className="my-3">
          {team.length>0&&<h1>Team Work List</h1>}
          {team.length>0&&<p className="my-3 fw-bold">Team Member Task Filtering</p>}
          {team.map((item, i) => (
            <button
              className="btn btn-outline-primary me-3 "
              onClick={() => teamFilter(item)}
              key={i}
            >
              {item}
            </button>
          ))}
          <br />
          {newTeam.length>0 && <table className="table text-center my-3">
            <thead>
              <tr className="fw-bold">
                <td>Id</td>
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
              {newTeam.map((data, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.dueDate}</td>
                  <td>{data.priority}</td>
                  <td>{data.status}</td>
                  <td>{data.teamName}</td>
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
          </table>}
        </div>
      </>
    );
};

export default TeamWorkList;