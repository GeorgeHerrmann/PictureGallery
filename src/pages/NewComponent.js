import React from "react";
import { useNavigate } from "react-router-dom";
import { newPicture } from "../services/fromApi";
import '../App.css';
import './NewComponent.css';

const titleRef = React.createRef();
const descriptionRef = React.createRef();
const linkRef = React.createRef();

const About = () => {
  const navigate = useNavigate();
  let compForm = (
    <div className = "newComponent">
      <h2 className = "newComponentHeader">New Picture:</h2>
      <form id = "newCompForm">  
      <div className="container">   
          <label className = "inputLabel" id = "title">Title : </label>   
          <input className = "inputBox" type="text" placeholder="New Component Title" ref={titleRef} name="title" required />  
          <label className = "inputLabel" id = "description">Description : </label>   
          <input className = "inputBox" type="text" placeholder="New Component Description" ref={descriptionRef} name="description" required />
          <label className = "inputLabel" id = "image">Link to image : </label>   
          <input className = "inputBox" type="text" placeholder="New Component Image Link" ref={linkRef} name="imagelink" required />  
          <button className = "submitButton" type = "submit" onClick = {event => handleSubmit(event)}>Submit</button>    
      </div>   
      </form>
    </div>
  );
  
  const handleSubmit = event => {
    event.preventDefault();
    newPicture(titleRef.current.value, descriptionRef.current.value, linkRef.current.value, localStorage.getItem('username'));
    navigate('/', { replace: true});
  }

  return compForm
};
  
export default About;