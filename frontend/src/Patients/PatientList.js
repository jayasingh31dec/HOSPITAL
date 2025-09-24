import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const PatientList = () => {
  const { token } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const res = await fetch("http://localhost:5000/api/patients", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setPatients(data);
    };
    fetchPatients();
  }, [token]);

  return (
    <div className="container mt-5">
      <h2>Patients</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Diagnosis</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td>{p.diagnosis}</td>
              <td>
                <button className="btn btn-sm btn-info me-2">View</button>
                <button className="btn btn-sm btn-warning me-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
