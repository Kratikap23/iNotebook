
import './App.css';
import {  Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Alert from './components/Alert';


function App() {
  return (
    <>
    <NoteState>
     
        <Navbar />
        <Alert message="This is amazing app"/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About user = {{name:"Kratika"}}/>} />
        </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
