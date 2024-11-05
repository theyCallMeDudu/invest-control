# Invest Control Database Documentation

## Database
- MySQL

## Tables
- investment
- investment_type
- operation_type
- operation
- wallets
- wallet_investments
- wallet_history
-------------------------

## Tables Description

### 1. investment_type
This table stores the different types of investments, such as REITs (Real Estate Investment Trust, "FII" in pt-br) and Stocks ("Ações" in pt-br).

- **investment_type_id** (int) (PK)
- **investment_type_name** (varchar)
-------------------------

### 2. investment
This table stores the basic information about each specific investment.

- **investment_id** (int) (PK)
- **investment_type_id** (int) (FK -> investment_type.investment_type_id)
- **investment_name** (varchar)
-------------------------

### 3. operation_type
This table stores the different types of operations, such as purchase and sale.

- **operation_type_id** (int) (PK)
- **operation_type_name** (varchar)
-------------------------

### 4. operation
This table stores each buy/sell operation of a specific investment. This is where you control the price paid, the date, and the quantity purchased.

- **operation_id** (int) (PK)
- **investment_id** (int) (FK -> investment.investment_id)
- **operation_type_id** (int) (FK -> operation_type.operation_type_id)
- **operation_date** (date)
- **quantity** (int)
- **unit_price** (decimal)
- **operation_value** (decimal)
-------------------------

### 5. wallet
This table serves as a central record for each user’s wallet, including aggregate data for total investment and profit/loss across all investments.

- **wallet_id** (int) (PK)
- **user_id** (int) (FK -> users.id)
- **total_invested** (decimal) (total amount spent on all investments within the wallet)
- **profit_loss** (decimal) (net profit/loss realized from sales in the wallet)
- **created_at** (timestamp)
- **updated_at** (timestamp)
-------------------------

### 6. wallet_investments
This table stores detailed information about each investment within a user’s wallet, including average acquisition price and total quantity.

- **wallet_investment_id** (int) (PK)
- **wallet_id** (int) (FK -> wallets.wallet_id)
- **investment_id** (int) (FK -> investment.investment_id)
- **quantity** (int) (total number of units for the investment in the wallet)
- **average_price** (decimal) (average price paid per unit of the investment)
- **total_value** (decimal) (total value based on quantity and average price)
-------------------------

### 7. wallet_history (optional)
This table is used to store historical data on the wallet's over time.

- **wallet_history_id** (int) (PK)
- **wallet_id** (int) (FK -> wallet.wallet_id)
- **operation_id** (int) (FK -> operation.operation_id)
- **date** (date) (record date for the snapshot of wallet performance)
-------------------------

### Relationships and Functionalities

#### Table Relationships
- The **investment_type** table relates to the **investment** table through `investment_type_id`.
- The **investment** table relates to the **operation** table through `investment_id`.
- The **wallets** table is associated with users, while **wallet_investments** records details for each individual investment within the wallet.

#### Investment Transactions
Each time a user makes a purchase or sale, a new entry is added to the **operation** table. For each investment, **wallet_investments** maintains the total quantity and average acquisition price.

#### Wallet Summary Calculations
The **wallets** table keeps track of aggregate data, including `total_invested` (total capital invested) and `profit_loss` (profit or loss realized from sales). These values are updated in the **wallet_investments** table to provide an accurate overview.

#### Average Price and Profit/Loss Calculations
To calculate the average acquisition price or net profit/loss, queries can be made against **wallet_investments** and **operations**, summing up total spending and quantity to determine the price average or total gain/loss for each investment in the wallet.
