const inquirer = require("inquirer");
const db = require("./db/connection");
//console.log(db)
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  employee_tracker();
});

function employee_tracker () {
  inquirer
    .prompt([
      {
        type: "list",
        name: "prompt",
        message: "How will your proceed?",
        choices: [
          "View all deparments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add employees",
          "Update an employee role",
          "exit",
        ],
      },
    ])

    .then((answer) => {
      switch (answer.prompt) {

        case "View all employees":
          viewAllEmployees();
          break;

        case "View all deparments":
          viewAllDeparments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "Add a department":
          addADeparment();
          break;
        case "Add a role":
          addARole();
          break;
        case "Add employees":
          addEmployees();
          break;
        case "Update an employee role":
          updateAnEmployessRole();
          break;
          default:
          process.exit()
      }
    });
};

function viewAllEmployees() {
  db.query("select * from employee", (error, data) => {
    if (error) throw error;
    console.table(data);
    employee_tracker();
  });
}

function viewAllDeparments() {
  db.query("select * from department ", (error, data) => {
    if (error) throw error;
    console.table(data);
    employee_tracker();
  });
}

function viewAllRoles() {
  db.query("select * from role ", (error, data) => {
    if (error) throw error;
    console.table(data);
    employee_tracker();
  });
}

function addADeparment() {
inquirer.prompt([{
type: "input",
name: "departName",
message: "What is the name of this department"
}])
.then((answer)=>{
    db.query("INSERT INTO department set ?",{
                name: answer.departName},(error)=>{
        if (error) throw error;
        console.table(answer);
        employee_tracker();
    })
}) 

}

function addARole() {
    inquirer.prompt([{
    type: "input",
    name: "roleTitle", "roleSalary", "roleDepartment",
    message: "What is the title, salary, and department of this role"
    }])
    .then((answer)=>{
        db.query("INSERT INTO role set ?",{
                    title: answer.roleTitle,
                    salary: answer.roleSalary,
                    department_id: answer.roleDepartment,
        },(error)=>{
            if (error) throw error;
            console.table(answer);
            employee_tracker();
        })
    }) 
}


function addEmployees() {
    inquirer.prompt([{
    type: "input",
    name: "employeeFirst", "employeeLast", "employeeRoleId", "employeeManagerId",
    message: "What is the first name, last name, and role?",
    }])
    .then((answer)=>{
        db.query("INSERT INTO employee set ?",{
                   employee: answer.employeeFirst,
                   employee: answer.employeeLast,
                   employee: answer.employeeRoleId,
                   employee: answer.employeeManagerId,
        },(error)=>{
            if (error) throw error;
            console.table(answer);
            employee_tracker();
        })
    }) 
}

employee_tracker();