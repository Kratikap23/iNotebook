
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';

import '@fortawesome/fontawesome-free/css/all.min.css';
import Alert from './components/Alert';
import { useState,useEffect } from 'react';
import PrivateRoute from "./components/PrivateRoute";


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1000)
  }
  useEffect(() => {
  localStorage.removeItem("token");
}, []);

  return (
    <>


      <Navbar />
      <Alert alert={alert}/>
      <div className="container">
        
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace/>} />
          <Route
    path="/home" element={
      <PrivateRoute>
        <Home />
      </PrivateRoute> }/>
          <Route exact path="/about" element={<About user={{ name: "Kratika" }} />} />
          <Route exact path="/login" element={<Login showAlert={showAlert} />} />
          <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
      </div>

    </>
  );
}

export default App;
