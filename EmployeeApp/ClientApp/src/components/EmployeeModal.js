import { useRef } from "react";

function EmployeeModal({ onConfirm, onCancel, saveEmployee }) {
  const employeeNameRef = useRef();
  const departmentRef = useRef();
  const dateOfJoiningRef = useRef();
  const photoFilenameRef = useRef();

  function cancelHandler() {
    onCancel();
  }

  function submitHandler(e) {
    e.preventDefault();

    const newEmployee = {
      employeeName: employeeNameRef.current.value,
      department: departmentRef.current.value,
      dateOfJoining: dateOfJoiningRef.current.value,
      photoFilename: photoFilenameRef.current.value,
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
            ref={employeeNameRef}
          ></input>
        </div>
        <div className="ItemForm">
          <label htmlFor="department">Department</label>
          <input
            id="department"
            type="text"
            placeholder="Department"
            required
            ref={departmentRef}
          ></input>
        </div>
        <div className="ItemForm">
          <label htmlFor="joiningDate">Joining Date</label>
          <input
            id="joiningDate"
            type="date"
            placeholder="Joining Date"
            required
            ref={dateOfJoiningRef}
          ></input>
        </div>
        <div className="ItemForm">
          <label htmlFor="photo">Photo Filename</label>
          <input
            id="photo"
            type="text"
            placeholder="Photo Filename"
            required
            ref={photoFilenameRef}
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
