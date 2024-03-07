import { Dispatch, useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { CLientAPI } from "../../api/client";
import { Client } from "../../interfaces/Client";
import SystemModal from "../shared/Modal";
import React from "react";

const Routes: React.FC<{ getclientsRoutesKey: number, setclientsRoutesKey: Dispatch<React.SetStateAction<number>> }> = ({ getclientsRoutesKey, setclientsRoutesKey }) => {
  const [showModal, setShowModal] = useState(false);
  const [clientsRoutes, setClientsRoutes] = useState([] as Client[])

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

  const handleShow = () => {
    if (getclientsRoutesKey == 0) {
      setclientsRoutesKey(oldvalue => oldvalue + 1)
    }
    setShowModal(true);
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Routes</Card.Title>
        <Button variant="dark" onClick={handleShow}>
          Calculate routes
        </Button>

        <SystemModal title={"Routes"} showModal={showModal} setShowModal={setShowModal}>
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
        </SystemModal>

      </Card.Body>
    </Card>
  )
}

export default Routes