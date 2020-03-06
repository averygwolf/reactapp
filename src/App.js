import './App.css';
import { MdControlPoint, MdSearch, MdCropDin, MdKeyboardArrowRight, MdKeyboardArrowLeft, MdNoEncryption } from "react-icons/md";
import React, { Fragment, useState } from 'react';
import { DateTimePicker } from "@material-ui/pickers";
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar-material';
import { MuiPickersUtilsProvider, InlineDatePicker, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from '@material-ui/core/TextField';
import * as moment from 'moment'

function App() {

  const [notes, setNotes] = useState([
    {
      date: 'Saturday, February 29th',
      items:[
        {
          label:'EcoCar Meeting',
        },
        {
          label:'Look at 438 notes'
        }
      ]
    },{
      date:'Sunday, March 1st',
      items:[
        {
          label: 'Groceries'
        }
      ]
    }
  ])

  const [todos, setTodos] = useState([
    {
      date: 'Saturday, February 22nd',
      items:[
        {
          subject:'HCDE 438: ',
          label: 'Project Proposal'
        },
        {
          label:'EcoCar: Make meeting slides'
        }
      ]
    },{
      date:'Sunday, March 1st',
      items:[
        {
          label: 'HCDE 300: Readings'
        }
      ]
    }
  ])
  

  const [addingToDo, setAddingToDo] = useState(false)
  const [addingNote, setAddingNote] = useState(false)

  const [date, setDate] = useState(null)
  const [text, setText] = useState('')

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
    setTodos(newTodos)
  }

  function colorPicker(subject){
    if (subject==='HCDE 438') {
      return 'red'
    } else if (subject==='EcoCar') {
      return 'green'
    } else {
      return 'blue'
    }  
  }

  /*
  function BasicDateTimePicker() {
    const [selectedDate, handleDateChange] = useState(new Date());

    return (
      <Fragment>
        <DateTimePicker
          label="DateTimePicker"
          inputVariant="outlined"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </Fragment>
    )
  }
  */

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
          <button className='searchbutton' onClick={() => {
            
          }}
            style={{border: 'none', 'margin-left':5, height:25, width:25}}>
            <MdSearch style={{color: 'gray', 'margin-left':10, height:25, width:25}} />
          </button>
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

          {notes.map(notesForDate=>{
          return <div>
            <div className='card'>
              {notesForDate.date}
            </div>
            {notesForDate.items.map(notes=>{
              return <div className='subject'>
                <MdCropDin className='checkbox' style={{'margin-left':5, height:20, width:20}} />
                <colorPicker subject={notes.subject} />
                <div className='subjectcolor'> </div>
                {notes.subject}
                {notes.label}
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
        Date: 
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
          }}>
          Save
        </button>

        </div>
      </div>
      }
    </div>



    <div className='rightsection'>
      <div className='title3'>
          Notes
          <button className='addbutton' onClick={() => {
            setAddingNote(!addingNote)
          }}
            style={{border: 'none', 'margin-left':150, height:25, width:25}}>
            <MdControlPoint style={{height:25, width:25}} />
          </button>
      </div>
      {!addingNote && <div>
      {todos.map(todosForDate=>{
        return <div>
          <div className='date'>
            {todosForDate.date}
          </div>
          {todosForDate.items.map(todo=>{
            return <div className='note1'>
              {todo.label}
              <div className='chevwrap'>
                <MdKeyboardArrowRight className='chevron'/>
              </div>
            </div>
          })}
        </div>
      })}
      </div>
      }
      {addingNote && <div>
        <div className='date'>
          <TextField className='notetitle'
            id="standard-multiline-flexible"
            label="Title"
            multiline
            rowsMax="4"
          />
          <TextField className='notetext'
            id="outlined-multiline-static"
            label="Note"
            multiline
            rows="4"
            variant="outlined"
          />

          <button variant="contained" color="primary" className='savebutton'>
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
