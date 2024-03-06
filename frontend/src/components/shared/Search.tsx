import { Col, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function () {
  return (
    <Form.Group as={Col} md={{ span: 5, offset: 7 }} controlId="validationCustomUsername">
      <InputGroup>
        <InputGroup.Text id="inputGroupPrepend"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Type a name or email"
        />
      </InputGroup>
    </Form.Group>
  )
}