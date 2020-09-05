import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
        <Button className="mr-2"><Link style={{textDecoration:"none"}} className="text-white" to={"/edit/"+props.exercise._id}>Edit</Link></Button>
        <Button variant="danger"><a href="#" style={{textDecoration:"none"}} className="text-white" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</a></Button>
    </td>
  </tr>
)

const ExercisesList = () => {
    const [exercises, setExercises] = useState([]);

    const exerciseList = () => {
        return exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id}/>;
        })
    }
    const  deleteExercise = (id) => {
        axios.delete('http://localhost:5000/exercises/'+id)
        .then(response => { console.log(response.data)})
        .then(()=>{
            setExercises(exercises.filter(el => el._id !== id))
        })
    }
    
    useEffect(() => {
        axios.get('http://localhost:5000/exercises/')
              .then(response => {
                console.log(response.data);
                setExercises(response.data)
              })
              .catch((error) => {
                console.log(error);
              })
    }, [])
    return (
        <div>
            <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseList()}
                </tbody>
            </table>
       </div>
        </div>
    )
}

export default ExercisesList;