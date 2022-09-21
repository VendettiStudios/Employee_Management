const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
let connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: "root",
    password: "password",
    database: "Employee_Management"
});
connection.connect((err) => {
    if (err) throw err;
});

main();
//   renders main prompt upon start
function main() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "wantTodo",
                message: "What do you want to do?",
                choices: [
                    "View All Employees",
                    "Add Employee",
                    "Update Employee Role",
                    "View All Roles",
                    "Add Role",
                    "View All Departments",
                    "Add Department",
                    "Quit",
                ],
            },
        ])
        //starts functions when main prompt is answered
        .then((answers) => {
            const { wantTodo } = answers;
            switch (wantTodo) {
                case "View All Employees":
                    console.log("View All Employees");
                    viewAllEmployees();
                    break;
                case "Add Employee":
                    console.log("Add Employee");
                    addEmployee();
                    break;
                case "Update Employee Role":
                    console.log("Update Employee Role");
                    updateRole();
                    break;
                case "View All Roles":
                    console.log("View Roles");
                    viewAllRoles();
                    break;
                case "Add Role":
                    console.log("Add Role");
                    addRole();
                    break;
                case "View All Departments":
                    console.log("View All Departments");
                    viewAllDepartments();
                    break;
                case "Add Department":
                    console.log("Add Department");
                    addDepartment();
                    break;
                default:
                    console.log(wantTodo);
                case "Quit":
                    console.log("Bye");
                    quit();
            }
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
                console.log(error);
            } else {
                // Something else went wrong
                console.log(error);
            }
        });

    // function for viewing all departments
    function viewAllDepartments() {
        connection.query(
            `
  Select * from department
  `,
            (err, results) => {
                console.table(results);
                main();
            }
        );
    }
    // function for viewing all roles
    function viewAllRoles() {
        connection.query(
            `
  Select * from role
  `,
            (err, results) => {
                console.table(results);
                main();
            }
        );
    }
    // function for viewing all Employees
    function viewAllEmployees() {
        console.log("Viewing Employees");
        connection.query(
            `select employee.Id,
  employee.first_name,
  employee.last_name,
  role.title,
  department.name,
  role.salary,
  Concat(mngr.first_name, " ", mngr.last_name) manager
  from employee
  left join role on role.id = employee.role_id
  left join department on role.department_id = department.id
  left join employee mngr on employee.manager_id = mngr.id;
  `,
            (err, results) => {
                console.table(results);
                main();
            }
        );
    }
    // Function for adding departments
        function addDepartment() {
            inquirer
                .prompt([
                    {
                        name: "AddDepartment",
                        type: "input",
                        message: "What is your Department Name?",
                    },
                ])

                .then((answer) => {
                    connection.query(
                        `
                  Insert into department (name)
                    Values('${answer.AddDepartment}')
                  `,
                        (err, results) => {
                            viewAllDepartments();
                        }
                    );
                    console.log(answer.AddDepartment);
                });
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    throw error;
                }
            };
        }
        // Function for adding roles
        function addRole() {
            inquirer
                .prompt([
                    {
                        name: "title",
                        type: "input",
                        message: "Enter a role name",
                    },
                    {
                        name: "salary",
                        type: "input",
                        message: "Enter a salary",
                    },
                    {
                        name: "department_id",
                        type: "input",
                        message: "Enter a Department Id",
                    },
                ])
                .then((answer) => {
                    connection.query(
                        `
       Insert into role set ? 
        `,
                        answer
                    );
                    console.log(answer);
                })
                .then(() => {
                    main();
                })
                .catch((err) => {
                    console.log(err);
                    throw err;
                });
        }
        function quit() {
            connection.end();
            connection.destroy();
            process.exit();
        }
        //function for adding employees
        function addEmployee() {
            inquirer
                .prompt([
                    {
                        name: "first_name",
                        type: "input",
                        message: "Enter Employee First Name"

                    },
                    {
                        name: "last_name",
                        type: "input",
                        message: "Enter Employee Last Name"

                    },
                    {
                        name: "role_id",
                        type: "input",
                        message: "Enter Employee role id"

                    },
                    {
                        name: "manager_id",
                        type: "input",
                        message: "Enter managers id"
                    },
                ])
                .then((answer) => {
                    connection.query(
                        `
    Insert into employee set ?
    `,
                        answer
                    );
                    console.log(answer);
                })
                .then(() => {

                    main();
                })
                .catch((err) => {
                    console.log(err);
                    throw err;
                });
        };


        //function for updating roles
        function updateRole() {
            connection.query(`
        SELECT title as name,
        id as value
        from role

      `, (err, roleData) => {
                connection.query(`
        SELECT concat(first_name, " ", last_name)
        as name, id as value from employee
        `
                    , (err, employeeData) => {
                        inquirer
                            .prompt([{
                                name: "employee_id",
                                type: "list",
                                message: "Choose one of the following employees to update their role",
                                choices: employeeData
                            }, {
                                name: "role_id",
                                type: "list",
                                message: "Choose one of the following roles to be their role",
                                choices: roleData
                            }])
                            .then(response => {
                                connection.query(`
            Update employee set role_id = ?
            where id = ?
            `, [response.role_id, response.employee_id], (err, results) => {
                                    viewAllEmployees();
                                })
                            })
                    }
                )
            })

        }
    };

