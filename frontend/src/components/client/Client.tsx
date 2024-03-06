import { Card } from "react-bootstrap";
import ClientTable from "./ClientTable";
import Search from "../shared/Search";
import SystemPagination from "../shared/SystemPagination";
import { Client as CLientInterface } from "../../interfaces/Client";

const Client: React.FC<{
  clients: CLientInterface[], onRemoveClient: Function, onSelectClient: Function
}> = ({ clients, onRemoveClient, onSelectClient }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Clients</Card.Title>
        <Search />
        <ClientTable clients={clients} onRemoveClient={onRemoveClient} onSelectClient={onSelectClient} />
        <SystemPagination />
      </Card.Body>
    </Card>
  )
}

export default Client