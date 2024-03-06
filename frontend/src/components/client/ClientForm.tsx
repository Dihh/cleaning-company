import { Button, Card, Form } from "react-bootstrap";
import { Client } from "../../interfaces/Client";

const ClientForm: React.FC<{
  onChangeClient: Function, selectedClient: Client | undefined, onCancelEdit: Function
}> = ({ onChangeClient, selectedClient, onCancelEdit }) => {

  async function handleSubmit(event: any) {

    event.preventDefault();
    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    const data = Object.fromEntries(formData.entries())
    if(selectedClient){
      await updateClient(data, selectedClient.id)
    }else {
      await createClient(data)
    }
    target.reset()
  }

  async function createClient(data: any){
    const response = await fetch(`http://localhost:3000/clients`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
    if (response.ok) {
      alert("OK")
      onChangeClient()
    } else {
      alert("error")
    }
  }

  async function updateClient(data: any, id: string){
    const response = await fetch(`http://localhost:3000/clients/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
    if (response.ok) {
      alert("OK")
      onChangeClient()
      onCancelEdit(undefined)
    } else {
      alert("error")
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
            <Form.Control type="text" placeholder="name" name="name"
              defaultValue={selectedClient ? selectedClient.name : ""} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" name="email"
              defaultValue={selectedClient ? selectedClient.email : ""} />
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