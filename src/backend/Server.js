const express=require('express');
const bodyParser=require('body-parser');
const api = require('./api');
 
const port=4000;
const app=express();
  
/* If you see this in the console then the API is working */
app.listen(port, function() {
    console.log("Server is listening at port:" + port);
});
 
// Parses the text as url encoded data
app.use(bodyParser.urlencoded({extended: true}));
 
// Parses the text as json
app.use(bodyParser.json());
 
app.use('/api', api);