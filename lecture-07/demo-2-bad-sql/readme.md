# Bad SQL Demo

The initial version allows a sql injection attack using the following:

Kyle" UNION SELECT message AS first_name, "" AS last_name FROM secret_table --