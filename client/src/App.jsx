import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './components/EventList';
import AddEvent from './components/AddEvent';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<EventList/>}/>
          <Route path='/add' element={<AddEvent/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
