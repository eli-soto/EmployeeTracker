const inquirer = require("inquirer");
const db = require("./db/connection");

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  employee_tracker();
});

let employee_tracker = function () {
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
          "Add a deparment",
          "Add a role",
          "Add employees",
          "Update an employee role",
          "exit",
        ],
      },
    ])

    .then((answer) => {
      switch (answer.prompt) {
        case "view all employees":
          viewAllEmployees();
          break;
        case "exit":
          db.end();
          break;
        case "View all deparments":
          viewAllDeparments();
          break;
        case "View all Roles":
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
      }
    });
};

function viewAllEmployees() {
  db.query("select * from employees", (error, data) => {
    if (error) throw error;
    console.table(data);
    employee_tracker();
  });
}

function viewAllDeparments() {
  db.query("select * from deparments ", (error, data) => {
    if (error) throw error;
    console.table(data);
    employee_tracker();
  });
}

function viewAllRoles() {
  db.query("select * from employess ", (error, data) => {
    if (error) throw error;
    console.table(data);
    employee_tracker();
  });
}

function addADeparment() {
  db.query("select * from deparment ", (error, data) => {
    if (error) throw error;
    console.table(data);
    employee_tracker();
  });
}
function addARole() {
  db.query("select * from roles ", (error, data) => {
    if (error) throw error;
    console.table(data);
    employee_tracker();
  });
}

function addEmployees() {
  db.query("select * from employees ", (error, data) => {
    if (error) throw error;
    console.table(data);
    employee_tracker();
  });
}

function updateAnEmployessRole() {
  db.query("select * from role ", (error, data) => {
    if (error) throw error;
    console.table(data);
    employee_tracker();
  });
}

employee_tracker();
