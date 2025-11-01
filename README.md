
commands to excecute test cases
npx playwright test tests/clientAppPo.spec.js --config playwright.config1.js --project=safari

npx playwright test --grep "@UI"

npx playwright test --reporter=line,allure-playwright

npx allure generate ./allure-results --clean

npx allure open ./allure-report

 npx cucumber-js  features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html

 npx cucumber-js  --tags "@regression" --retry 1 --exit --format html:cucumber-report.html 

 > Sometimes a table contains a column that has duplicate values, and you may find yourself in a situation where you only want to list the unique/distinct values.
>the DISTINCT keyword can be used to return only the distinct values in a column.
> the DISTINCT keyword operates on a column. The syntax looks like this:
   SELECT DISTINCT column FORM table
   SELECT DISTINCT (column) FORM table




>The COUNT function returns the number of input rows that match a specific condition of a query.
> we can apply COUNT on a specific column or just pass COUNT(*), we will soon see this should return the same result
>COUNT is a function which will not work without parenthesis
    select COUNT(name) FORM table;
    select COUNT(choice) FORM table;
    select COUNT(*) FORM table;
    All return the same thing, since the original table has 4 rows.
> Because of this COUNT by itself simply returns back a count of the number of rows in a table.
> COUNT is much more useful when combined with other commands, such as DISTINCT
   SELECT COUNT(DISTINCT(name)) FROM table;
   SELECT COUNT (DISTINCT (amount)) FROM payment;

>SELECT and WHERE are the most fundamental SQL statements and you will find yourself using them often!
> The WHERE statement allows us to specify conditions on columns for the rows to be returned.
> Basic syntax example:
   SELECT coulmn1, coulmn2
   FROM table
   WHERE conditions;
> the WHERE clause appears immediately after FROM  clause of the SELECT statement.
> The conditions are used to filter the rows returned from the SELECT statement.
> PostgreSQL provides a variety of standard operators to construct the conditions 

>comparison operators
 compare a column value to something.
> is the price greater than $3.00?
> is the pet's name equal to "Sam"?

Logical operators
Allow us to combine multiple comparison operators
AND
OR
NOT

> you may have noticed PostgreSQL sometimes returns the same request query results in a different order.
> You can use ORDER BY to sort rows based on a column value, in either ascending or descending order.
> Basic syntax for ORDER BY'
   SELECT column_1, column_2
   From table
   ORDER BY column_1 ASC/DESC;
>Notice ORDER BY towards the end of a query, since we want to do any selection and filtering first, before finally sorting.
  SELECT column_1,column_2
  FROM table
  ORDER BY column_1 ASC/DESC;
>Use ASC to sort in ascending order
> Use DESC to sort in descending order
> if you leave it blank, ORDER BY uses ASC by default.
>You can also ORDER BY multiple columns
> This makes sense when one column has duplicate entries.
 SELECT company, name, sales FROM table ORDER BY company, sales

>The LIMIT command allows us to limit the number of rows returned for a query.
>Useful for not wanting to return every single row in a table, but only view the top few rows to get an idea of the table layout.
>LIMIT also becomes useful in combination with ORDER By
>LIMIT goes at the very end of a query request and is the last command to be executed.
>Let's learn the basic syntax of LIMIT through some examples.

>The BETWEEN operator is the same as:
  >value>=low AND value<=high
  >value BETWEEN low AND high
>You can also combine BETWEEN with the NOT logical operator:
 > value NOT BETWEEN low AND high
>The BETWEEN operator can also be used with dates. Note that you need to format dates in the ISO 8601 standard format, which is YYYY-MM-DD
 > date BETWEEN '2007-01-01' AND '2007-02-01'
>When using BETWEEN operator with dates that also include timestamp information, pay careful attention to using BETWEEN versus <=,>= comparison operators, due to that a datetime starts at 0:00.
>Later on we will study more specific methods for datetime information types.

>In certain cases you want to check for multiple possible value options, for example, if a user's name shows up IN a list of known names.
>We can use the IN operator to create a condition that checks to see if a value in included in a list of multiple options.
> The general syntax is:
  > value IN(option1,option2,... option_n)
>Example query:
 >SELECT color FROM table
  WHERE color IN('red','blue')

>SELECT color FROM table
  WHERE color NOTIN('red','blue')

> we have already been able to perform direct comparisons against strings, such as:
 >WHERE first_name='john'
>BUT what if we want to match against a general pattern in a string?
  > All emails ending in '@gmail.com'
  > All names that begin with an 'A'
> the LIKE operator allows us to perform pattern matching against string data with the use of wildcard characters:
 >percent %
  > matches any sequence of characters
 >Underscore _
  >matches any single character
> ALL names that begin with an 'A'
 > where name LIKE 'A%'
>All names that end with an 'a'
 > WHERE name LIKE '%a'
Notice that LIKE is case-sensitive, we can use ILIKE which is case-insensitive
>Using the Underscore allows us to replace just a single character
 >Get all mission impossible films
 >WHERE title LIKE 'Mission Impossible _'
>You can use multiple underscores
>Imagine we had version string codes in the format 'Version#A4','Version#B7', etc..
 >WHERE value LIKE 'Version#__'
>we can also combine pattern matching operators to create more complex patterns
 >WHERE name LIKE '_her%'
  >Cheryl
  >Theresa
  >Sherri

>GROUP BY and AGGREGATE FUNCTIONS
> GOUP BY will allow us to aggregate data and apply functions to better understand how data is distributed per category.
 >Section Overview
  >Aggregate Functions
  >GROUP BY - Part One -Theory
  >GOUP BY -Part Two -Implementation
  >Challenge Tasks for GOUP BY
  >HAVING -Filtering with a GROUP BY
  >Challenge tasks for HAVING


Aggregate Functions
>SQL provides a variety of aggregate functions.
>The main idea behind an aggregate function is to take multiple inputs and return a single output.
>Most common Aggregate Functions:
 >AVG()- returns average value
 >COUNT() -returns number of values
 >MAX() - returns maximum value
 >MIN() -returns minimum value
 >sum() - returns the sum of all values
>Aggregate functions calls happen only in the SELECT clause or the HAVING clause.
>Special Notes
 > AVG() returns a floating point value many decimal places (e.g. 2,342418..)
 >You can use ROUND() to specify precision after the decimal.
 >COUNT() simply returns the number of rows, which means by convention we just use COUNT(*).

>GOUP BY allows us to aggregate columns per category.
>let's explore this idea with simple example.
>Syntax of Group by
 >SELECT category_col ,AGG(data_col)
 >FROM table
 >GROUP BY category_col

>The GROUP BY clause must appear right after a FROM or WHERE statement.
>SELECT category_col, AGG(data_col)
 FROM table
 WHERE category_col !='A'
 GROUP BY category_col

> In the SELECT statement, columns must either have an aggregate function or be in the GROUP BY call.
EXAMPLE:
>SLECT company, division, SUM(sales)
 FROM finance_table
 GROUP BY company, division
>IN the SELECT statement, columns must either have an aggregate function or be in the GROUP BY call.

> SELECT company, division, SUM(sales)
  FROM finance_table
  WHERE division IN ('marketing', 'transport')
  GROUP BY company, division
>WHERE statements should not refer to the aggregate result, later on we will learn to use HAVING to filter on those results.

>SELECT company,SUM(sales)
 FROM finance_table
 GROUP BY company
 ORDER BY SUM(sales)
 LIMIT 5
>if you want to sort results based on the aggregate, make sure to reference the entire function


>  The HAVING clause allows us to filter after an aggregation has already taken place.
>Let's take a look back at one of our previous examples
>SELECT company,SUM(sales)
 FROM finance_table
 GROUP BY company
>SELECT company,SUM(sales)
 FROM finance_table
 WHERE company !='Google'
 GROUP BY company

> we have already  seen we can filter before executing the GROUP BY, but what if we want to filter based on SUM(sales)? 

>SELECT company,SUM(sales)
 FROM finance_table
 WHERE company !='Google'
 GROUP BY company
 HAVING SUM(sales)>1000

>HAVING allows us to use the aggregate result as a filter along with a GROUP BY
JOINS
>JOINS will allow us to combine information from multiple tables!
>Section Overview
>creating an alias with the AS clause
>Understanding different kinds of JOINS
 >INNER JOINS
 >OUTER JOINS
 >FULL JOINS
 >UNIONS
>Before we learn about JOINS, lets quickly cover the AS clause which allows us to create an "alias" for a column or result
>lets see the example syntax 
>SELECT SUM(column) AS new_name
 FROM table;
>The AS operator gets executed at the very end of a query, meaning that we can not use the ALIAS inside a WHERE operator

>INNER JOINS
>What is a JOIN operation?
>JOINS allow us to combine multiple tables together.
>The  main reason for the different JOIN types is to decide how to deal with information only present in one of the joined tables.
>lets imagine a simple example
>our company is holding a conference for people in the movie rental industry.
>We'll have people register online beforehand and then login the day of the conference
>AN INNER JOIN will result with the set of records match in both tables.
>SELECT * FROM TableA
 INNER JOIN TableB
 ON Table.col_match =TableB.col_match
 >SELECT * FROM Registratios
  INNER JOIN Logins
  ON REgistration.name=Logins.name;
 >SELECT reg_id,Logins.name,log_id
  FROM Registrations
  INNER JOIN logins
  ON Registrations.name=Logins.name
>Remember that table order won't matter in an INNER JOIN
>Also if you see just JOIN without the INNER, PostgreSQL will treat it as an INNERJOIN.

>OUTER JOINS
 >There are few different types of OUTER JOINs
 >They will allow us to specify how to deal with values only present in one of the tables being joined
 >These are the more complex JOINS, take your time when trying to understand them!

>In these lecture we will explain:
 >FULL OUTER JOIN
  >clarifying WHERE null
 >LEFT OUTER JOIN
  >clarifying WHERE null
 >RIGHT OUTER JOIN
  >clarifying WHERE null

 >SELECT * FROM TableB
 FULL OUTER JOIN TableA
 ON TableA.col_match=TableB.col_match 

>SELECT * FROM Registrations
 FULL OUTER JOIN Logins
 ON Registrations.name =Logins.name

>FULL OUTER JOIN WITH WHERE (Get rows unique to either table) (rows not found in both tables)
>SELECT * FROM TableA
 FULL OUTER JOIN TableB
 ON TableA.col_match=TableB.col_match
 where TableA.id is null OR TableB.id is null

>SELECT * FROM Registrations
 FULL OUTER JOIN Logins
 ON Registrations.name =Logins.name
 WHERE Registrations.reg_id is null OR Logins.log_id is null

>LEFT OUTER JOIN results in the set of records that are in the left table, if there is no match with the right table, the results are null.
>later on we will learn how to add WHERE statements to further modify a LEFT OUTER JOIN
>SELECT * FROM TableA
 LEFT OUTER JOIN TableB
 ON TableA.col_match = TableB.col_match
ORDER MATTERS FOR LEFT OUTER JOIN!

>SELECT * FROM Registratios
 LEFT OUTER JOIN Logins
 ON Registrations.name=Logins.name

LEFT OUTER JOIN With WHERE (GET ROWS unique to left table)
>What if we only wanted entries unique to Table A? those rows found in table A and not found in table B.
>>SELECT * FROM TableA
 LEFT OUTER JOIN TableB
 ON TableA.col_match = TableB.col_match
 WHERE TableB.id IS null

>SELECT * FROM Registratios
 LEFT OUTER JOIN Logins
 ON Registrations.name=Logins.name
 WHERE Logins.log_id IS null 
>A RIGHT JOIN is essentially the same as a LEFT JOIN,expect the tables are switched.
>This would be the same as switching the table order in a LEFT OUTER JOIN.
>Lets quickly see some examples of a RIGHT JOIN.

>SELECT * FROM TableA
 RIGHT JOIN TableB
 ON TableA.col_match =TableB.col_match
 WHERE TableA.id is null
 
>It is up to you how you have the tables organized "in your mind" when it comes to choosing a LEFT Vs RIGHT join, since depending on the table order you specify in the JOIN, you cam perform duplicate JOINs with either method.
>>SELECT * FROM Registratios
 RIGHT OUTER JOIN Logins
 ON Registrations.name=Logins.name
 WHERE Logins.log_id IS null

>UNION 
>The UNION operator is used to combine the result -set of two or more SELECT statements.
>It basically serves to directly concatenate two results together, essentially "pasting" them together.
>SELECT column_name(s) FROM table1
 UNION
 SELECT column_name(s) FROM table2
>SELECT * FROM SAles2021_Q1
 UNION 
 SELECT * FROM SALES2021_Q2
 ORDER BY name;

>Advance Sql commands
>Section Overview
>Timestamps and EXTRACT
>Math Functions
>String functions
>Sub-query
>Self-Join

>Displaying current time information
>In part one, we will go over a few commands that report back time and date information.
>These will be more useful when creating our own tables and databases, rather than when querying a database.
>we have already seen that PostgreSQL can hold date and time information:
 >TIME - Contains only time
 >DATE -Contains only date
 >TIMESTAMP - contains date and time
 >TIMESTAMPTZ -Contains date, time and time zone

>Careful considerations should be made when designing a table and database and choosing a time data type.
>Depending on the situation you may or may not need the full level of TIMESTAMPTZ.
> Remember, you can always remove historical information, but you can't add it!
>Let's explore functions and operations related to these specific data types:
 >TIMEZONE
 >NOW
 >TIMEOFDAY
 >CURRENT_TIME
 >CURRENT_DATE

EXTRACTING TIME AND DATE INFORMATION
>Let's explore extracting information from a time based data type using:
>EXTRACT()
>AGE()
>TO_CHAR()

>EXTRACT()
> Allows you to "extract" or obtain a sub-component of a date value' 
 >YEAR
 >MONTH
 >DAY
 >WEEK
 >QUARTER

>EXTRACT()
>Allows you to "extract" or obtain a sub-component of a date values
 >EXTRACT(YEAR FROM date_col)
>SELECT EXTRACT(YEAR FROM payment_date)
FROM payment

>AGE()
>Calculates and returns the current age given a timestamp
>Useage:
  >AGE(date_col)
>Useage:
 >AGE(date_col)
>Returns
 >13 years 1 mon 5 days 01:34:13.003423

>TO_CHAR()
 >General function to convert data types to text
 >Useful for timestamp formatting 
 >Usage
  >TO_CHAR(date_col, 'mm-dd-yyyy')
 
>Mathematical operators
>STRING FUNCTIONS and operations
>PostgreSQL also provides a variety of string functions and operators that allow us to edit, combine, and alter text data columns.
>Let's explore the documentation to see what is available for us!
SELECT upper(first_name)||' '||upper(last_name) AS full_name FROM customer
select lower(left(first_name,1)) || LOWER(last_name)||'@gmail.com' as customer_email FROM customer

>SUBQUERY
>In this lecture we will discuss how to perform a subquery as well as the EXISTS function.
>A sub query allows you to construct complex queries, essentially performing a query on the results of another query.
>The syntax is straightforward and involves two SELECT statements.
>Lets imagine a table consisting of student names and their test scores
> Standard Query
 >SELECT student, grade
  FROM test_scores
>Standard Query to return average grade
 >SELECT AVG(grade)
  FROM test_scores
>How can we get a list of students who scored better than the average grade?
 >SELECT AVG(grade)
  FROM test_scores
>It looks like we need two steps, first get the average grade, then compare the rest of the table aginst it
 >SELECT AVG(grade)
  FROM test_scores
>This is where a subquery can help us get the result in a "single" query request
 >SELECT student,grade
  FROM test_scores
  WHERE grade>(SELECT AVG(grade)
  FROM test_scores)
>The subquery is performed first since it is inside the parenthesis
>we can also use the IN operator in conjunction with a subquery to check against multiple results returned.
>A subquery can operate on a separate table:
 >SELECT student,grade FROM test_scores
  WHERE student IN (SELECT student FROM honor_roll_table)
>SELECT student,grade FROM test_scores
  WHERE student IN (('Zachi','Chris','Karissa'))
>EXSIST Operator
 >The EXISTS operator is used to test for existence of rows in a subquery.
 >Typically a subquery is passed in the EXISTS() function to check if any rows are returned with the subquery.
 >SELECT column_name
  FROM table_name
  WHERE EXISTS
  (SELECT column_name FROM table_name WHERE condition);

>SELF-JOIN
>A self-join i a query in which a table is joined to itself.
>Self-joins are useful for comparing values in a column of rows within the same table.
>The self join can be viewed as a join of two copies of the same table.
>The table is not actually copied, but SQL performs the command as though it were.
>There is no special keyword for a self join, its simply standard JOIN syntax with the same table in both parts.
>However, when using a self join it is necessary to use an alias for the table, otherwise the table names would be ambiguous.
>Let's see a syntax example of this.
>Syntax 
 >SELECT tableA.col,tableB.col
  FROM table AS tableA
  JOIN table AS tableB ON
  tableA.some_col=tableB.other_col
>  SELECT emp.name,report.name as rep
   FROM employees AS emp
   JOIN employees AS report ON
   emp.emp_id=report.report_id

>Creating Databases and tables
 >Section Overview 
  >Data Types
  >Primary and Foreign keys
  >Constraints
  >CREATE
  >INSERT
  >UPADATE
  >DELETE, ALTER,DROP

>DATATYPES
>We have already encountered a variety of data types, let's quickly review the main data types in SQL
>Boolean
 >True or False
>Character
 >char, varchar, and text
>Numeric
 >integer and floating-point number
>Temporal
 >date, time, timestamp, and interval

>UUID
 >universally Unique Identifiers
>Array
 >Stores an array of strings, numbers, etc.
>JSON
>Hstore key-value pair
>Special types such as network address and geometric data

>When creating databases and tables, you should carefully consider which data types should be used for the data to be stored.
>Review the documentation to see limitations of data types:
>PostgreSQL.org/docs/current/datatype.html
>For example 
>Imagine we want to store a phone number, should it be stored as numeric ?
>If so, which type of numeric?
>we could take a look at the documentation for options..
>Based on the limitations, you may think it makes sense to store it as a BIGINT data type but we should really be thinking what is best for the situation.
>Why bother with numerics at all?
>we don't perform arithmetic with numbers, so it probably makes more sense as a VARCHAR data type instead
>In fact, searching for best practice online, you will discover its usually recommended to store as a text based data type due to a variety of issues 
>No arithmetic performed
>Leading zeros could cause issues, 7 and 07 treated same numerically, but are not the same phone number
>when creating a database and table, take your time to plan for long term storage
>Remember you can always remove historical information you have decided you aren't using, but you can't go back in time to add in information!


>Primary and Foreign Keys
> A primary key is a column or a group of column used to identify a row uniquely in a table.
>For example, in our dvdrental database we saw customers had a unique, non-null customer-id column as their primary key.
>Primary keys are also important since they allow us to easily discern what columns should be used for joining tables together
>Later we will learn about SERIAL data type

>Foreign Key
>A foreign key is a field or group of fields in a table that identifies a row in another table.
> A foreign key is defined in a table that reference to the primary key of the other table.
>The table  that contains the foreign key is called referencing table or child table.
>The table to which the foreign key refences is called referenced table or parent table.
>A table can have multiple foreign keys depending on its relationships with other tables.
>Recall in the dvdrental database payment table, each payment row had its unique payment_id (a primary key) and identified the customer that made the payment trough the customer_id (a foreign key since it references the customer table's primary key)
>you may begin to realize primary key and foreign key typically make good column choices for joining together two or more tables.
> when creating tables and defining columns, we can use constraints to define columns as being a primary key, or attaching a forign key relationship to another table

>Constraints
>Constraints are the rules enforced on data columns on table.
>These are used to prevent invalid data from being entered into the database.
>This ensures the accuracy and reliability of the data in the database.
>Constraints can be divided into two categories:
 >column constraints
  > constrains the data in a column to adhere to certain conditions.
 >Table constraints
  > applied to the entire table rather than to an individual column.

>The most common constraints used:
 >NOT NULL constraint
  > Ensures that a column cannot have null value.
 >Unique constraint 
  >Ensures that all values in a column are different.
>The most common constraints used 
 >PRIMARY KEY
 >Uniquely identifies each row/record in a database table.
 >Foreign key
 >constrains data based on columns in other tables.
>CHECK constraint
 >Ensure that all values in a column satisfy certain conditions.
 >EXCLUSION Constraint
 > Ensures that if any two rows are compared on the specified column or expression using the specified operator, not all these comparisons will return TRUE
>EXCLUSION constraint
 > Ensures that if any two rows are compared on the specified column or expression using the specified operator, not all of these comparisons will return TRUE


>Table Constraints
 >CHECK (condition)
  >to check a condition when inserting or updating data 
 >REFERENCES
 > to constrain the value stored in the column that must exist in a column in another table.
 >UNIQUE(column-list)
 > forces the values stored in the columns listed inside the parentheses to be unique
 >PRIMARY KEY(column_list)
 > Allows you to define the primary key that consists of multiple columns.


>CREATE 
>Let's now learn the syntax to create a table in SQL using the CREATE keyword and column syntax.
>full General Syntax
 >CREATE TABLE table_name( column_name TYPE column_constraint,
  column_name TYPE column_constraint,
  table_constraint table_constraint 
 ) INHERITS existing_table_name;

>Common simple Syntax
 >CREATE TABLE table_name (
  column_name TYPE column_constraint,
  column_name TYPE column_constraint
);

>Example syntax
 >>CREATE TABLE players (
  player_id SERIAL PRIMARY KEY,
  age SMALLINT NOT NULL
);

>SERIAL
 >In PostgreSQL, a sequence is a special kind of database object that generates a sequence of integers.
 >A sequence is often used as the primary key column in a table.
 >It will create a sequence object and set the next value generated by the sequence as the default value for the column.
>This is perfect for a primary key, because it logs unique integer entries for you automatically upon insertion.
> If a row is later removed, the column with the SERIAL data type will not adjust, marking the fact that a row was removed from the sequence, for example
>1,2,3,5,6,7
 >You know row 4 was removed at some point

>INSERT
>INSERT allows you to add in rows to a table.
>General syntax
 >INSERT INTO table(column1,column2,....)
  VALUES
  (value1,value2,....),
  (value1,value2,....)...; 
>INSERT allows you to add in rows to a table.
>syntax for inserting values from another table:
 > INSERT INTO table(column1,column2,...)
   SELECT column1,column2...
   FROM another_table
   WHERE condition;
>Keep in mind, the inserted row values must match for the table, including constraints.
>SERIAL columns do not need to be provided a value. 

>UPDATE
>The UPDATE keyword allows for the changing of values of the columns in a table.
 >General syntax
  >UPDATE table
   SET column1=value1,
       column2=value2,...
   WHERE condition;
>Example
  >UPDATE account
   SET last_login = CURRENT_TIMESTAMP
   WHERE last_login is NULL;
>Reset everything without WHERE condition 
 UPDATE account
 SET last_login = CURRENT_TIMESTAMP 
>Set based on another column 
 >UPDATE last_login=created_on

>Using another table's values (UPDATE join)
 >UPDATE TableA
  SET original_col=TableB.new_col
  FROM tableB
  WHEER tableA.id=TableB.id
>Return affected rows 
 >UPDATE account
  SET last_login=created_on
  RETURNING account_id,last_login

>DELETE
>We can use the DELETE clause to remove rows from a table.
>for example:
 >DELETE FROM table
  WHERE row_id=1
>We can delete rows based on their presence in other tables
>For example:
 >DELETE FROM tableA
  USING tableB
  WHERE tableA.id=TableB.id
> We can delete all rows from a table
> for example:
 >DELETE FROM table
>Similar to Update command, you can also add in a RETURNING call to return rows that were removed.


>ALTER CLAUSE
>The ALTER clause allows for changes to an existing table structure, such as:
> Adding, dropping ,or renaming columns
>Changing a column's data type
>Set DEFAULT values for a column
>Add CHECK constraints
>Rename table

>General Syntax
 action

>Adding Columns
>ALTER TABLE table_name
 ADD COULMN New_colmn TYPE

>Removing Columns
>ALTER TABLE table_name
>DROP COLUMN column_name

>Alter constraints
>ALTER TABLE table_name
 ALTER COLUMN col_name
 SET DEFAULT value

>ALTER TABLE table_name
 ALTER COLUMN col_name
 DROP DEFAULT

>ALTER TABLE table_name
 ALTER COLUMN col_name
 SET NOT NULL

>ALTER TABLE table_name
 ALTER COLUMN col_name
 DROP NOT NULL 

>ALTER TABLE table_name
 ALTER COLUMN col_name
 ADD CONSTRAINT contraint_name

>DROP
>DROP allows for the complete removal of a column in a table.
>In PostgreSQL this will also automatically remove all of its indexes and constraints involving the column.
>However, it will not remove columns used in views, triggers, or stored procedures without the additional CASCADE clause

>General Syntax 
>ALTER TABLE table_name
 DROP COLUMN col_name

>Remove all dependencies
>ALTER TABLE table_name
 DROP COLUMN col_name CASCADE
>Check for existence to avoid error
 >ALTER TABLE table_name
  DROP COLUMN IF EXISTS col_name

>Drop multiple columns
> ALTER TABLE table_name
  DROP COLUMN col_one,
  DROP COLUMN col_two 

>ALTER TABLE new_info
ADD COLUMN people VARCHAR(100);

>CHECK 
> The CHECK constraint allows us to create more customized constraints that adhere to a certain condition.
> Such as making sure all inserted integer values fall below a certain threshold.

>General Syntax 
 >CREATE TABLE example(
  ex_id SERIAL PRIMARY KEY,
  age SMALLINT CHECK (age>21),
  parent_age SMALLINT CHECK(
  parent_age>age)
);

>Conditional Expressions and Operators
>Section Overview
>CASE
>COALESCE
>NULLIF
>CAST
>VIEWS
>Import AND EXPORT FUNCTIONALITY
>These keywords and functions will allow us to add logic to our commands and workflows in sql

>CASE
> we can use the CASE statement to only execute SQL code when certain conditions are met
>This is very similar to IF/ELSE statements in other programming languages.
>There are two main ways to use a CASE statement, either a general CASE or a CASE expression.
>Both methods can lead to the same results.
>Let's first show the syntax for a "general" CASE.
General syntax
 >CASE 
      WHEN condition1 THEN result1
      WHEN condition2 THEN result2
      ELSE some_other_result
  END
 

 

 





 
 




  




 
































