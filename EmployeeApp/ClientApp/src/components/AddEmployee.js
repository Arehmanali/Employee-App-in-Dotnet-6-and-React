import { useState } from "react";
import Backdrop from "./Backdrop";
import EmployeeModal from "./EmployeeModal";

function AddEmployee({ saveEmployee }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function submitHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }
  return (
    <>
      <div className="actions">
        <button className="btn" onClick={submitHandler}>
          Add Employee
        </button>
      </div>
      {modalIsOpen && (
        <EmployeeModal
          saveEmployee={saveEmployee}
          onCancel={closeModalHandler}
          onConfirm={closeModalHandler}
        />
      )}
      {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
    </>
  );
}

export default AddEmployee;
