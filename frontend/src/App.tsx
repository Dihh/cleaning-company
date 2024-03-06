import { useState, useEffect } from 'react'
import './App.css'
import { Col, Container, Row } from 'react-bootstrap';
import Client from './components/client/Client';
import ClientForm from './components/client/ClientForm';
import Route from './components/Route';
import { Client as ClientInterfacec} from "./interfaces/Client";

const API = `http://localhost:3000`

function App() {
  const [clients, setCLients] =  useState([] as ClientInterfacec[])
  const [selectedClient, setSelectedClient] =  useState(undefined as (ClientInterfacec | undefined))
  const [getClientsKey, setGetClientsKey] =  useState(0)

  function handleRefreshGetClient(){
    setGetClientsKey(oldKey => oldKey +1)
  }

  function handleSelectCLient(client: ClientInterfacec){
    setSelectedClient(client)
    console.log(client)
  }

  useEffect(() => {
    async function getClients(){
      const response = await fetch(`${API}/clients`)
      if(response.ok){
        const data: ClientInterfacec[] = await response.json()
        setCLients(data)
      }
    }
    getClients()
  }, [getClientsKey])

  return (
    <>
      <Container fluid className="mt-3 mb-3">
        <Row>
          <Col md="9" bg="secondary">
            <Client clients={clients} onRemoveClient={handleRefreshGetClient} onSelectClient={handleSelectCLient}/>
          </Col>
          <Col>
            <Row>
              <Col>
                <ClientForm onChangeClient={handleRefreshGetClient} 
                selectedClient={selectedClient} onCancelEdit={handleSelectCLient}/>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Route />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App