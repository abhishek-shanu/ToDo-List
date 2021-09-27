import React from 'react';
import classes from './ToDoList.module.css'

const ToDoList=(props)=>{
    const handleDeleteItem=(_id)=>{
        props.delete(_id)
    }
    return(
        <div className={classes.container}>
            <ul>
                {props.list.map((elt)=>{
                    return(
                        <li key={elt._id} className={classes.item}>
                            {elt.item_}
                            <span className={classes.icon} onClick={()=>handleDeleteItem(elt._id)}>
                                <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
                            </span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ToDoList;