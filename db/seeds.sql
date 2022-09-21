

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Sales Lead', 100000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, 'Sales Person', 50000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Sharon','Smith', 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
values('John','Wayne', 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
values('Fitz','Patrick', 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
values('Bruce','Lee', 2, 1);

INSERT INTO department (id, name)
values (1, 'Engineering');