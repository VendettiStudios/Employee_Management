USE Employee_Management;
SELECT employee.Id,
employee.first_name,
employee.last_name,
role.title,
department.name,
role.salary,
Concat(mngr.first_name, " ", mngr.last_name) manager
FROM employee
LEFT JOIN role ON role.id = employee.role_id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee mngr ON employee.manager_id = mngr.id;


DESCRIBE department;
SELECT * FROM department;



