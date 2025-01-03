# Test Automation Project

This repository contains the test automation suite for the Saucedemo website, designed to ensure the robustness of the website through automated tests. The tests are implemented using Playwright with TypeScript.

## Prerequisites
Before you start, ensure you have the following installed:
*    Node.js (version 14.x or higher)
*    npm (Node Package Manager)

To install the dependencies, run the following command:
    `npm install`


## Running Tests
The test automation suite is organized into different test categories, and you can execute tests based on these categories. Use the following commands to run specific test sets:

1. **Login Page Tests**
To run the login page tests, execute the following command:
    `npm run test --tags=@login-page-tests`
<br>

2. **Homepage Tests**
To run the homepage tests, execute the following command:
    `npm run test --tags=@home-page-tests`
<br>

3. **End-to-End Tests**
To run the end-to-end tests, execute the following command:
    `npm run test --tags=@end-to-end-tests`
<br>

4. **All Tests**
To run all available tests, execute the following command:
    `npm run tests --tags=@demo-tests`
<br>

## Test Artifacts
The following files are included in this repository:

* [Automation Test Cases](https://github.com/MilanJovanovic92/saucedemo_UI_automation/blob/main/documentation/saucedemo%20Automation%20test%20cases.xlsx)
* [Manual Test Cases](https://github.com/MilanJovanovic92/saucedemo_UI_automation/blob/main/documentation/Saucedemo%20Manual%20test%20cases.xlsx)
* [Bug Report](https://github.com/MilanJovanovic92/saucedemo_UI_automation/blob/main/documentation/Saucedemo-%20Bug%20report.docx)