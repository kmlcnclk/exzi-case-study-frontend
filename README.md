# Cryptocurrency Trading System UI For EXZI

This system allows users to perform various cryptocurrency transactions, including wallet creation, deposits, withdrawals, and trading. Below are the available routes and their functionalities. Go to [EXZI Backend](https://github.com/kmlcnclk/exzi-case-study-backend/)

## Routes

### Home

`/`

- This route is the home page of the system with a simple design.

### Authentication

`/auth`
- **Sign In**: `/auth/sign-in`
  - Users can log in to the system.
- **Sign Up**: `/auth/sign-up`
  - Users can register to the system.

### Wallet

`/wallet`
- **Check Balance**: `/wallet/balance`
  - Users can check the balance of their wallets in the system according to coins.
- **Create Wallet**: `/wallet/create-wallet`
  - Users can create an Ethereum wallet in the system.
- **Deposit**: `/wallet/deposit`
  - Users can transfer various coins to their wallets in the system via the network they choose with the wallet provider they have connected to the system.
  - **Supported Networks**: Binance, Ethereum
  - **Supported Coins**:
    - Binance Network: BNB, ETH, USDT, USDC
    - Ethereum Network: ETH, USDT, USDC
- **Withdraw**: `/wallet/withdraw`
  - Users can transfer various coins from their wallets in the system to the wallet they have connected to the system, over the network they choose.
  - **Supported Networks**: Binance, Ethereum
  - **Supported Coins**:
    - Binance Network: BNB, ETH, USDT, USDC
    - Ethereum Network: ETH, USDT, USDC

### Trade

`/trade`
- **Trade History**: `/trade/history`
  - Users can view their previous coin buy and sell history.
- **Buy and Sell**: `/trade/buy-and-sell`
  - Users can buy and sell coins in the system. The coin used in this purchase is from the wallet created by the user within the system.
  - **Supported Networks**: Binance, Ethereum
  - **Supported Coins**:
    - Binance Network: BNB, ETH, USDT, USDC
    - Ethereum Network: ETH, USDT, USDC


## Supported Networks and Tokens

The system supports the following networks and tokens:

- **Binance Network:**
  - USDT
  - USDC
  - BNB
  - ETH

- **Ethereum Network:**
  - USDT
  - USDC
  - ETH


## Used Technologies

- Typescript
- Javascript
- React
- Next.js
- Material UI
- Redux
- Redux Toolkit

## Node Version

The system is built using Node version v20.11.1.


## Getting Started

To perform any transaction in this system, you first need to register or log in to the system. After this process, you can create your Ethereum wallet in the system with the `/wallet/create-wallet` route.

Then, connect your wallet provider with the system (Metamask, Phantom, Trust Wallet, etc.) to make transactions such as withdrawal and deposit in the system.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/kmlcnclk/exzi-case-study-frontend.git
    ```
2. Install dependencies:
    ```bash
    cd exzi-case-study-frontend
    npm install
    ```
3. Run the application:
    ```bash
    npm run dev
    ```

## Contributing

Feel free to submit issues or pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.

