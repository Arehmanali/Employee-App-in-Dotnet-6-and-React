import { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import EmployeeModal from "./EmployeeModal";
import Backdrop from "./Backdrop";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import Search from "./Search";

const Employee = () => {
  const [employees, setEmployees] = useState({});
  const [employee, setEmployee] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [search, setSearch] = useState("");

  function submitHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    showAlert &&
      setTimeout(() => {
        setShowAlert(false);
      }, 7000);
  }, [showAlert]);

  useEffect(() => {
    setLoading(true);

    fetch("employees")
      .then((response) => {
        if (!response.ok) {
          const error = response.status + ": " + response.statusText;
          return Promise.reject(error);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setLoading(false);
        setEmployees(data);
      })
      .catch((error) => {
        setShowAlert(true);
        setAlert(`Error: ${error}`);
        console.error("There was an error!", error);
      });
  }, [addNew]);

  const saveEmployee = (newEmployee) => {
    fetch("employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    }).then(
      () => setAddNew(!addNew),
      setShowAlert(true),
      setAlert("Employee added successfully.")
    );
  };

  const handleDeleteBtn = (empId) => {
    fetch("employees/" + empId, {
      method: "DELETE",
    }).then(
      () => setAddNew(!addNew),
      setShowAlert(true),
      setAlert("Employee deleted successfully.")
    );
  };

  const editEmployee = (emp) => {
    fetch("employees/" + emp.employeeId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emp),
    })
      .then((response) => {
        setAddNew(!addNew);
        if (response.ok) {
          setShowAlert(true);
          setAlert("Employee edited successfully.");
        } else {
          const error = response.status + ": " + response.statusText;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        setShowAlert(true);
        setAlert(`Error: ${error}`);
        console.error("There was an error!", error);
      });
  };

  const renderForecastsTable = (employees) => {
    return (
      <>
        <table className="table table-striped" aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Joining Date</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(
              (emp) =>
                (emp.employeeName
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                  emp.department.departmentName
                    .toLowerCase()
                    .includes(search.toLowerCase())) && (
                  <tr key={emp.employeeId}>
                    <td>{emp.employeeId}</td>
                    <td>{emp.employeeName}</td>
                    <td>{emp.department.departmentName}</td>
                    <td>{emp.dateOfJoining.substr(0, 10)}</td>
                    <td>{emp.image.imageName}</td>

                    <td>
                      <FiEdit
                        role="button"
                        onClick={() => {
                          setEmployee(
                            employees.find(
                              (e) => e.employeeId === emp.employeeId
                            )
                          );
                          submitHandler();
                        }}
                        tabIndex="0"
                      />

                      <FaTrashAlt
                        role="button"
                        onClick={() => {
                          handleDeleteBtn(emp.employeeId);
                        }}
                        tabIndex="0"
                      />
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
        {modalIsOpen && (
          <EmployeeModal
            employee={employee}
            saveEmployee={saveEmployee}
            editEmployee={editEmployee}
            onCancel={closeModalHandler}
            onConfirm={closeModalHandler}
          />
        )}
        {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
      </>
    );
  };
  const handleRemove = () => {
    setShowAlert(false);
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
      {alert.includes("200") && showAlert ? (
        <div className="alert alert-success" role="alert">
          {alert}
          <ImCross
            onClick={handleRemove}
            style={{ float: "right", cursor: "pointer" }}
          />
        </div>
      ) : (
        showAlert && (
          <div className="alert alert-danger" role="alert">
            {alert}
            <ImCross
              onClick={handleRemove}
              style={{ float: "right", cursor: "pointer" }}
            />
          </div>
        )
      )}

      <h1 id="tabelLabel">Employees</h1>
      <AddEmployee saveEmployee={saveEmployee} />

      {employees.length ? (
        <>
          <Search search={search} setSearch={setSearch} />
          {contents}
        </>
      ) : (
        <p style={{ textAlign: "center", color: "darkred" }}>
          Your employee list is empty. Try to add some.
        </p>
      )}
    </div>
  );
};

export default Employee;
