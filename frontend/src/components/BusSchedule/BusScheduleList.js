import React, { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";
import { Link } from "react-router-dom";

function BusScheduleList() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    ApiService.getSchedules()
      .then((data) => setSchedules(data))
      .catch((error) => console.error("Error fetching schedules:", error));
  }, []);

  const deleteSchedule = (id) => {
    ApiService.deleteSchedule(id)
      .then(() => setSchedules((prev) => prev.filter((schedule) => schedule.id !== id)))
      .catch((error) => console.error("Error deleting schedule:", error));
  };

  return (
    <div className="container mt-5">
      <h1>Bus Schedules</h1>
      <Link to="/schedules/add" className="btn btn-primary mb-3">Add Schedule</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Route Name</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Frequency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.routeName}</td>
              <td>{schedule.departureTime}</td>
              <td>{schedule.arrivalTime}</td>
              <td>{schedule.frequency}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteSchedule(schedule.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BusScheduleList;