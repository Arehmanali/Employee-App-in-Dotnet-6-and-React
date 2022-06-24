import { useState, useEffect } from "react";
import AddEmployee from "./AddEmployee";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("employees")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setEmployees(data);
      });
  }, [addNew]);

  const saveEmployee = (newEmployee) => {
    fetch("employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    }).then(() => setAddNew(!addNew));
  };

  const renderForecastsTable = (employees) => {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Joining Date</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.employeeId}>
              <td>{emp.employeeId}</td>
              <td>{emp.employeeName}</td>
              <td>{emp.department}</td>
              <td>{emp.dateOfJoining.substr(0, 10)}</td>
              <td>{emp.photoFilename}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  let contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    renderForecastsTable(employees)
  );

  return (
    <div>
      <h1 id="tabelLabel">Employees</h1>
      <AddEmployee saveEmployee={saveEmployee} />
      {contents}
    </div>
  );
};

export default Employee;
