#! /usr/bin/env node 
const validator= require('email-validator');
const axios= require('axios');
const ora= require('ora');
const {NODE_ENV} = process.env;

let[,,text]= process.argv;
function validity(){
    isValid = validator.validate(text);
    if(isValid===true){

        let config={
            headers:{'User-Agent': 'pwnd-checker'}
        }

            const spinner = ora({
                text: 'Have you been powned? ',
                color: "magenta",
                spinner:
                    {
                        interval: 70,
                        frames: [
                            "✶",
                            "✸",
                            "✹",
                            "✺",
                            "✹",
                            "✷"],
                        },
            });
            spinner.start();

        if(process.argv.includes('--isPowned')){
            let uri='https://haveibeenpwned.com/api/v2/breachedaccount/' + text;
            axios.get(uri, config)
            .then(response => {
                spinner.fail(["Yep you had"]);
                spinner.stop();
                response.data.forEach(element => {
                    console.log('Your account has been wrecked by', element.Domain,' ', 'on ', element.BreachDate);
                    console.log(element.Description);
                })
                })
            .catch(error => {
                    spinner.stop();
                    if(error.response){
                        spinner.stopAndPersist({
                            symbol:'🦄',
                            text: "Sending Unicorn's love",
                        });
                        console.log("Hey, Good Job mate your email adresse hasn't been wrecked");
                    }
                    else if (error === 429){
                        spinner.fail();
                        console.log("Server can't handle too much request or your connexion has failed")
                    }
                    else{
                        spinner.fail(["Yep you had"]);
                        console.log("An unknown error has occured")
                    }
                })
        };

            }
    else{
        console.log("You didn't write a valid e-mail adress, dumbass, try harder")
    }
}
validity();

