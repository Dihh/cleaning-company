import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import { Client } from "../../interfaces/Client";
import { CLientAPI } from "../../api/client";

const ClientTable: React.FC<{ 
  clients: Client[], onRemoveClient: Function , onSelectClient: Function
}> = ({ clients, onRemoveClient, onSelectClient }) => {
  
  async function handleRemoveCLient(id: string){
    const response = await CLientAPI.deleteCLients(id)
    if (response) {
      onRemoveClient('warning', 'Cliente removed successfully')
    } else {
      onRemoveClient('danger', 'Something went wrong')
    }
  }

  function handleUpdateCLient(client: Client){
    onSelectClient(client)
  }

  return (
    <Table striped hover variant="dark">
      <thead>
        <tr>
          <th role="button" >Name</th>
          <th role="button" >Email</th>
          <th role="button" >Coordinates</th>
          <th role="button"  style={{ width: "5rem" }}></th>
        </tr>
      </thead>
      <tbody>
        {clients.map(client => <tr key={client.id}>
          <td>{client.name}</td>
          <td>{client.email}</td>
          <td>{client.coordinates.join(',')}<span className="test"></span></td>
          <td>
            <span onClick={() => handleUpdateCLient(client)} className='me-2' role="button" title="edit">
              <FontAwesomeIcon icon={faPenToSquare}  />
            </span>
            <span role="button" onClick={() => handleRemoveCLient(client.id || "")} title="delete">
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </td>
        </tr>)}
      </tbody>
    </Table>
  )
}

export default ClientTable