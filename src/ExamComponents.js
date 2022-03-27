import {Col, Table} from 'react-bootstrap';
import {iconDelete, iconEdit} from './icons';


function Title(props){
    return (
        <Col>
        <h1>YOUR EXAMS</h1>
      </Col>
    );
}

function ExamTable(props){
    return (
    <Table striped bordered variant='dark'>
    <thead>
      <tr>
        <th>Exam</th>
        <th>Score</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
        {props.exams.map((exam) => <ExamRow key={exam.coursecode} exam={exam} 
        examName={props.courses.filter((c) => {c.coursecode === exam.coursecode})[0].name}/>)}
        
        {/* <ExamRow/>
        <ExamRow/>
        <ExamRow/>
        <ExamRow/> */}
      {/* <tr>
        <td>Data Science and Database Technology</td>
        <td>29</td>
        <td>03/06/2021</td>
        <td>{iconEdit}{iconDelete}</td>
      </tr>
      <tr>
        <td>Software Engineering</td>
        <td>18</td>
        <td>24/05/2021</td>
        <td>{iconEdit}{iconDelete}</td>
      </tr>
      <tr>
        <td>Web Application I</td>
        <td>24</td>
        <td>21/06/2021</td>
        <td>{iconEdit}{iconDelete}</td>
      </tr> */}
    </tbody>
  </Table>
    );
}

function ExamRow(props){
    return(
        <tr>
            <ExamInfo {...props}/> {/* to pass all the propriety to a children*/}
            <ExamControls/>
            {/* <td>Information system security</td>
            <td>28</td>
            <td>01/03/2021</td>
            <td>{iconEdit}{iconDelete}</td> */}
        </tr>
    );
}

//i break the ExamRow in two other components

function ExamInfo(props){
    return(
    <>
        <td>{props.examName}</td>
        <td>{props.exam.score}</td>
        <td>{props.exam.date.format('DD MMM YYYY')}</td>
     </>
    );
}

function ExamControls(props){
    return(<td>{iconEdit}{iconDelete}</td>);
}

export {Title, ExamTable};