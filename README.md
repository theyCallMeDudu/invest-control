# Invest Control
InvestControl is an investment management system that allows users to register, view, and manage their investments and financial operations, such as asset purchases and sales. The system ensures that investment data is separated by users, allowing each user to access only their own investments and operations.

## Features
* Investment registration and categorization (Investment Types).
* Record financial operations linked to investments (buy/sell).
* Support for multiple currencies in operations.
* Search and filter investments by name.
* Access control: Data is displayed exclusively for each user.
* Validation system with custom error messages.
* Prevention of deleting investments associated with operations.

## Technologies Used

### Frontend
* Angular 14: JavaScript framework for building the user interface.
* Bootstrap: CSS framework for layout and visual components.
* ngx-toastr: Library for notifications to display success and error messages.
* ngx-mask: Library for formatting input fields like currency and numbers.
* ngModel: For form control and validation.

### Backend
* Laravel 8: PHP framework for backend development, API creation, and database management.
* MySQL: Database management system for storing application data.
* JWT Auth: Authentication system for user control.

## Requirements

### Backend
* PHP 7.3+ or 8.0+
* Composer
* MySQL
* Laravel 8

### Frontend
* Node.js (version 14+)
* NPM or Yarn
* Angular CLI

## Installation
Please refer to the `SETUP.md` file at the project root folder for detailed instructions on how to install the project, either through automation or manually.

## Usage
* Investments: Navigate to the "Investments" section to create, edit, or delete investments.
* Operations: Navigate to the "Operations" section to register purchase or sale of assets linked to an investment.
* Search: Use the search functionality to find investments by name.

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue for any improvements or suggestions.

## License
This project is licensed under the MIT License.