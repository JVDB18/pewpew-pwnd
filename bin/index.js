#! /usr/bin/env node 
var validator= require('email-validator');
var axios= require('axios');
const {NODE_ENV} = process.env;
let[,,text]= process.argv;
if( process.argv.includes('--validate')) {
    text = validator.validate(text);
};
console.log(text);
var config={
    headers:{'User-Agent': 'Pwnage-Checker'}
}
if(text=true){
   if(process.argv.includes('--isPowned')){
       response="";
       let uri='https://haveibeenpwned.com/api/breachedaccount/' + text;
       axios.get(uri, config).then(response => {
           console.log(response.data)
       })
   };
}