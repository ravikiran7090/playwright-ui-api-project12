Feature: Ecommerce validations
    @regression
    Scenario: Placing the order
        Given a login to Ecommerce application with "ravikirannagure@gmail.com" and "Ravi@7090"
        When Add "ZARA COAT 3" to the cart
        Then Verify "ZARA COAT 3" is displayed in the cart
        When Enter valid details and place the order
        Then Verify the order is present in the order history

    @validation
    Scenario Outline:  Placing the order
        Given  a login to Ecommerce2 application with "<Username>" and "<password>"
        Then Varify Error message is dispalyed.

        Examples:
            | Username            | password  |
            | ravikiran@gmail.com | Ravi@7090 |
            | hello@123.com       | Hello@123 |

