import { useContext, useEffect, useState } from "react";
import { AppContext } from "../store/app-context";

function EmployeeModal({
  onConfirm,
  onCancel,
  saveEmployee,
  employee,
  editEmployee,
  getDepartmentName,
}) {
  const appContext = useContext(AppContext);
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const [dep, setDep] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [photo, setPhoto] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageSource, setImageSource] = useState("/image/149071.png");

  function cancelHandler() {
    onCancel();
  }

  useEffect(() => {
    if (employee) {
      setEmpId(employee.employeeId);
      setEmpName(employee.employeeName);
      setDep(getDepartmentName(employee.departmentId));
      setJoinDate(employee.dateOfJoining.substr(0, 10));
      setPhoto(employee.image.imageName);
      setImageSource(employee.image.imageSource);
    }
  }, []);

  const getDepartmentId = (depName) => {
    return appContext.departments.find((d) => d.departmentName === depName)
      ?.departmentId;
  };
  function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("employeeName", empName);
    formData.append("departmentId", getDepartmentId(dep));
    formData.append("dateOfJoining", joinDate);
    formData.append("image.imageName", photo);
    formData.append("image.imageSource", imageSource);
    formData.append("image.imageFile", imageFile);

    if (employee) {
      formData.append("employeeId", empId);
      formData.append("image.imageId", employee.image.imageId);
      editEmployee(formData);
    } else {
      saveEmployee(formData);
    }
    onConfirm();
  }

  const open_file = (e) => {
    e.preventDefault();
    document.getElementById("input_file").click();
  };

  const showReview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImageSource(x.target.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <form className="addForm" onSubmit={submitHandler}>
      <div className="modal2">
        <h1>Add New Employee</h1>
        <div className="container">
          <div className="row">
            <div className="col">
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
                      <option value={dept?.departmentName}>
                        {dept?.departmentName}
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
            </div>
            <div className="col">
              <img
                src={imageSource}
                className="card-img-top"
                alt="employee Image"
                style={{
                  width: "10rem",
                  height: "10rem",
                  borderRadius: "80px",
                }}
              />

              <div className="ItemForm">
                <label htmlFor="photo">Photo Filename</label>

                <input
                  type="file"
                  id="input_file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    showReview(e);
                    setImageFile(e.target.files[0]);
                    setPhoto(e.target.value.split("\\").pop().split("/").pop());
                  }}
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
                      setPhoto(
                        e.target.value.split("\\").pop().split("/").pop()
                      )
                    }
                  ></input>
                </div>
              </div>
            </div>
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
