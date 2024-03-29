import { Col, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from "react";
import { ClientContext } from "../../store/client-context";

const Search: React.FC = () => {
  const {search} = useContext(ClientContext)
  let timeout: any;
  function handleSeach(event: any){
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const searchTerm = event.target.value
      search(searchTerm)
    }, 1000);
  }
  return (
    <Form.Group as={Col} md={{ span: 5, offset: 7 }} controlId="validationCustomUsername">
      <InputGroup>
        <InputGroup.Text id="search"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Type a name or email"
          onChange={handleSeach}
          data-testid="search"
        />
      </InputGroup>
    </Form.Group>
  )
}

export default Search