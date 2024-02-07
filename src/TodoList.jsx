import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarsIcon from '@mui/icons-material/Stars';

export default function TodoList() {
    let [todo, setTodo] = useState([{ task: "Hello", id: uuidv4(), isImportant:false, isDone: false }]);
    let [newtodo, setNewtodo] = useState("");

    function addNewtodo(event) {
        setNewtodo(event.target.value);
    }

    function addTodo() {
        setTodo((prevtodo) => {
            return [...prevtodo, { task: newtodo, id: uuidv4(), isImportant:false, isDone: false }];
        });
        setNewtodo("");
    }

    function handleDelete(id) {
        setTodo((prevtodo) => {
            return prevtodo.filter((el) => {
                return el.id != id;
            })
        })
    }

    function handleImportant(id) {
        setTodo((prevtodo) => {
            return prevtodo.map((el) => {
                if (el.id == id) {
                    return {
                        ...el,
                        isImportant: true
                    }
                } else {
                    return el;
                }
            })
        })
    }

    function allDelete(id) {
        setTodo((prevtodo) => {
            return prevtodo.filter((el) => {
                return el.id == id;
            })
        })
    }

    function handleDone(id){
        setTodo((prevtodo)=>{
            return prevtodo.map((el)=>{
                if(el.id==id){
                    return {
                        ...el,
                        isDone:true
                    }
                } else {
                    return el;
                }
            })
        })
    }
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
        }}>
            <h1 style={{textDecoration:"4px underline"}}>Todo-List</h1>
            <TextField style={{backgroundColor:"white", borderRadius:"1.5rem"}} value={newtodo} onChange={addNewtodo} id="filled-basic" label="Task" variant="filled" />
            <br />
            <Button style={{borderRadius:"1rem", backgroundColor:"#ADD8E6", color:"black", fontWeight:"bold"}} onClick={addTodo} variant="contained">Add Task</Button>
            <h2>-: Tasks :-</h2>
            <div style={{
                border: "4px solid black",
                padding: "2rem",
                width: "550px",
                backgroundColor: "lightyellow",
                borderRadius:"1rem"
            }}>
                <ul>
                    {
                        todo.map((el) => {
                            return <li style={{marginRight:"1rem",marginBottom:"1rem" , color:"white", border:"3px solid black", padding:"0.5rem", borderRadius:"1.5rem",backgroundColor:"#122744"}} key={el.id} >
                                {el.isImportant == true ? <span style={{ fontSize:"1.5rem", fontWeight: "600", color: "red" }}>{el.task}</span> : <span style={{fontSize:"1.5rem"}}>{el.task}</span>}
                                &nbsp;&nbsp;&nbsp;
                                <Button onClick={()=>handleDone(el.id)}>{el.isDone==true?<CheckCircleIcon style={{color:"#7CFC00"}}/>:<TaskAltIcon style={{color:"#7CFC00"}}/>}</Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span><Button style={{ backgroundColor: "black", color: "white" , borderRadius:"1rem", border:"1.75px solid white"}} onClick={() => handleDelete(el.id)} variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button></span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button style={{ backgroundColor: "red" , borderRadius:"1rem", border:"1.75px solid white"}} onClick={() => handleImportant(el.id)} variant="contained" endIcon={<StarsIcon />}>
                                    Important
                                </Button></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </li>;
                        })
                    }
                </ul>
            </div>
            <br />
            <br />
            <Button variant="outlined" style={{border:"4px solid red",
            fontWeight:"700" ,borderRadius:"1rem", color:"white"}} color="error" onClick={() => allDelete(uuidv4())}>All Delete</Button>
        </div>
    )
}