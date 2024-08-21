import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './components/EventList';
import AddEvent from './components/AddEvent';
import ShowPage from './components/ShowPage';
import DeletePage from './components/DeletePage'; 
import EditPage from './components/EditPage'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<EventList />} />
          <Route path='/add' element={<AddEvent />} />
          <Route path='/events/:id' element={<ShowPage />}/>
          <Route path='/events/:id/delete' element={<DeletePage />} />
          <Route path='/events/:id/edit' element={<EditPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
