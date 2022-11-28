import React, { useEffect, useState } from "react";
import {getPictures} from "../services/fromApi";
import './Components.css';
import '../App.css';
  

function About () {
  const [domComponents, setComponents] = useState([]);
  const [numOfComps, updateNumOfComps] = useState(0);

  useEffect(() => {
    getPictures().then(users => {
      for (const element of users) {
        let newdiv = <div className = "component">
          <h3 className = "compheader">{element.Header}</h3>
              <p className = "comptext">{element.Text}</p>
              <img className = "compimg" src = {element.ImgLink} height = "200" width = "200" alt = "example"></img>
              <p className = "comptext">Author: {element.username}</p>
              <p className = "compText"><a href = {element.ImgLink} target = "_blank" rel="noopener noreferrer">Go to image</a></p>
        </div>;
        if (numOfComps !== users.length) { //This is a little sketch but it works lmao
          updateNumOfComps(users.length);
          setComponents(domComponents => [...domComponents, newdiv]);
        }
      }
    });
  }, [numOfComps]); //Only updates if the number of components changes

  return (
    <div id = "compContainer">
      <h1>
        All Pictures
      </h1>
      {domComponents}
    </div>
  );
};
  
export default About;