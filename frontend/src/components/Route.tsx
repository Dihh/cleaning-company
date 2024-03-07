import { useEffect, useState } from "react";
import { Button, Card, ListGroup, Modal } from "react-bootstrap";
import { CLientAPI } from "../api/client";
import { Client } from "../interfaces/Client";

export default function () {
  const [show, setShow] = useState(false);
  const [clientsRoutes, setClientsRoutes] = useState([] as Client[])
  const [getclientsRoutesKey, setclientsRoutesKey] = useState(0)
  
  useEffect(() => {
    async function getClients() {
      if (getclientsRoutesKey == 0) {
        return
      }
      const clientsRoutes = await CLientAPI.getCLientsRoutes()
      if (clientsRoutes) {
        setClientsRoutes(clientsRoutes)
      }
    }
    getClients()
  }, [getclientsRoutesKey])

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (getclientsRoutesKey == 0) {
      setclientsRoutesKey(oldvalue => oldvalue + 1)
    }
    setShow(true);
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Routes</Card.Title>
        <Button variant="primary" onClick={handleShow}>
          Calculate routes
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Routes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="overflow-x-auto">
            <ListGroup as="ol" numbered>
              {clientsRoutes.map(clientsRoute => <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{clientsRoute.name}</div>
                  Coordinate: {clientsRoute.coordinates.join(',')}
                </div>
              </ListGroup.Item>)}

            </ListGroup>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  )
}