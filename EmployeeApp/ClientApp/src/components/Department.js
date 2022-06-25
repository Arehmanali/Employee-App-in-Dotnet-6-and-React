import { useState, useEffect, useContext } from "react";
import AddDepartment from "./AddDepartment";
import { AppContext } from "../store/app-context";

const Department = () => {
  const appContext = useContext(AppContext);

  const [departments, setDepartments] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("departments", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        appContext.setDepartments(data);
        console.log(appContext.departments);
        setDepartments(data);
      });
  }, [addNew]);

  const saveDepartment = (depName) => {
    fetch("departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departmentName: depName,
      }),
    }).then(() => setAddNew(!addNew));
  };

  const renderForecastsTable = (departments) => {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Department Name</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dep) => (
            <tr key={dep.departmentId}>
              <td>{dep.departmentId}</td>
              <td>{dep.departmentName}</td>
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
    renderForecastsTable(departments)
  );

  return (
    <div>
      <h1 id="tabelLabel">Departments</h1>
      <AddDepartment saveDepartment={saveDepartment} />
      {contents}
    </div>
  );
};

export default Department;
