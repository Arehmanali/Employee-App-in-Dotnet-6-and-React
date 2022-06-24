import { useState, useEffect } from "react";

const Employee = () => {
    const [employees, setEmployees] = useState("");
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
    }, []);

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
                            <td>{emp.dateOfJoining}</td>
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
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
};

export default Employee;
