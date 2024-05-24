import { get } from "lodash";
import ethUSDTContract from "@/contracts/eth_usdt_contract.json";
import ethUSDCContract from "@/contracts/eth_usdc_contract.json";
import bscUSDTContract from "@/contracts/bsc_usdt_contract.json";
import bscUSDCContract from "@/contracts/bsc_usdc_contract.json";
import bscETHContract from "@/contracts/bsc_eth_contract.json";
import { toast } from "react-toastify";
import { BigNumber } from "bignumber.js";
import { BrowserProvider, Contract, ethers } from "ethers";

export const sendToken = async (
  address: any,
  wallet: string,
  value: number,
  currentNetwork: string,
  currentToken: string,
  walletProvider: any
) => {
  try {
    if (get(window, "ethereum") || walletProvider) {
      if (address) {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();

        if (currentNetwork === "bsc") {
          if (currentToken === "usdt") {
            const tokenContract = new Contract(
              "0x55d398326f99059fF775485246999027B3197955",
              bscUSDTContract,
              ethersProvider
            );

            const balance = await tokenContract.balanceOf(address);

            const decimals = await tokenContract.decimals();

            const amount = ethers.parseUnits(
              value.toString(),
              Number(decimals)
            );
            const isBalanceGreater = new BigNumber(
              Number(balance)
            ).isGreaterThanOrEqualTo(Number(amount));

            if (isBalanceGreater) {
              const tx = await tokenContract
                .connect(signer)
                // @ts-ignore
                .transfer(wallet, amount);
              await tx.wait();

              if (tx.from === address) return tx.hash;
              return false;
            } else {
              toast.info("Your balance is not enough");
            }
          } else if (currentToken === "usdc") {
            const tokenContract = new Contract(
              "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
              bscUSDCContract,
              ethersProvider
            );

            const balance = await tokenContract.balanceOf(address);

            const decimals = await tokenContract.decimals();

            const amount = ethers.parseUnits(
              value.toString(),
              Number(decimals)
            );
            const isBalanceGreater = new BigNumber(
              Number(balance)
            ).isGreaterThanOrEqualTo(Number(amount));

            if (isBalanceGreater) {
              const tx = await tokenContract
                .connect(signer)
                // @ts-ignore
                .transfer(wallet, amount);
              await tx.wait();

              if (tx.from === address) return tx.hash;
              return false;
            } else {
              toast.info("Your balance is not enough");
            }
          } else if (currentToken === "bnb") {
            const amount = ethers.parseUnits(value.toString(), 18);

            const tx = await signer.sendTransaction({
              from: address,
              to: wallet,
              value: amount,
              gasLimit: 32000,
              gasPrice: 3000000000,
              chainId: "0x38",
            });

            if (tx.from === address && tx.to === wallet) return tx.hash;
            return false;
          } else if (currentToken === "eth") {
            const tokenContract = new Contract(
              "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
              bscETHContract,
              ethersProvider
            );

            const balance = await tokenContract.balanceOf(address);

            const decimals = await tokenContract.decimals();

            const amount = ethers.parseUnits(
              value.toString(),
              Number(decimals)
            );
            const isBalanceGreater = new BigNumber(
              Number(balance)
            ).isGreaterThanOrEqualTo(Number(amount));

            if (isBalanceGreater) {
              const tx = await tokenContract
                .connect(signer)
                // @ts-ignore
                .transfer(wallet, amount);
              await tx.wait();

              if (tx.from === address) return tx.hash;
              return false;
            } else {
              toast.info("Your balance is not enough");
            }
          }
        } else if (currentNetwork === "eth") {
          if (currentToken === "usdt") {
            const tokenContract = new Contract(
              "0xdac17f958d2ee523a2206206994597c13d831ec7",
              ethUSDTContract,
              ethersProvider
            );

            const balance = await tokenContract.balanceOf(address);

            const decimals = await tokenContract.decimals();

            const amount = ethers.parseUnits(
              value.toString(),
              Number(decimals)
            );
            const isBalanceGreater = new BigNumber(
              Number(balance)
            ).isGreaterThanOrEqualTo(Number(amount));

            if (isBalanceGreater) {
              const tx = await tokenContract
                .connect(signer)
                // @ts-ignore
                .transfer(wallet, amount);
              await tx.wait();

              if (tx.from === address) return tx.hash;
              return false;
            } else {
              toast.info("Your balance is not enough");
            }
          } else if (currentToken === "usdc") {
            const tokenContract = new Contract(
              "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
              ethUSDCContract,
              ethersProvider
            );

            const balance = await tokenContract.balanceOf(address);

            const decimals = await tokenContract.decimals();

            const amount = ethers.parseUnits(
              value.toString(),
              Number(decimals)
            );
            const isBalanceGreater = new BigNumber(
              Number(balance)
            ).isGreaterThanOrEqualTo(Number(amount));

            if (isBalanceGreater) {
              const tx = await tokenContract
                .connect(signer)
                // @ts-ignore
                .transfer(wallet, amount);
              await tx.wait();

              if (tx.from === address) return tx.hash;
              return false;
            } else {
              toast.info("Your balance is not enough");
            }
          } else if (currentToken === "eth") {
            const amount = ethers.parseUnits(value.toString(), 18);

            const tx = await signer.sendTransaction({
              from: address,
              to: wallet,
              value: amount,
              gasLimit: 30000,
              gasPrice: 42000000000,
              chainId: "0x1",
            });

            if (tx.from === address && tx.to === wallet) return tx.hash;
            return false;
          }
        }
        return false;
      } else {
        toast.info("You have to connect your wallet");
        return false;
      }
    }
  } catch (error: any) {
    if (error.message.includes("user reject")) {
      toast.info("You rejected it");
    } else if (
      error.message.includes(
        "Parameter decoding error: Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced."
      )
    ) {
      toast.error("There is a problem about contract ABIs");
    } else if (error.message.includes("User rejected the transaction")) {
      toast.info("You rejected it");
    } else {
      toast.error(error.message);
    }
    return false;
  }
};
