import { useState, useEffect, useContext } from "react";
import AddEmployee from "./AddEmployee";
import EmployeeModal from "./EmployeeModal";
import Backdrop from "./Backdrop";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import Search from "./Search";
import { AppContext } from "../store/app-context";

const Employee = () => {
  const appContext = useContext(AppContext);
  const [employees, setEmployees] = useState([]);
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

  const getDepartmentName = (depId) => {
    return appContext.departments.find((d) => d.departmentId === depId)
      ?.departmentName;
  };

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
        Accept: "application/form-data",
      },
      body: newEmployee,
    })
      .then((response) => {
        setAddNew(!addNew);
        if (response.ok) {
          setShowAlert(true);
          setAlert("Employee Added successfully.");
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

  const handleDeleteBtn = (empId) => {
    fetch("employees/" + empId, {
      method: "DELETE",
    })
      .then((response) => {
        setAddNew(!addNew);
        if (response.ok) {
          setShowAlert(true);
          setAlert("Employee deleted successfully.");
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

  const editEmployee = (emp) => {
    console.log(Object.fromEntries(emp));
    fetch("employees/" + emp.get("employeeId"), {
      method: "PUT",
      headers: {
        Accept: "application/form-data",
      },
      body: emp,
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
                  getDepartmentName(emp.departmentId)
                    .toLowerCase()
                    .includes(search.toLowerCase())) && (
                  <tr key={emp.employeeId}>
                    <td>{emp.employeeId}</td>
                    <td>{emp.employeeName}</td>
                    <td>{getDepartmentName(emp.departmentId)}</td>
                    <td>{emp.dateOfJoining.substr(0, 10)}</td>
                    <td>
                      <img
                        src={emp.image.imageSource}
                        style={{
                          borderRadius: "50px",
                          width: "50px",
                          height: "50px",
                        }}
                      ></img>
                    </td>

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
            getDepartmentName={getDepartmentName}
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
  const handleRemoveAlert = () => {
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
      {alert.includes("201") ||
      (alert.includes("successfully") && showAlert) ? (
        <div className="alert alert-success" role="alert">
          {alert}
          <ImCross
            onClick={handleRemoveAlert}
            style={{ float: "right", cursor: "pointer" }}
          />
        </div>
      ) : (
        showAlert && (
          <div className="alert alert-danger" role="alert">
            {alert}
            <ImCross
              onClick={handleRemoveAlert}
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
