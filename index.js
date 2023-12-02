const inquirer = require("inquirer");
const db = require("./db/connection");
//console.log(db)
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  employee_tracker();
});

function employee_tracker() {
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
          updateEmployee();
          break;
        default:
          process.exit();
      }
    });
}

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
  inquirer
    .prompt([
      {
        type: "input",
        name: "departName",
        message: "What is the name of this department",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO department set ?",
        {
          name: answer.departName,
        },
        (error) => {
          if (error) throw error;
          console.table(answer);
          employee_tracker();
        }
      );
    });
}

function addARole() {
  db.query("SELECT * FROM department", (err, departmentList) => {
    console.log(err);
    if (err) throw err;
    const departmentChoices = departmentList.map((dept) => ({
      name: dept.name,
      value: dept.id,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of this role",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of this role",
        },
        {
          type: "list",
          name: "department_id",
          message: "What is the department of this role",
          choices: departmentChoices,
        },
      ])
      .then(({ title, salary, department_id }) => {
        console.log(department_id);
        db.query(
          "INSERT INTO role set ?",
          { title, salary, department_id },
          (error) => {
            if (error) throw error;
            viewAllRoles();
            employee_tracker();
          }
        );
      });
  });
}

function addEmployees() {
  db.query("SELECT * FROM employee", (err, employeelist) => {
    console.log(err);
    // const departmentChoices = departmentList.map(dept => ({ name: dept.name, value: dept.id }));
    const employeeChoices = employeelist.map((employee) => ({
      name: employee.name,
      value: employee.id,
    }));
    db.query("SELECT * FROM role", (err, rolelist) => {
      console.log(err);
      const roleChoices = rolelist.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the first name",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the last name",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the role id",
            choices: roleChoices,
          },
          {
            type: "list",
            name: "manager_id",
            message: "What is the manager id",
            choices: employeeChoices,
          },
        ])
        .then(({ first_name, last_name, role_id, manager_id }) => {
          db.query(
            "INSERT INTO employee set ?",
            { first_name, last_name, role_id, manager_id },
            (error) => {
              if (error) throw error;
              viewAllEmployees();
              employee_tracker();
            }
          );
        });
    });
  });
}

function updateEmployee() {
  db.query("SELECT * FROM employee", (err, employeelist) => {
    console.log(err);
    // const departmentChoices = departmentList.map(dept => ({ name: dept.name, value: dept.id }));
    const employeeChoices = employeelist.map((employee) => ({
      name: employee.name,
      value: employee.id,
    }));
    db.query("SELECT * FROM role", (err, rolelist) => {
      console.log(err);
      const roleChoices = rolelist.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "TargetID",
            message: "Which employee would you like to update",
            choices: employeeChoices,
          },
          
      
          {
            type: "list",
            name: "role_id",
            message: "What is the role id",
            choices: roleChoices,
          },
          
        ])

       
        .then(({ role_id, TargetID }) => {
          /*
                    db.query(
            "INSERT INTO employee set ?",
            { first_name, last_name, role_id, manager_id },
            (error) => {
              if (error) throw error;
              viewAllEmployees();
              employee_tracker();
            }
          );
          */
          db.query(
            "UPDATE employee SET role_id = ?git  WHERE id = ?",
            [ role_id,  TargetID],  
            (error) => {
              if (error) throw error;
              viewAllEmployees();
              employee_tracker();
      
            }
          );
        });
    });
  });
}


/*
function updateAnEmployessRole() {
  db.query("SELECT * FROM employee", (err, employeelist) => {
    console.log(err)

    const updateAnEmployessRole = employeelist.map(employee => ({ name: employee.name,  value: employee.id })) 
    db.query("SELECT * FROM role" ())

    inquirer.prompt([ {
        type: "input",
        name: "targetemployeeid",
        message: "Which employee would you like to update",
      },
      {
          type: "input",
          name: "first_name",
          message: "What is the first name"
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name"
      },
      {
          type: "list",
          name: "role_id",
          message: "What is the role id",
          choices: roleChoices,
      },
      {
          type: "list",
          name: "manager_id",
          message: "What is the manager id",
          choices: employeeChoices,
      },
    ])

  })
}*/

//employee_tracker();
