import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {getPictures, editPicture, deletePicture} from "../services/fromApi";
import '../App.css';
import './EditComponents.css';

const EditComponents = () => {
    const navigate = useNavigate();
    const [domComponents, setComponents] = useState([]);
    const [numOfComps, updateNumOfComps] = useState(0);

  useEffect(() => {
    getPictures().then(users => {
      for (const element of users) {
        let newdiv = <div className = "newComponent">
            <h2 className = "newComponentHeader">{element.Header}</h2>
            <form id = "editCompForm">  
            <div className="container">   
                <label className = "inputLabel" id = "title">New Title : </label>   
                <input className = "inputBox" type="text" placeholder={element.Header} name="title" required />  
                <label className = "inputLabel" id = "description">New Description : </label>   
                <input className = "inputBox" type="text" placeholder={element.Text} name="description" required />
                <label className = "inputLabel" id = "image">New Link to image : </label>   
                <input className = "inputBox" type="text" placeholder={element.ImgLink} name="imagelink" required />  
                <button className = "submitButton" type = "submit" onClick = {event => handleSubmit(event, element._id, 0)}>Edit Picture</button>  
                <p> </p>  
                <button className = "submitButton" type = "submit" onClick = {event => handleSubmit(event, element._id, 1)}>Delete Picture</button>  
            </div>   
            </form>
        </div>;
        if (numOfComps !== users.length) { //This is a little sketch but it works lmao
          updateNumOfComps(users.length);
          setComponents(domComponents => [...domComponents, newdiv]);
        }
      }
    });
  }, [numOfComps]); //Only updates if the number of components changes

    const handleSubmit = (event, id, num) => {
        event.preventDefault();
        if (num === 0) {
            editPicture(event.target.form.title.value, event.target.form.description.value, event.target.form.imagelink.value, id)
        } else if (num === 1) {
            deletePicture(id);
        }
        navigate('/', { replace: true});
    }

    return <div id = "editComp">
        <h1>Edit Pictures Page</h1>
        {domComponents}
    </div>;
};

export default EditComponents;