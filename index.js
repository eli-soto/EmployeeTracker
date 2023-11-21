const inquirer = require('inquirer');
const db = require('./db/connection');

db.connect(err => {

if (err) throw err;
console.log('Database connected.');
employee_tracker();
});

let employee_tracker = function (){
inquirer.prompt ([{
type: 'list',
name: 'promt',
message: 'How will your proceed?',
choices: []



}])

}