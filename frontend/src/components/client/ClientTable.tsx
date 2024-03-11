import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from "react";
import { Client } from "../../interfaces/Client";
import { ClientContext } from "../../store/client-context";

type props = {
  clients: Client[]
}
const ClientTable: React.FC<props> = ({ clients }) => {
  const { remove, select, sort: onSort, sortField } = useContext(ClientContext)

  let nameSortIcon
  let emailSortIcon
  let sort = [0, 'asc']

  function setSortOrientationAndField() {
    if (sortField[0] == 0) {
      if (sortField[1] == "asc") {
        nameSortIcon = <span title="sort-name-asc" role="button" className='me-2'><FontAwesomeIcon icon={faSortDown} className='ms-2' /></span>
        sort = [0, 'desc']
      } else if (sortField[1] == "desc") {
        nameSortIcon = <span title="sort-name-desc" role="button" className='me-2'><FontAwesomeIcon icon={faSortUp} className='ms-2' title="sort-name-asc" /></span>
        sort = [0, 'asc']
      }
    } else if (sortField[0] == 1) {
      if (sortField[1] == "asc") {
        emailSortIcon = <span title="sort-email-asc" role="button" className='me-2'><FontAwesomeIcon icon={faSortDown} className='ms-2' title="sort-email-desc" /></span>
        sort = [1, 'desc']
      } else if (sortField[1] == "desc") {
        emailSortIcon = <span title="sort-email-desc" role="button" className='me-2'><FontAwesomeIcon icon={faSortUp} className='ms-2' title="sort-email-asc" /></span>
        sort = [1, 'asc']
      }
    }
  }

  setSortOrientationAndField()


  return (
    <div className="table-responsive">
      <Table striped hover variant="dark">
        <thead>
          <tr>
            <th role="button" onClick={() => onSort([0, sort[1]])} >Name
              {nameSortIcon}
            </th>
            <th role="button" onClick={() => onSort([1, sort[1]])} >Email
              {emailSortIcon}
            </th>
            <th>Coordinates</th>
            <th role="button" style={{ width: "5rem" }}></th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => <tr key={client.id}>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.coordinates.join(',')}<span className="test"></span></td>
            <td>
              <span onClick={() => select(client)} className='me-2' role="button" title="edit">
                <FontAwesomeIcon icon={faPenToSquare} />
              </span>
              <span role="button" onClick={() => remove(client.id || "")} title="delete">
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </td>
          </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default ClientTable