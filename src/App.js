import './App.css';
import { MdControlPoint, MdSearch, MdCropDin, MdKeyboardArrowRight, MdKeyboardArrowLeft, MdNoEncryption } from "react-icons/md";
import React, { Fragment, useState, useEffect } from 'react';
import Calendar from 'react-calendar-material';
import { MuiPickersUtilsProvider, InlineDatePicker, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from '@material-ui/core/TextField';
import * as moment from 'moment'

function App() {

  const [notes, setNotes] = useState([
    {
      date: '02/29/2020',
      items:[
        {
          label:'EcoCar Meeting',
        },
        {
          label:'Look at 438 notes'
        }
      ]
    },{
      date:'03/01/2020',
      items:[
        {
          label: 'Groceries'
        }
      ]
    }
  ])

  const [todos, setTodos] = useState([
    {
      date: '02/22/2020',
      items:[
        {
          label: 'HCDE 438: Project Proposal'
        },
        {
          label:'EcoCar: Make meeting slides'
        }
      ]
    },{
      date:'03/01/2020',
      items:[
        {
          label: 'HCDE 300: Readings'
        }
      ]
    }
  ])

  useEffect(()=>{
    const t = localStorage.getItem('todos')
    if(t) {
      setTodos(JSON.parse(t))
    }
  },[])

  const [addingToDo, setAddingToDo] = useState(false)
  const [addingNote, setAddingNote] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [date, setDate] = useState(null)
  const [text, setText] = useState('')
  const [view, setView] = useState(false)

  const [selectedDate, handleDateChange] = useState(new Date());

  function addNote(date,text){
    const newNote = [...notes]
    const notesForDate = newNote.find(t=>t.date===date)
    if (notesForDate){
      notesForDate.items.push({label:text})
    } else {
      newNote.push({
        date:date,
        items:[{label:text}]
      })
    }
    localStorage.setItem('notes', JSON.stringify(newNote))
    setNotes(newNote)
  }

  function addTodo(date,text){
    const newTodos = [...todos]
    const todosForDate = newTodos.find(t=>t.date===date)
    if(todosForDate){
      todosForDate.items.push({label:text})
    } else {
      newTodos.push({
        date:date,
        items:[{label:text}]
      })
    }
    localStorage.setItem('todos', JSON.stringify(newTodos))
    setTodos(newTodos)
  }

  function removeTodo(date,text){
    const newTodos = [...todos]
    const todosForDate = newTodos.find(t=>t.date===date)
    todosForDate.items = todosForDate.items.filter(t=> t.label!==text)
    localStorage.setItem('todos', JSON.stringify(newTodos))
    setTodos(newTodos)
  }

  function removeNotes(date,text){
    const newNotes = [...notes]
    const notesForDate = newNotes.find(t=>t.date===date)
    notesForDate.items = notesForDate.items.filter(t=> t.label!==text)
    localStorage.setItem('notes', JSON.stringify(newNotes))
    setNotes(newNotes)
  }



  return (
  <header>  
    <div className='leftsection'>
      <div className='sectioncontent1'>
        <div className='calendarwrap'>
          <Calendar 
            showHeader={false}
            accentColor={'#b7b6d1'}
          />
        </div>
      </div>
    </div>


    <div className='middlesection'>
      <div className='title2'>
          To-Do List
          <button className='addbutton' onClick={() => {
            setAddingToDo(!addingToDo)
          }}
            style={{border: 'none', 'margin-left':15, height:25, width:25}}>
            <MdControlPoint style={{height:25, width:25}} />
          </button>
      </div>
     {!addingToDo && <div>
        <div className='subtitle1'>
          Upcoming
        </div>
        <div className='cardwrap'>

          {todos.map(todosForDate=>{
          if(todosForDate.items.length===0) return <></>
          else
          return <div>
            <div className='card'>
              {todosForDate.date}
            </div>
            {todosForDate.items.map(todos=>{
              return <div className='subject'>
                <button 
                style={{'margin-left':5, height:20, width:20, border: 'none'}}>
                <MdCropDin className='checkbox' onClick={()=>removeTodo(todosForDate.date,todos.label)}
                style={{height:20, width: 20, border: 'none'}}></MdCropDin>
                </button>
                <colorPicker subject={todos.subject} />
                <div className='subjectcolor'> </div>
                {todos.label}
              </div>
            })}
          </div>
          })}
        </div>
      </div>}
      {addingToDo && <div>
        <div className='subtitle1'>
          Add a new to do item:
        </div> 
        <div className='datepicker'>
        Due Date: 
        <MuiPickersUtilsProvider utils={DateFnsUtils}> 
        <InlineDatePicker style={{'margin-left':15}} 
          inputVariant="outlined" 
          onChange={handleDateChange} 
          value={selectedDate} 
          />
        </MuiPickersUtilsProvider>
        </div>
        <div>
        <TextField className='todoitem'
            id="standard-multiline-flexible"
            label="To Do Item"
            multiline
            rowsMax="4"
            variant='outlined'
            onChange={e=> setText(e.target.value)}
            value={text}
        />
        <button variant="contained" color="primary" className='savebutton' onClick={()=>{
          const formattedDate = moment(selectedDate).format('MM/DD/YYYY')
          addTodo(formattedDate, text)     
          setText('')   
          setAddingToDo(false)
          }}>
          Save
        </button>

        </div>
      </div>
      }
    </div>



    <div className='rightsection'>
      <div className='title2'>
          Notes
          <button className='addbutton' onClick={() => {
            setAddingNote(!addingNote)
          }}
            style={{border: 'none', 'margin-left':150, height:25, width:25}}>
            <MdControlPoint style={{height:25, width:25}} />
          </button>
      </div>
      {!addingNote && <div>
      {notes.map(notesForDate=>{
        if(notesForDate.items.length===0) return <></>
        else
        return <div>
          <div className='date'>
            {notesForDate.date}
          </div>
          {notesForDate.items.map(notes=>{
            return <div className='note1' onClick={()=>removeNotes(notesForDate.date,notes.label)}>
              {notes.label}
              
            </div>
          })}
        </div>
      })}
      </div>
      }
      {addingNote && <div>
        <div className='date'>
          <div className='datepicker2'>
          Date: 
          <MuiPickersUtilsProvider utils={DateFnsUtils}> 
          <InlineDatePicker style={{'margin-left':15}} 
            inputVariant="outlined" 
            onChange={handleDateChange} 
            value={selectedDate} 
            />
          </MuiPickersUtilsProvider>
          </div>
        
          <TextField className='notetext'
            id="outlined-multiline-static"
            label="Note"
            multiline
            rows="4"
            onChange={e=> setText(e.target.value)}
            value={text}
            variant="outlined"
          />

          <button variant="contained" color="primary" className='savebutton' onClick={()=>{
            const formattedDate = moment(selectedDate).format('MM/DD/YYYY')
            addNote(formattedDate, text)     
            setText('')   
            setAddingNote(false)
            }}>
            Save
          </button>

        </div>
      
      
      </div>
      }   
    </div>
  </header>
  );
}

export default App; 
