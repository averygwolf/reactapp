import './App.css';
import { MdControlPoint, MdSearch, MdCropDin, MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar-material';

function App() {
  const [todos, setTodos] = useState([
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

  return (
  <header>  
    <div className='leftsection'>
      <div className='sectioncontent1'>
        {/*<div className='title1'>
          <MdKeyboardArrowLeft className='titlechevron'/>
          February
          <MdKeyboardArrowRight className='titlechevron'/>
        </div>
        <div className='optiontab'>
          <div className='today'>
            Today
          </div>
          <div className='thisweek'>
            This Week
          </div>
          <div className='thismonth'>
            This Month
          </div>
        </div>
  */}
        <div className='calendarwrap'>
          <Calendar 
            showHeader={false}
            accentColor={'black'}
          />
        </div>
      </div>
    </div>
    <div className='middlesection'>
      <div className='title2'>
          To-Do List
          <MdSearch style={{color: 'gray', 'margin-left':100, height:25, width:25}} />
          <MdControlPoint style={{'margin-left':5, height:25, width:25}} />
      </div>
      <div className='subtitle1'>
        Upcoming
      </div>
      <div className='dates'>
        Saturday, February 22nd
      </div>
      <div className='cardwrap'>
        <MdCropDin style={{'margin-left':5, height:20, width:20}} />
        <div className='subjectcolor'> </div>
        <div className='card'>
          <div className='subject'>
            HCDE 438
          </div>
          Project Proposal
        </div>
      </div>
    </div>
    <div className='rightsection'>
      <div className='title3'>
          Notes
      </div>
      
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
  </header>
  );
}

export default App;
