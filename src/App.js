import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {ExamTable, Title} from './ExamComponents';

function App() {
  return (
    <Container className='App'>
      <Row>
        <Title/>
      </Row>
      <Row>
        <ExamTable/>
      </Row>
    </Container>
  );
}

export default App;
