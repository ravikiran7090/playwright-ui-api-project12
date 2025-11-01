Feature: Ecommerce validations
    @validation
    Scenario Outline:  Placing the order
        Given  a login to Ecommerce2 application with "<Username>" and "<password>"
        Then Varify Error message is dispalyed.

        Examples:
            | Username             | password   |
            | ravikiran@gmail.com  | Ravi@7090  | 
            |hello@123.com         | Hello@123  |   

