# Invest Control Database Documentation

## Database
. MySQL

## Tables
. investment
. investment_type
. operation_type
. investment_operation
. investment_summary
-------------------------

## Tables description

### 1. investment_type
This table stores the differente types of investments, such as REITs (Real Estate Investment Trust, "FII" in pt-br) and Stocks ("Ações" in pt-br).

. investment_type_id (int) (PK)
. investment_type_name (varchar)
plaintext
-------------------------

### 2. investment
This table stores the basic information about each specific investment.

investment_id (int) (PK)
investment_type_id (int) (FK -> investment_type.investment_type_id)
investment_name (varchar)
-------------------------

### 3. operation_type
This table stores the different types of operations, such as purchase and sale.

operation_type_id (int) (PK)
operation_type_name (varchar)

### 4. investment_operation
This table stores each buy/ sell operation of a specific investment. This is where you control the price paid, the date and the quantity purchased.

operation_id (int) (PK)
investment_id (int) (FK -> investment.investment_id)
operation_type (int) (FK -> operation_type.operation_type_id) 
operation_date (date)
quantity (int)
price_per_unit (decimal)
total_price (decimal)
-------------------------

### 5. investment_summary

This table can be used to store aggregate calculations such as average prices, total quantity purchased per year, etc. These values ​​can be calculated and stored for query optimization.

summary_id (int) (PK)
investment_id (int) (FK -> investment.investment_id)
year (int)
total_quantity (int)
total_spent (decimal)
average_price (decimal)
-------------------------

### 6. Relations and functionalities (bonus)

#### Table Relationships:
The investment_type table relates to the investment table through investment_type_id. The investment table relates to the investment_operation table through investment_id. Optionally, the investment_summary table can be used to aggregate data over time.

#### Investment Transactions:
Each time you make a purchase or sale, a new entry is added to the investment_operation table. This allows you to track the price paid, the date, and the quantity purchased.

#### Average Price Calculations:
To calculate the average price over a given period, you can query the investment_operation table to sum the total_price and quantity values, and then divide the total spent by the total quantity.
