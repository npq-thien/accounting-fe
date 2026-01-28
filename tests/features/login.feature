Feature: User Login
  As a user
  I want to log in to the system
  So that I can access the application

  Background:
    Given the system is ready

  Scenario: Successful login with admin credentials
    When I login with username "admin" and password "admin"
    Then the login should be successful
    And the current user should be "admin"
    And the current user role should be "admin"

  Scenario: Successful login with user credentials
    When I login with username "user" and password "user"
    Then the login should be successful
    And the current user should be "user"
    And the current user role should be "user"

  Scenario: Failed login with incorrect credentials
    When I login with username "wrong" and password "wrong"
    Then the login should fail

  Scenario: Check current logged in user
    Given I am logged in as "admin" with password "admin"
    When I check the current user
    Then the current user should be "admin"
    And the current user role should be "admin"

  Scenario: Logout functionality
    Given I am logged in as "admin" with password "admin"
    When I logout
    Then there should be no logged in user

