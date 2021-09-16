INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Human Resources"),
       ("Management"),              
       ("Marketing"),
       ("Operations"),
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Account Coordinator", 25000, 7),
       ("Account Executive", 45000, 7),
       ("Accountant", 60000, 2),
       ("Benefits Coordinator", 35000, 3),       
       ("COO", 100000, 4),
       ("Financial Analyst", 40000, 2),
       ("Lead Engineer", 80000, 1),
       ("Marketing Coordinator", 25000, 5),
       ("Marketing Specialist", 40000, 5),
       ("Operations Analyst", 35000, 6),
       ("Operations Manager", 60000, 6),
       ("Recruiter", 55000, 3),
       ("Software Engineer", 60000, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Louise", "Blackburn", 13, 7),
       ("Tamika", "Logan", 12, 3),
       ("Jacob", "Jensen", 11, 9),  
       ("Toni", "McGill", 10, 3),
       ("Garry", "Ho", 9, 3),  
       ("Keelan", "Bouvet", 8, 5),  
       ("Gabriela", "Nielson", 7, 9),  
       ("Gregory", "Stamp", 6, 9),  
       ("Fiza", "Bowden", 5, NULL),  
       ("Conall", "Nichols", 4, 3),  
       ("Nigel", "Kaye", 3, 9),  
       ("Elsa", "Gentry", 2, 3),  
       ("Anish", "Hughes", 1, 12),  
       ("Nico", "Burt", 2, 3),  
       ("Leia", "Cook", 13, 7);

       