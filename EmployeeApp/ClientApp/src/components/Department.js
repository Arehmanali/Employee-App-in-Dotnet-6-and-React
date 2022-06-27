import { useState, useContext } from "react";
import AddDepartment from "./AddDepartment";
import Modal from "./Modal";
import Backdrop from "./Backdrop";

import { AppContext } from "../store/app-context";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { ImCross } from "react-icons/im";

const Department = () => {
  const appContext = useContext(AppContext);
  const [dep, setDep] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  function submitHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }
  const saveDepartment = (depName) => {
    fetch("departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departmentName: depName,
      }),
    }).then(
      () => appContext.setAddNew(!appContext.addNew),
      setShowAlert(true),
      setAlert("Department Added Successfully.")
    );
  };

  const handleDeleteBtn = (depId) => {
    fetch("departments/" + depId, {
      method: "DELETE",
    }).then(
      () => appContext.setAddNew(!appContext.addNew),
      setShowAlert(true),
      setAlert("Department deleted Successfully.")
    );
  };

  const editDepartment = (dep) => {
    fetch("departments/" + dep.departmentId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dep),
    }).then(
      () => appContext.setAddNew(!appContext.addNew),
      setShowAlert(true),
      setAlert("Department Edit Successfully.")
    );
  };

  const renderForecastsTable = (departments) => {
    return (
      <>
        <table className="table table-striped" aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Department Id</th>
              <th>Department Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dep) => (
              <tr key={dep.departmentId}>
                <td>{dep.departmentId}</td>
                <td>{dep.departmentName}</td>
                <td>
                  <FiEdit
                    role="button"
                    onClick={() => {
                      setDep(
                        departments.find(
                          (e) => e.departmentId === dep.departmentId
                        )
                      );
                      submitHandler();
                    }}
                    tabIndex="0"
                  />
                  <FaTrashAlt
                    role="button"
                    onClick={() => {
                      handleDeleteBtn(dep.departmentId);
                    }}
                    tabIndex="0"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modalIsOpen && (
          <Modal
            dep={dep}
            saveDepartment={saveDepartment}
            editDepartment={editDepartment}
            onCancel={closeModalHandler}
            onConfirm={closeModalHandler}
          />
        )}
        {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
      </>
    );
  };

  const handleRemove = () => {
    setShowAlert(!showAlert);
  };

  return (
    <div>
      {showAlert && (
        <div class="alert alert-success" role="alert">
          {alert}
          <ImCross
            onClick={handleRemove}
            style={{ float: "right", cursor: "pointer" }}
          />
        </div>
      )}
      <h1 id="tabelLabel">Departments</h1>
      <AddDepartment saveDepartment={saveDepartment} />
      {renderForecastsTable(appContext.departments)}
    </div>
  );
};

export default Department;
