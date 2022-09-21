Drop DATABASE IF EXISTS Employee_Management;
CREATE DATABASE Employee_Management;
USE Employee_Management;

CREATE TABLE employee (
id INT NOT NULL auto_increment PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,                   -- FOREIGN KEY REFERENCES ROLE(id) ON DELETE CASCADE,
    manager_id INT unsigned
);

CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT UNSIGNED NOT NULL -- foreign key references department(id) on delete cascade
);

CREATE TABLE department(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(30)
);