import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import "./Associate.css";

function AssociateModal({
  isOpen,
  onClose,
  onAssociate,
  seatCount,
  selectedProduct,
}) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [comment, setComment] = useState("");
  const [qty, setQty] = useState(1);

  const options = Array.from({ length: seatCount }, (_, i) => ({
    name: `Seat ${i + 1}`,
    id: i + 1,
  }));

  const handleAssociateClick = () => {
    onAssociate(
      selectedProduct,
      selectedSeats.map((seat) => seat.id),
      comment,
      qty
    );
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedSeats([]); // reset seats selection when modal is closed
      setComment("");
      setQty(1);
    }
  }, [isOpen]);

  return (
    <Modal show={isOpen} onHide={onClose} size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Add Product to Seat(s)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Select Seat(s)</Form.Label>
        <Multiselect
          style={{ backgroundColor: "red", maxHeight: "40%" }}
          options={options}
          selectedValues={selectedSeats}
          onSelect={(selectedList) => setSelectedSeats(selectedList)}
          onRemove={(selectedList) => setSelectedSeats(selectedList)}
          displayValue="name"
          showCheckbox
          avoidHighlightFirstOption
        />
        <Form.Group className="mt-3">
          <Form.Label>Comment (Optional)</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Enter comment for product"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          {" "}
          {/* Added this new Form Group for qty */}
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter quantity"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            min="1"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAssociateClick}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AssociateModal;
