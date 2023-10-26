const EditModal = ({
  setShowEditModal,
  setEditItem,
  editItem,
  handleChangeConfirm,
}) => {
  return (
    <div className="confirm-modal">
      <div className="modal-inner">
        <h5>Todo İsmini Düzenle</h5>

        <input
          value={editItem?.title}
          type="text"
          className="form-control shadow"
          onChange={(e) =>
            setEditItem({
              ...editItem,
              title: e.target.value,
              date: new Date().toLocaleString(),
            })
          }
        />

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-warning"
            onClick={() => setShowEditModal(false)}
          >
            Vazgeç
          </button>
          <button className="btn btn-success" onClick={handleChangeConfirm}>
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
