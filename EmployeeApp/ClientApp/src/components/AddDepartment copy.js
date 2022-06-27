import { useState } from "react";

import Modal from "./Modal";
import Backdrop from "./Backdrop";

function AddDepartment({ saveDepartment }) {
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
          Add Department
        </button>
      </div>

      {modalIsOpen && (
        <Modal
          saveDepartment={saveDepartment}
          onCancel={closeModalHandler}
          onConfirm={closeModalHandler}
        />
      )}
      {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
    </>
  );
}

export default AddDepartment;
