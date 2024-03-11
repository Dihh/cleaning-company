import { Card } from "react-bootstrap";
import ClientTable from "./ClientTable";
import Search from "../shared/Search";
import SystemPagination from "../shared/SystemPagination";
import React, { useEffect } from "react";
import { useContext } from 'react'
import { ClientContext } from "../../store/client-context";

type props = {}
const Client: React.FC<props> = () => {
  const { clients, paginate, searchTerm, sortField, getClientsKey, getClients } = useContext(ClientContext)

  useEffect(() => {
    getClients()
  }, [getClientsKey, searchTerm, sortField])

  return (
    <Card>
      <Card.Body>
        <Card.Title>Clients</Card.Title>
        <div className="mb-3">
          <Search />
        </div>
        {clients && <ClientTable clients={clients.data} />}
        <SystemPagination metaData={clients} onChangePagination={paginate} />
      </Card.Body>
    </Card>
  )
}

export default Client