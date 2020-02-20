import React from 'react';
import './App.css';
import { MdControlPoint, MdSearch, MdCropDin } from "react-icons/md";

function App() {
  return (
  <header>  
    <div className='leftsection'>
      <div className='sectioncontent1'>
        <div className='title1'>
          Calendar
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
    </div>
  </header>
  );
}

export default App;
