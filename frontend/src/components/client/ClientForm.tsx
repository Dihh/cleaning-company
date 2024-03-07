import { Button, Card, Form } from "react-bootstrap";
import { Client } from "../../interfaces/Client";
import { CLientAPI } from "../../api/client";

const ClientForm: React.FC<{
  onChangeClient: Function, selectedClient: Client | undefined, onCancelEdit: Function
}> = ({ onChangeClient, selectedClient, onCancelEdit }) => {

  async function handleSubmit(event: any) {

    event.preventDefault();
    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    const data = Object.fromEntries(formData.entries())
    const client: Client = {
      name: data.name.toString(),
      email: data.email.toString(),
      coordinates: [parseInt(data.positionX.toString()), parseInt(data.positionY.toString())]
    }
    if(selectedClient){
      if(selectedClient.id){
        await updateClient(client, selectedClient.id)
      }
    }else {
      await createClient(client)
    }
    target.reset()
  }

  async function createClient(data: any){
    const response = await CLientAPI.createCLient(data)
    if (response) {
      onChangeClient('success', 'Cliente created successfully')
    } else {
      onChangeClient('danger', 'Something went wrong')
    }
  }

  async function updateClient(data: any, id: string){
    const response = await CLientAPI.updateCLient(data, id)
    if (response) {
      onChangeClient('info', 'Cliente updated successfully')
      onCancelEdit(undefined)
    } else {
      onChangeClient('danger', 'Something went wrong')
    }
  }

  const cardTitle = !selectedClient ? <Card.Title>Add new client</Card.Title> : <Card.Title>Edit client</Card.Title>
  return (
    <Card>
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" placeholder="name" name="name" required
              defaultValue={selectedClient ? selectedClient.name : ""} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" name="email" required
              defaultValue={selectedClient ? selectedClient.email : ""} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Position X:</Form.Label>
            <Form.Control type="number" placeholder="0" name="positionX" required
              defaultValue={selectedClient ? selectedClient.coordinates[0] : ""} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Position Y:</Form.Label>
            <Form.Control type="number" placeholder="0" name="positionY" required
              defaultValue={selectedClient ? selectedClient.coordinates[1] : ""} />
          </Form.Group>
          <Button type="submit">Submit form</Button>
          {selectedClient &&
            <Button type="button" variant="warning" className="ms-3" onClick={() => onCancelEdit(undefined)}>Cancel</Button>
          }

        </Form>
      </Card.Body>
    </Card>
  )
}

export default ClientForm