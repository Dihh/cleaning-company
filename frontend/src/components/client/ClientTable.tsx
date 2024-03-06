import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import { Client } from "../../interfaces/Client";

const ClientTable: React.FC<{ 
  clients: Client[], onRemoveClient: Function , onSelectClient: Function
}> = ({ clients, onRemoveClient, onSelectClient }) => {
  async function handleRemoveCLient(id: string){
    const response = await fetch(`http://localhost:3000/clients/${id}`, {
      method: "DELETE"
    })
    if (response.ok) {
      alert("OK")
      onRemoveClient()
    } else {
      alert("error")
    }
  }

  function handleUpdateCLient(client: Client){
    onSelectClient(client)
  }

  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th style={{ width: "5rem" }}></th>
        </tr>
      </thead>
      <tbody>
        {clients.map(client => <tr>
          <td>{client.name}</td>
          <td>{client.email}</td>
          <td>
            <FontAwesomeIcon icon={faPenToSquare} className='me-2' role="button" 
            onClick={() => handleUpdateCLient(client)} />
            <FontAwesomeIcon icon={faTrash} role="button" 
            onClick={() => handleRemoveCLient(client.id)} />
          </td>
        </tr>)}
      </tbody>
    </Table>
  )
}

export default ClientTable