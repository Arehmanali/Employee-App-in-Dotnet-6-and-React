import { useState } from "react";

function Modal({ onConfirm, onCancel, saveDepartment }) {
  const [depName, setDepName] = useState("");

  function cancelHandler() {
    onCancel();
  }

  function submitHandler(e) {
    e.preventDefault();
    if (!depName) return;
    saveDepartment(depName);
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
            value={depName}
            onChange={(e) => setDepName(e.target.value)}
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
