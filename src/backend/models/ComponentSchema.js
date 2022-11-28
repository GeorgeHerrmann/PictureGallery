/* Defines the model for what a picture contains, the same should be done for a "user" (with username, password, etc) */

const mongoose=require('mongoose');
 
const ComponentSchema = new mongoose.Schema({
    Header:String,
    Text:String,
    ImgLink:String,
    username:String,
});
 
module.exports = mongoose.model(
    'Picture', ComponentSchema, 'Gallery');