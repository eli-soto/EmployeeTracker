
INSERT INTO department (name)
VALUES
       ("Engineering"),
       ("Sales"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
('Software Engineer' , 100000, 1),
('Salesperson' , 80000 , 2 ),
('Accountant' , 75000 , 3),
('Lawyer' , 150000 , 4);



INSERT INTO employee 
(first_name, last_name, role_id, manager_id)
VALUES 
('Eliceo', 'Soto', 1, NULL),
('John', 'Doe', 2, 1),
('Rob', 'Smith', 3, 1),
('Mike', 'Chan', 4, 1);
       
