function Modal({
  newItem,
  setNewItem,
  handleSubmit,
  onConfirm,
  onCancel,
  addItem,
}) {
  function cancelHandler() {
    onCancel();
  }

  function confirmHandler() {
    if (!newItem) return;
    console.log(newItem);
    setNewItem("");
    addItem(newItem);
    onConfirm();
  }

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <div className="modal">
        <h1>Add New Item</h1>
        <div className="ItemForm">
          <label htmlFor="addItem">Add Item</label>
          <input
            autoFocus
            id="addItem"
            type="text"
            placeholder="Add New Item"
            required
            value={newItem}
            onChange={(e) => {
              setNewItem(e.target.value);
            }}
          ></input>
        </div>

        <button className="btn btn--alt" onClick={cancelHandler}>
          Cancel
        </button>
        <button
          type="submit"
          aria-label="Add Item"
          className="btn"
          onClick={confirmHandler}
        >
          Add Item
        </button>
      </div>
    </form>
  );
}

export default Modal;
