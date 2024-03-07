import { useState, useEffect } from 'react'
import './App.css'
import { Col, Container, Row } from 'react-bootstrap';
import Client from './components/client/Client';
import ClientForm from './components/client/ClientForm';
import Route from './components/Route';
import { Client as ClientInterfacec, SearchClientTerms } from "./interfaces/Client";
import { CLientAPI } from './api/client'
import { Metadata } from './interfaces/MetaData';

function App() {
  const [clientsMetadata, setClientsMetadata] = useState(undefined as Metadata<ClientInterfacec> | undefined)
  const [selectedClient, setSelectedClient] = useState(undefined as (ClientInterfacec | undefined))
  const [getClientsKey, setGetClientsKey] = useState(0)
  const [searchTerm, setSearchTerm] = useState(undefined as SearchClientTerms | undefined)

  function handleRefreshGetClient() {
    setGetClientsKey(oldKey => oldKey + 1)
  }

  function handleSelectCLient(client: ClientInterfacec) {
    setSelectedClient(client)
  }

  function handleClickPagination(page: number) {
    getClients(page, searchTerm)
  }

  async function handleSearch(term: string){
    let search: SearchClientTerms | undefined
    if(term){
      search = {name: term, email: term}
    }
    setSearchTerm(search)
  }

  async function getClients(page = 1, search: SearchClientTerms | undefined  = undefined ) {
    const clientsMetadata = await CLientAPI.getCLients(page, search)
    if (clientsMetadata) {
      setClientsMetadata(clientsMetadata)
    }
  }

  useEffect(() => {
    getClients(undefined, searchTerm)
  }, [getClientsKey, searchTerm])

  return (
    <>
      <Container fluid className="mt-3 mb-3">
        <Row>
          <Col md="9" bg="secondary">
            {
              clientsMetadata &&
              <Client clientsMetadata={clientsMetadata} 
              onRemoveClient={handleRefreshGetClient} onSelectClient={handleSelectCLient} 
              onChangePagination={handleClickPagination}
              onSearch={handleSearch}/>
            }
          </Col>
          <Col>
            <Row>
              <Col>
                <ClientForm onChangeClient={handleRefreshGetClient}
                  selectedClient={selectedClient} onCancelEdit={handleSelectCLient} />
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