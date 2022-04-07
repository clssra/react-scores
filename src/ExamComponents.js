import {Col, Table, Form, Button} from 'react-bootstrap';
import {iconDelete, iconEdit} from './icons';
import {useContext, useState} from 'react';
import dayjs from 'dayjs';
import { Routes, Route, Link, useNavigate, Navigate, useLocation} from 'react-router-dom';
import { PrivacyMode, EditMode} from './createContext';


function Title(props){
    return (
        <Col>
            <h1>YOUR EXAMS</h1>
        </Col>
    );
}

function ExamTable(props){

    const [exams, setExams] = useState(props.exams);

    const examCodes = exams.map(exam => exam.coursecode);

    //props.exams is only readable, exams is modifiable

    const deleteExam = (code) => {
        setExams((oldExams) => {
            return oldExams.filter(exam => exam.coursecode !== code);
            //recreating a new array because i have to operate with state variables
        });
    }

    const addExam = (newExam) => {
        //always create a new array plus the new element
        setExams(oldExams => [...oldExams, newExam]);

    };

    const updateExam = (newExam) => {
        setExams(oldState => oldState.map(
            (exam) => exam.coursecode === newExam.coursecode ? newExam : exam
        ));
    };

    return (
        <Routes>
            <Route path ='/' exact element={
                <>
                    <Table striped bordered >
                        <thead>
                        <tr>
                            <th>Exam</th>
                            <th>Score</th>
                            <th>Date</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map((exam) => <ExamRow key={exam.coursecode} exam={exam} 
                                examName={props.courses.filter(c => c.coursecode === exam.coursecode)[0].name} 
                                deleteExam={deleteExam} />
                            )}
                        </tbody>
                    </Table>
                    <Link to='/add'><Button variant='success'>ADD</Button></Link>
                </>
            }> 
            </Route>
            <Route path='/add' 
                element=
                    {<ExamForm 
                        courses={props.courses.filter(course => !examCodes.includes(course.coursecode))} 
                        addOrUpdateExam={addExam}/>
                    }>
            </Route>
            {/*     <Route path='/update/:coursecode'>  */}
            <Route path='/update'
                element={<ExamForm courses={props.courses} addOrUpdateExam={updateExam}/>}
            >
            </Route>

        </Routes>
    );
}

function ExamRow(props){
    return(
        <tr>
            <ExamInfo {...props}/>{/* to pass all the propriety to a children*/}
            {/* <EditMode.Consumer>
                {editable => editable ? <ExamControls exam={props.exam} deleteExam={props.deleteExam}/> : <td><i>disabled</i></td>}
            </EditMode.Consumer> */}
            <ExamControls exam={props.exam} deleteExam={props.deleteExam}/>
        </tr>
    );
}

//i break the ExamRow in two other components

function ExamInfo(props){
    let privacyMode = useContext(PrivacyMode);
  //  console.log(props.exam.date.format('DD MMM YYYY'));
    return(
    <>
        <td>{props.examName}</td>
        <td>{
        // privacyMode ? 'X' : 
        props.exam.score}</td>
        <td>{
        //privacyMode ? 'X' : 
        props.exam.date.format('DD MMM YYYY')}</td>
    </>
    );
}

function ExamControls(props){
    console.log('pd');
    console.log(props.exam);

    return(
        <td>
            <Link to='/update' state= {{exam : props.exam}}>{iconEdit}</Link>
            
            {/*
                ANOTHER METHOD

                <Link to='/update/01TYMOV'>

             state obj is used to provide something to the destination */}
            
            <span onClick={() => props.deleteExam(props.exam.coursecode)}>{iconDelete}</span>
        </td>);
}


function ExamForm(props){
    const location = useLocation();


    const [course, setCourse] = useState(location.state ? location.state.exam.coursecode : ''); //props.courses[0].coursecode --> for the defaultValue
    const [score, setScore] = useState(location.state ? location.state.exam.score : '');
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [errorMessage, setErrorMessage] = useState();

   

    const [submitted, setSubmitted] = useState(false);
    // location.state is defined ==> we are in UPDATE MODE and 
    // location.state.exam has a starting value
    //if location.state is undefined ==> we are in ADD MODE

   // let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        //MUST DO VALIDATION

        let valid = true;

        if(course === '' || score=== '' || date === '')
            valid=false;
        
        const scorenumber = +score; //0+score --> to convert to integer
        if(scorenumber<18 || scorenumber>30)
            valid=false;

        //ADD MORE CHECKS

        if(valid){
            setErrorMessage('');
            const exam = {coursecode: course, score: scorenumber, date: dayjs(date)};
            props.addOrUpdateExam(exam);
            //prevent reusing the data after successful submission
            
            //GO BACK TO HOMEPAGE
            setSubmitted(true);
            
            // setCourse('');
            // setScore('');
            // setDate('');
        } else {
            setErrorMessage('Error in the form');
            //NOT the right way to do it
            //different messages for what went wrong
        }

    };

    return(
        <>
            {submitted && <Navigate to='/' replace/>}
            <Form>
                {/* Exam:<select value={course} onChange={ev => setCourse(ev.target.value)}>
                        <option value='' disabled> Choose one...</option>
                        {props.courses.map((course => <option key={course.coursecode} value={course.coursecode}>{course.name}</option>))}
                    </select><br/>
                Score: <input type='number' value={score} onChange={(event) => setScore(event.target.value)}></input><br/>
                Date: <input type='date' value={date} onChange={(event) => setDate(event.target.value)}></input><br/>
                <button onClick={handleAdd}>Add</button><br/> */}
                <span style={{color:'red'}}>{errorMessage}</span>
                <Form.Group controlId='selectedCourse'>
                    <Form.Label>course</Form.Label>
                    <Form.Control as='select' 
                    value={course}
                    disabled={location.state}
                    onChange={ev => setCourse(ev.target.value)}>
                    <option disabled hidden value=''>choose...</option>
                    {props.courses.map((course => <option key={course.coursecode} value={course.coursecode}>{course.name}</option>))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='selectedScore'>
                    <Form.Label>score</Form.Label>
                    <Form.Control 
                        type='number'
                        min={18} 
                        max={31} 
                        value={score}
                        onChange={ev => setScore(ev.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='selectedDate'>
                    <Form.Label>date</Form.Label>
                    <Form.Control
                        type='date'
                        value={date}
                        onChange={ev => setDate(ev.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button onClick={handleSubmit}>save</Button>
                <Link to='/'><Button variant='secondary'>cancel</Button></Link>
            </Form>
        </>
    );
}

export {Title, ExamTable};