import { useState, useEffect } from 'react'
import './App.css'
import { Col, Container, Row } from 'react-bootstrap';
import Client from './components/client/Client';
import ClientForm from './components/client/ClientForm';
import Route from './components/routes/Routes';
import { Client as ClientInterfacec, SearchClientTerms } from "./interfaces/Client";
import { CLientAPI } from './api/client'
import { Metadata } from './interfaces/MetaData';
import SystemToast from './components/shared/SystemToast';

function App() {
  const [clientsMetadata, setClientsMetadata] = useState(undefined as Metadata<ClientInterfacec> | undefined)
  const [selectedClient, setSelectedClient] = useState(undefined as (ClientInterfacec | undefined))
  const [getClientsKey, setGetClientsKey] = useState(0)
  const [searchTerm, setSearchTerm] = useState(undefined as SearchClientTerms | undefined)
  const [showToast, setShowToast] = useState({condition: false, type: '', message: ''});
  const [getclientsRoutesKey, setclientsRoutesKey] = useState(0)
  const [sortCLients, setSortCLients] = useState([0,'asc'])

  function handleRefreshGetClient(type: string, message: string) {
    setShowToast((oldShowToast) => ({...oldShowToast, condition: true, type, message}))
    setGetClientsKey(oldKey => oldKey + 1)
    setclientsRoutesKey(oldKey => oldKey + 1)
  }

  function handleSelectCLient(client: ClientInterfacec) {
    setSelectedClient(client)
  }

  function handleClickPagination(page: number) {
    getClients(page, searchTerm)
  }

  function handleSearch(term: string){
    let search: SearchClientTerms | undefined
    if(term){
      search = {name: term, email: term}
    }
    setSearchTerm(search)
  }

  function handleSortClients(sort: (string | number)[]){
    setSortCLients(sort)
  }

  async function getClients(page = 1, search: SearchClientTerms | undefined  = undefined, sortCLients = [1,'desc']) {
    const clientsMetadata = await CLientAPI.getCLients(page, search, sortCLients)
    if (clientsMetadata) {
      setClientsMetadata(clientsMetadata)
    }
  }

  useEffect(() => {
    getClients(undefined, searchTerm, sortCLients)
  }, [getClientsKey, searchTerm, sortCLients])

  return (
    <>
      <SystemToast setShowToast={setShowToast} showToast={showToast}/>
      <Container fluid className="mt-3 mb-3">
        <Row>
          <Col md="9" bg="secondary">
            {
              clientsMetadata &&
              <Client clientsMetadata={clientsMetadata} 
              onRemoveClient={handleRefreshGetClient} onSelectClient={handleSelectCLient} 
              onChangePagination={handleClickPagination}
              onSearch={handleSearch} onSortClients={handleSortClients}
              sortCLients={sortCLients} />
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
                <Route getclientsRoutesKey={getclientsRoutesKey} setclientsRoutesKey={setclientsRoutesKey} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App