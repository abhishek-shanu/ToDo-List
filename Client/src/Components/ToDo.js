import React, { useEffect, useState } from 'react';
import Card from './UI/Card';
import ToDoList from './ToDoList';
import classes from './ToDo.module.css';

import axios from 'axios';

const ToDo =()=>{
    const [toDoContent,setToDoContent]=useState('');
    const [enteredToDos,setEnteredToDos]= useState([]);
    const [countTasks,setCountTasks] = useState(0);

    useEffect(()=>{
        axios.get('/')
        .then((response)=>{
            // console.log("get response",response.data[0].item_)
            setEnteredToDos((prevState)=>{
                console.log(response)
                const data= response.data.map((item)=>item)
                setCountTasks(data.length);
                return data;
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const handleInputChange=(event)=>{
        setToDoContent((prevState)=>{
            return event.target.value
        })
    }
    const handleSubmit=(event)=>{
        if(toDoContent.trim().length===0){
            alert("Please Enter Something")
            event.preventDefault()
            return
        }
        axios.post('/', {
            toDoContent:toDoContent,
        })
        .then(function (response) {
            setEnteredToDos((prevState)=>{
                return [...prevState,response.data]
            })
            setCountTasks((prevState)=>{
                return ++prevState;
            })
            setToDoContent('')
        })
        .catch(function (error) {
            console.log(error);
        });
        event.preventDefault()
    }
    const handleClearTasks=(event)=>{
        axios.delete('/',{})
        .then((response)=>{
            setCountTasks(0);
            setEnteredToDos([]);
            console.log("All items are deleted successfully")
        })
        .catch((err)=>console.log(err))
        return;
    }
    const handleDelete=(id)=>{
        axios.delete('/',{ data: { id: id } })
        .then((response)=>{
            setEnteredToDos((prevState)=>{
                const item_list=prevState.filter((item)=>{
                    return item._id!==id
                })
                setEnteredToDos(item_list)
            });
            setCountTasks((prevState)=>{
                return --prevState;
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return(
        <>
            <Card>
                <h1>ToDo App</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.inputContainer}>
                            <input type='text' placeholder="Add Your New ToDo" value={toDoContent} onChange={handleInputChange}/>
                            <button type='submit'>+</button>
                        </div>
                    </form>
                </div>
                
                <ToDoList list={enteredToDos} delete={handleDelete}/>
                <div className={classes.pendingTasks}>
                    <p>You have {countTasks} pending task(s)!</p>
                    <button onClick={handleClearTasks}>Clear All</button>
                </div>
                <p>&#169; Abhishek Kumar</p>
            </Card>
        </>
    )
}

export default ToDo;