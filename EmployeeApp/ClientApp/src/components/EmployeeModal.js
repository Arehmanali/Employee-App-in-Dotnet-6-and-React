import { useContext, useState } from "react";
import { AppContext } from "../store/app-context";
import { Dropdown } from "react-bootstrap";

function EmployeeModal({ onConfirm, onCancel, saveEmployee }) {
  const appContext = useContext(AppContext);

  const [empName, setEmpName] = useState("");
  const [dep, setDep] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [photo, setPhoto] = useState("");

  function cancelHandler() {
    onCancel();
  }

  function submitHandler(e) {
    e.preventDefault();

    const newEmployee = {
      employeeName: empName,
      department: dep,
      dateOfJoining: joinDate,
      photoFilename: photo,
    };

    saveEmployee(newEmployee);
    onConfirm();
  }

  return (
    <form className="addForm" onSubmit={submitHandler}>
      <div className="modal2">
        <h1>Add New Employee</h1>
        <div className="ItemForm">
          <label htmlFor="employeeName">Employee Name</label>
          <input
            autoFocus
            id="employeeName"
            type="text"
            placeholder="Employee Name"
            required
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
          ></input>
        </div>
        <div className="ItemForm">
          <label htmlFor="department">Department</label>
          <Dropdown>
            <Dropdown.Toggle
              className="dropdown"
              variant="success"
              id="dropdown-basic"
              required
              value={dep}
              onChange={(e) => setDep(e.target.value)}
            >
              Department
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {appContext.departments.map((dept) => {
                return (
                  <Dropdown.Item href="#/action-1">
                    {dept.departmentName}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="ItemForm">
          <label htmlFor="joiningDate">Joining Date</label>
          <input
            id="joiningDate"
            type="date"
            placeholder="Joining Date"
            required
            value={joinDate}
            onChange={(e) => setJoinDate(e.target.value)}
          ></input>
        </div>
        <div className="ItemForm">
          <label htmlFor="photo">Photo Filename</label>
          <input
            id="photo"
            type="text"
            placeholder="Photo Filename"
            required
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          ></input>
        </div>

        <button className="btn btn--alt" onClick={cancelHandler}>
          Cancel
        </button>
        <button type="submit" aria-label="Add Department" className="btn">
          Add Employee
        </button>
      </div>
    </form>
  );
}

export default EmployeeModal;
