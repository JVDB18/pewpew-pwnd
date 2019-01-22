#! /usr/bin/env node 
const validator= require('email-validator');
const axios= require('axios');
const ora= require('ora');
const chalk= require('chalk');
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
                spinner.stopAndPersist({
                    symbol:'💣',
                    text: chalk.bgRed('BREACH ALERT'),
                });
                response.data.forEach(element => {
                    console.log(chalk.bgRed('Your account has been wrecked by', element.Domain,' ', 'on ', element.BreachDate));
                    console.log(chalk.red('Description: ',element.Description));
                })
                })
            .catch(error => {
                    spinner.stop();
                    if(error.response){
                        spinner.stopAndPersist({
                            symbol:'🦄',
                            text:chalk.magenta("From Unicorn with love"),
                        });
                        console.log(chalk.cyan("Hey, Good Job mate your email adresse hasn't been wrecked"));
                    }
                    else if (error === 429){
                        spinner.stopAndPersist({
                            symbol:'🚩',
                            text:'Oops',
                        });
                        console.log(chalk.yellow("Server can't handle too much request or your connexion has failed"))
                    }
                    else{
                        spinner.stopAndPersist({
                            symbol:'🚩',
                        });
                        console.log(chalk.yellow("An unknown error has occured"))
                    }
                })
        };

            }
    else{
        console.log(chalk.red("You didn't write a valid e-mail adress, dumbass, try harder"))
    }
}
validity();

