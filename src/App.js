import React from "react";
import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
 
  return (
    <> 
      <NoteState>
        <Router>
          <Navbar
            title="iNotebook"
            aboutText="About Us"
            // mode={mode}
            // toggleMode={toggleMode}
          /> 
          <Alert message="Alert visible"/>
          
          <Routes>
            {<Route path="/" element={<Home />} />}
            {<Route path="/about" element={<About />} />}
            {<Route path="/signup" element={<Signup/>}/> }
            {<Route path="/login" element={<Login/>}/> }
            {/* mode={mode} */}

            {/* </Route>
          <Route path="/users">
            <Users /> */}
          </Routes>

        </Router>
        </NoteState>
      
    </>
  );
}

export default App;
