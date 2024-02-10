import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./Context/notes/NoteState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
