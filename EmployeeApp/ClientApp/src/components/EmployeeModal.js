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
      setDep(employee.department.departmentName);
      setJoinDate(employee.dateOfJoining.substr(0, 10));
      setPhoto(employee.imageId);
    }
  }, []);

  const getDepartmentId = (depName) => {
    const tempDep = appContext.departments.filter(
      (e) => e.departmentName === depName
    );
    return tempDep[0].departmentId;
  };

  const getImageId = (depName) => {
    return appContext.departments.find((e) => e.departmentName === depName);
  };

  function submitHandler(e) {
    e.preventDefault();

    const newEmployee = {
      employeeName: empName,
      departmentId: dep,
      dateOfJoining: joinDate,
      imageId: photo,
    };

    if (employee) {
      const editEmp = {
        employeeId: empId,
        employeeName: empName,
        departmentId: getDepartmentId(dep),
        dateOfJoining: joinDate,
        imageId: photo,
        image: [{}],
        department: [{}],
      };
      console.log(editEmp);
      editEmployee(editEmp);
    } else {
      saveEmployee(newEmployee);
    }
    onConfirm();
  }

  const open_file = () => {
    document.getElementById("input_file").click();
  };

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
            style={{ cursor: "pointer" }}
            placeholder="Joining Date"
            required
            value={joinDate}
            onChange={(e) => setJoinDate(e.target.value)}
          ></input>
        </div>
        <div className="ItemForm">
          <label htmlFor="photo">Photo Filename</label>

          <input
            type="file"
            id="input_file"
            accept="image/*"
            hidden
            onChange={(e) =>
              setPhoto(e.target.value.split("\\").pop().split("/").pop())
            }
          ></input>

          <div>
            <button className="open-file-btn" onClick={open_file}>
              Select Image
            </button>

            <input
              className="filename-textbox"
              type="text"
              placeholder="Photo Filename"
              readOnly="readonly"
              value={photo}
              onChange={(e) =>
                setPhoto(e.target.value.split("\\").pop().split("/").pop())
              }
            ></input>
          </div>
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
