import React, {useEffect, useState} from 'react';
import Todo from './Todo.js';
import { Button, FormControl,Input,InputLabel} from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from 'firebase';


function App() {
  const [todos, setTodos] =  useState(['ascd','asswd']);//Hook
  const [input, setInput]= useState('');

  //when this app load, we need to listen the database and fetch todos as they get added/removed
  
  useEffect(()=>{
    //This code.. fires when the app.js loads
      db.collection('todos').onSnapshot(snapshot=>{
        setTodos(snapshot.docs.map(doc=>doc.data().todo))
      })
  },[]);


  const addTodo= (event)=>{
    event.preventDefault();//It prevent the page keep refreshing when u press submit
    
    db.collection('todos').add({
      todo : input,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos,input])
    //'...arrname' is spreading using in ES6 to append the string with new values wihout deleting old values

    setInput('');//clearing up the input after hitting submit button
  }

  return (
    <div className="App">
        <h1>Hello World</h1>
        <form>
            <FormControl>
                <InputLabel>Write a todo task</InputLabel>
                <Input value={input} onChange={event=>setInput(event.target.value)}/>            
            </FormControl>
            <Button color="primary" variant="contained" 
                    type='submit' 
                    onClick={addTodo}
                    disabled={!input}//not enable to click wwhen input field is null
                    >Add todo
            </Button> 
        </form>      
        <ul>
            {todos.map(todo => (
              <Todo text={todo}/>
            ))}
        </ul>
    </div>
  );
}

export default App;
