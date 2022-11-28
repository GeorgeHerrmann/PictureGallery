import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate}
    from 'react-router-dom';
import Components from './pages/Components';
import NewComponent from './pages/NewComponent';
import EditComponents from './pages/EditComponents';
import {registerUser, loginUser, verifySession} from './services/fromApi';

let routes;
let loggedIn = false;

export function getLoggedIn() {
  return loggedIn;
}

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  verifySession(localStorage.getItem('token')).then(response => {
    if (response.success === true) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  })
  if (isLoggedIn === true) {
  routes = (
      <Router>
      <Navbar stateChanger = {setIsLoggedIn}/>
      <Routes>
          <Route exact path='/' element={<Components />} />
          <Route path='/NewComponent' element={<NewComponent />} />
          <Route path='/EditComponents' element={<EditComponents />} />
      </Routes>
      </Router>
    );
  } else {
    routes = (
      <Router>
      <Navbar stateChanger = {setIsLoggedIn}/>
      <Routes>
          <Route exact path='/' element={<Components />} />
          <Route path='/auth' element={<Auth stateChanger = {setIsLoggedIn} />} />
          <Route path='/signup' element={<AuthSignup />} />
      </Routes>
      </Router>
    );
  }
  loggedIn = isLoggedIn;
  return routes;
}

/* The code for the navbar */
const Navbar = () => {
  const logoutUser = ()=>{
    localStorage.setItem('token', "");
    localStorage.setItem('username', "");
    window.location.reload();
 }

  if (loggedIn === true) {
    return (
      <div className = "navbar">
        <li className = "navelement">
          <Link to="/">Pictures</Link>
        </li>
        <li className = "navelement">
          <Link to="/NewComponent">New Picture</Link>
        </li>
        <li className = "navelement">
          <Link to="/EditComponents">Edit Pictures</Link>
        </li>
        <li className = "navelement">
          <Link to="/" onClick={logoutUser}>Log Out</Link>
        </li>
      </div>
    );
  } else {
    return (
      <div className = "navbar">
        <li className = "navelement">
          <Link to="/">Pictures</Link>
        </li>
        <li className = "navelement">
          <Link to="/auth">Login</Link>
        </li>
      </div>
    );
  }
}

/* The code for the login page */
const Auth = ({stateChanger}) => {
  const userRef = React.createRef();
  const passRef = React.createRef();
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
      loginUser(userRef.current.value, passRef.current.value)
      .then(response => {
        if (response.success === true) {
          stateChanger(true);
          navigate('/', { replace: true});
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
        } else {
          document.getElementById("ErrorMessage").innerHTML = response.error;
        }
      });
  }

  const form =
    <form id = "loginform">  
      <div className="container">   
          <label className = "inputLabel" id = "user">Email : </label>   
          <input className = "inputBox" ref = {userRef} type="text" placeholder="Enter Email" name="username" required />  
          <label className = "inputLabel" is = "pass">Password : </label>   
          <input className = "inputBox" ref = {passRef} type="password" placeholder="Enter Password" name="password" required />  
          <button className = "submitButton" onClick = {event => handleSubmit(event)}>Login</button>    
      </div>
      <p id = "Signup"><Link to = "/signup">New User? Click here to Signup</Link></p>
      <p id = "ErrorMessage"></p>   
    </form>;
  return form;

};

/* The code for signing a user up (currently doesn't do anything) */
const AuthSignup = () => {
  const navigate = useNavigate();
  const userRef = React.createRef();
  const emailRef = React.createRef();
  const passRef = React.createRef();

  const handleSubmit = event => {
    event.preventDefault();
    if (userRef.current.value.length < 5 || passRef.current.value.length < 5 || emailRef.current.value.length < 5) {
      document.getElementById("ErrorMessage").innerHTML = "Username and Password must be greater than 5 characters";
    } else {
      registerUser(userRef.current.value, emailRef.current.value, passRef.current.value).then(response => {
        if (response.success === true) {
          navigate('/auth', { replace: true});
        } else {
          document.getElementById("ErrorMessage").innerHTML = "Invalid signup, you may already be registered";
        }
      })
    }
  }

  const form =
    <form id = "loginform">  
      <div className="container">
          <label className = "inputLabel" id = "user">Username : </label>   
          <input className = "inputBox" ref = {userRef} type="text" placeholder="Enter Username" name="username" required />  
          <label className = "inputLabel" id = "email">Email : </label>   
          <input className = "inputBox" ref = {emailRef} type="text" placeholder="Enter Email" name="email" required />  
          <label className = "inputLabel" is = "pass">Password : </label>   
          <input className = "inputBox" ref = {passRef} type="password" placeholder="Enter Password" name="password" required />  
          <button className = "submitButton" onClick = {event => handleSubmit(event)}>Signup</button>    
      </div>
      <p id = "Signup"><Link to = "/auth">Already signed up? Click here to login</Link></p>
      <p id = "ErrorMessage"></p>   
    </form>;
  return form;

};
