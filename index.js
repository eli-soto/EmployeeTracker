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
name: 'prompt',
message: 'How will your proceed?',
choices: ["view all employes", "add employees" , "exit"]




}]) .then((answer)=> {
    switch (answer.prompt) {
       case "view all employes":
            viewAllEmployess()
            break; 
            case "exit" :
                 db.end()
                 break; 
    }
})

}

function viewAllEmployess() {
    db.query("select * from employess", (error, data) => {
        if (error) throw error 
        console.table(data) 
        employee_tracker()
    })
}
employee_tracker()