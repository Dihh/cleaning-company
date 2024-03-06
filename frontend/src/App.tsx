import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// or less ideally
import { Button, Card, Col, Container, Form, Pagination, Row, Table, InputGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [count, setCount] = useState(0)

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <>
      <Container fluid className="mt-3">
        <Row>
          <Col md="9" bg="secondary">
            <Card>
              <Card.Body>
                <Card.Title>Clients</Card.Title>
                <Form.Group as={Col} md={{ span: 5, offset: 7 }} controlId="validationCustomUsername">
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a username.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th style={{ width: "3rem" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>
                        <FontAwesomeIcon icon={faPenToSquare} className='me-2' role="button"/>
                        <FontAwesomeIcon icon={faTrash} role="button"/>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
                <div className="text-end">
                  <Pagination>{items}</Pagination>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Add new client</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                  </Form.Group>
                  <Button type="submit">Submit form</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3 mb-3">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Routes</Card.Title>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum sequi aspernatur adipisci saepe, facere possimus unde totam a nihil, ducimus laborum neque eius odit. Ratione voluptatum provident quae animi accusantium!
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
