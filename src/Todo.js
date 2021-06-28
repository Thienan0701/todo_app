import React, { useState } from 'react';
import './Todo.css';
import { makeStyles } from '@material-ui/core/styles';
import { List,ListItem, ListItemText, ListItemAvatar, Modal, Button, Input } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import db from './firebase';
import firebase from 'firebase';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


function Todo(props) {
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const [input,setInput] = useState('')
    


    const updateTodo = () => {
        //update the todo with new input task
        db.collection('todos').doc(props.task.id).set({
            todo : input,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
    }, {merge : true})
        setOpen(false)
    }
    return (
        <>
        <Modal             
            open={open}
            onClose={e => setOpen(false)}
        >
                <div className={classes.paper}>
                    <h1>I'm a modal</h1>
                    <Input placeholder={props.task.todo} value={input} onChange={event => setInput(event.target.value)}/>
                    <Button color="primary" variant="contained" onClick={updateTodo}>Update</Button>
                </div>
        </Modal>
        <List className="todo_list">
            <ListItem >
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={props.task.todo} secondary="Need to do"/>
                <EditIcon color="primary" 
                          fontSize="large" 
                          variant="contained"  
                          onClick={e => setOpen(true)}/>
                <DeleteForeverIcon 
                    fontSize="large"
                    variant="contained" 
                    onClick={event =>  db.collection('todos').doc(props.task.id).delete()}/>
            </ListItem>

            
        </List>
        </>
    )
}

export default Todo;
