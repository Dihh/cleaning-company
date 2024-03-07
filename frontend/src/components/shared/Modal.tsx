import { Button, Modal } from "react-bootstrap";

const SystemModal: React.FC<{
  children: any, title: string, showModal: boolean, setShowModal: Function
}> = ({ children, title, showModal, setShowModal }) => {

  const handleClose = () => setShowModal(false);

  return (
    <Modal show={showModal} onHide={handleClose} variant="dark">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SystemModal