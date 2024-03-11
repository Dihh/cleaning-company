import './App.css'
import { Col, Container, Row } from 'react-bootstrap';
import Client from './components/client/Client';
import ClientForm from './components/client/ClientForm';
import Routes from './components/routes/Routes';
import SystemToast from './components/shared/SystemToast';
import ClientContextProvider from './store/client-context';
import ToastContextProvider from './store/toast-context';

function App() {


  return (
    <ToastContextProvider>
      <ClientContextProvider>
        <SystemToast />
        <Container fluid className="mt-3 mb-3">
          <Row>
            <Col md="9" bg="secondary">
              <Client />
            </Col>
            <Col>
              <Row>
                <Col>
                  <ClientForm />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Routes />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </ClientContextProvider>
    </ToastContextProvider>
  )
}

export default App