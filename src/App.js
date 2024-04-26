import "./App.css";
import About from "./components/about";
import Footer from "./components/footer";
import Home from "./components/home";
import Login from "./components/login";
import NavBar from "./components/navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUp from "./components/signup";

function App() {
  const style = {
    overflow: 'auto',
    msOverflowStyle: 'none', /* IE and Edge */
    scrollbarWidth: 'none' /* Firefox */
  };
  return (
    <Router>
      <div className="App" style={style}>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<SignUp />}></Route>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
