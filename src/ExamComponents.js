import {Col, Table} from 'react-bootstrap';
import {iconDelete, iconEdit} from './icons';
import {useState} from 'react';


function Title(props){
    return (
        <Col>
        <h1>YOUR EXAMS</h1>
      </Col>
    );
}

function ExamTable(props){

    const [exams, setExams] = useState(props.exams);

    //props.exams is only readable, exams is modifiable

    const deleteExam = (code) => {
        setExams((oldExams) => {
            oldExams.filter(exam => exam.coursecode !== code);
            //recreating a new array because i have to operate with state variables
        });
    }

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
        {exams.map(((exam) => <ExamRow key={exam.coursecode} exam={exam} 
        examName={props.courses.filter((c) => c.coursecode === exam.coursecode)[0].name} 
        deleteExam={deleteExam} />))}
    </tbody>
  </Table>
    );
}

function ExamRow(props){
    return(
        <tr>
            <ExamInfo {...props}/> {/* to pass all the propriety to a children*/}
            <ExamControls exam={props.exam} deleteExam={props.deleteExam}/>
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
    return(<td>{iconEdit}
    <span onClick={() => props.deleteExam(props.exam.coursecode)}>{iconDelete}</span></td>);
}

export {Title, ExamTable};