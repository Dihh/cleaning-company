import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import { Client } from "../../interfaces/Client";
import { CLientAPI } from "../../api/client";

const ClientTable: React.FC<{ 
  clients: Client[], onRemoveClient: Function , onSelectClient: Function 
  onSortClients: Function, sortCLients: (string | number)[]
}> = ({ clients, onRemoveClient, onSelectClient, onSortClients, sortCLients }) => {
  
  async function handleRemoveCLient(id: string){
    const response = await CLientAPI.deleteCLients(id)
    if (response) {
      onRemoveClient('warning', 'Cliente removed successfully')
    } else {
      onRemoveClient('danger', 'Something went wrong')
    }
  }

  function handleUpdateClient(client: Client){
    onSelectClient(client)
  }
  let nameSortIcon
  let emailSortIcon
  let sort = [0, 'asc']
  
  function setSortOrientation(){
    if(sortCLients[0] == 0){
      if(sortCLients[1] == "asc"){
        nameSortIcon = <span title="sort-name-asc" role="button" className='me-2'><FontAwesomeIcon icon={faSortDown}  className='ms-2' /></span>
        sort = [0, 'desc']
      } else if(sortCLients[1] == "desc"){
        nameSortIcon = <span title="sort-name-desc" role="button" className='me-2'><FontAwesomeIcon icon={faSortUp}  className='ms-2' title="sort-name-asc"/></span>
        sort = [0, 'asc']
      }
    } else if(sortCLients[0] == 1){
      if(sortCLients[1] == "asc"){
        emailSortIcon = <span title="sort-email-asc" role="button" className='me-2'><FontAwesomeIcon icon={faSortDown}  className='ms-2' title="sort-email-desc"/></span>
        sort = [1, 'desc']
      } else if(sortCLients[1] == "desc"){
        emailSortIcon = <span title="sort-email-desc" role="button" className='me-2'><FontAwesomeIcon icon={faSortUp}  className='ms-2' title="sort-email-asc"/></span>
        sort = [1, 'asc']
      }
    }
  }
  
  setSortOrientation()


  return (
    <Table striped hover variant="dark">
      <thead>
        <tr>
          <th role="button" onClick={() => onSortClients([0, sort[1]])} >Name
            {nameSortIcon}
          </th>
          <th role="button" onClick={() => onSortClients([1, sort[1]])} >Email
          {emailSortIcon}
          </th>
          <th>Coordinates</th>
          <th role="button"  style={{ width: "5rem" }}></th>
        </tr>
      </thead>
      <tbody>
        {clients.map(client => <tr key={client.id}>
          <td>{client.name}</td>
          <td>{client.email}</td>
          <td>{client.coordinates.join(',')}<span className="test"></span></td>
          <td>
            <span onClick={() => handleUpdateClient(client)} className='me-2' role="button" title="edit">
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