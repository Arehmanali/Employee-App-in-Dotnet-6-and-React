import { useState, useEffect } from "react";

const Department = () => {
  const [forecasts, setForecasts] = useState("");
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
        setForecasts(data);
      });
  }, []);

  const renderForecastsTable = (forecasts) => {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Department Name</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((forecast) => (
            <tr key={forecast.departmentId}>
              <td>{forecast.departmentId}</td>
              <td>{forecast.departmentName}</td>
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
    renderForecastsTable(forecasts)
  );

  return (
    <div>
      <h1 id="tabelLabel">Departments</h1>
      <button>Add Department</button>
      <p>This component demonstrates fetching data from the server.</p>
      {contents}
    </div>
  );
};

export default Department;
