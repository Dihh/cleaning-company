import { Card } from "react-bootstrap";
import ClientTable from "./ClientTable";
import Search from "../shared/Search";
import SystemPagination from "../shared/SystemPagination";
import { Client as CLientInterface } from "../../interfaces/Client";
import { Metadata } from "../../interfaces/MetaData";

const Client: React.FC<{
  clientsMetadata: Metadata<CLientInterface>, onRemoveClient: Function, onSelectClient: Function,
  onChangePagination: Function, onSearch: Function
}> = ({ clientsMetadata, onRemoveClient, onSelectClient, onChangePagination, onSearch }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Clients</Card.Title>
        <Search onSearch={onSearch}/>
        <ClientTable clients={clientsMetadata.data} onRemoveClient={onRemoveClient} onSelectClient={onSelectClient} />
        <SystemPagination metaData={clientsMetadata} onChangePagination={onChangePagination}/>
      </Card.Body>
    </Card>
  )
}

export default Client