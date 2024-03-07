import { Card } from "react-bootstrap";
import ClientTable from "./ClientTable";
import Search from "../shared/Search";
import SystemPagination from "../shared/SystemPagination";
import { Client as CLientInterface } from "../../interfaces/Client";
import { Metadata } from "../../interfaces/MetaData";
import React from "react";

const Client: React.FC<{
  clientsMetadata: Metadata<CLientInterface>, onRemoveClient: Function, onSelectClient: Function,
  onChangePagination: Function, onSearch: Function, onSortClients: Function, sortCLients: (string | number)[]
}> = ({ clientsMetadata, onRemoveClient, onSelectClient, onChangePagination, onSearch, onSortClients, sortCLients }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Clients</Card.Title>
        <div className="mb-3">
          <Search onSearch={onSearch} />
        </div>
        <ClientTable clients={clientsMetadata.data} onRemoveClient={onRemoveClient} onSelectClient={onSelectClient}
        onSortClients={onSortClients} sortCLients={sortCLients} />
        <SystemPagination metaData={clientsMetadata} onChangePagination={onChangePagination} />
      </Card.Body>
    </Card>
  )
}

export default Client