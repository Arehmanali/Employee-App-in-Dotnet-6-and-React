import { useContext, useEffect, useState } from "react";
import { AppContext } from "../store/app-context";

function EmployeeModal({
  onConfirm,
  onCancel,
  saveEmployee,
  employee,
  editEmployee,
}) {
  const appContext = useContext(AppContext);
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const [dep, setDep] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [photo, setPhoto] = useState("");

  function cancelHandler() {
    onCancel();
  }

  useEffect(() => {
    if (employee) {
      setEmpId(employee.employeeId);
      setEmpName(employee.employeeName);
      setDep(employee.department);
      setJoinDate(employee.dateOfJoining.substr(0, 10));
      setPhoto(employee.photoFilename);
    }
  }, []);

  function submitHandler(e) {
    e.preventDefault();

    const newEmployee = {
      employeeName: empName,
      department: dep,
      dateOfJoining: joinDate,
      photoFilename: photo,
    };

    if (employee) {
      const editEmp = {
        employeeId: empId,
        employeeName: empName,
        department: dep,
        dateOfJoining: joinDate,
        photoFilename: photo,
      };
      editEmployee(editEmp);
    } else {
      saveEmployee(newEmployee);
    }
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
          <select
            style={{ cursor: "pointer" }}
            className="dropdown"
            value={dep}
            onChange={(e) => setDep(e.target.value)}
          >
            <option value="Select Department">Select Department</option>
            {appContext.departments.map((dept) => {
              return (
                <option value={dept.departmentName}>
                  {dept.departmentName}
                </option>
              );
            })}
          </select>
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
        <button
          type="submit"
          aria-label="Add Employee"
          className="btn btn--confirm"
        >
          {employee ? "Edit Employee" : "Add Employee"}
        </button>
      </div>
    </form>
  );
}

export default EmployeeModal;
