import { useRef } from "react";

function Modal({ onConfirm, onCancel, saveDepartment }) {
  const DepNameRef = useRef();

  function cancelHandler() {
    onCancel();
  }

  function submitHandler(e) {
    e.preventDefault();
    if (!DepNameRef.current.value) return;

    saveDepartment(DepNameRef.current.value);
    onConfirm();
  }

  return (
    <form className="addForm" onSubmit={submitHandler}>
      <div className="modal2">
        <h1>Add New Department</h1>
        <div className="ItemForm">
          <label htmlFor="addDep">Add Department</label>
          <input
            autoFocus
            id="addDep"
            type="text"
            placeholder="Department Name"
            required
            ref={DepNameRef}
          ></input>
        </div>

        <button className="btn btn--alt" onClick={cancelHandler}>
          Cancel
        </button>
        <button type="submit" aria-label="Add Department" className="btn">
          Add Department
        </button>
      </div>
    </form>
  );
}

export default Modal;
