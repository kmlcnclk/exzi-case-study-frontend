import { getAccessTokenFromLocalStorage } from "@/localstorage/accessTokenStorage";
import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Reveal from "../Reveal";

function BalancePage() {
  const [balances, setBalances] = useState({
    binance: {
      binanceBalance: "",
      ethBalanceOnBinance: "",
      usdcBalanceOnBinance: "",
      usdtBalanceOnBinance: "",
    },
    ethereum: {
      ethereumBalance: "",
      usdcBalanceOnEthereum: "",
      usdtBalanceOnEthereum: "",
    },
  });

  useEffect(() => {
    const a = async () => {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

      const res = await fetch(`${BACKEND_URL}/wallet/balance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        },
      });

      const status = await res.status;

      const data = await res.json();

      if (status === 200) {
        setBalances(data.balances);
      } else {
        if (data?.message) toast.error(data.message);
        else if (data?.error) toast.error(data.error.message);
        else if (data[0]) toast.error(data[0].message);
      }
    };
    a();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vh",
      }}
    >
      <Reveal>
        {balances.binance.binanceBalance ? (
          <Box
            sx={{
              display: "flex",
              width: { xs: "300px", sm: "400px" },
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              px: { xs: "15px", sm: "30px" },
              py: "40px",
              background: "white",
              borderRadius: "20px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "20px",
                color: "black",
              }}
            >
              Your Wallet's Balances
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                px: { xs: "10px", sm: "40px" },
                py: { xs: "20px", sm: "40px" },
                background: "white",
                borderRadius: "20px",
              }}
            >
              {balances?.binance ? (
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "18px",
                      color: "#333",
                    }}
                  >
                    Binance
                  </Typography>

                  <Box
                    sx={{
                      mt: "20px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "#333",
                      }}
                    >
                      <strong>BNB:</strong>{" "}
                      {Number(balances.binance.binanceBalance).toFixed(4)}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "#333",
                      }}
                    >
                      <strong>USDT:</strong>{" "}
                      {Number(balances.binance.usdtBalanceOnBinance).toFixed(4)}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "#333",
                      }}
                    >
                      <strong>USDC:</strong>{" "}
                      {Number(balances.binance.usdcBalanceOnBinance).toFixed(4)}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "#333",
                      }}
                    >
                      <strong>ETH:</strong>{" "}
                      {Number(balances.binance.ethBalanceOnBinance).toFixed(4)}
                    </Typography>
                  </Box>
                </Box>
              ) : null}
              {balances?.ethereum ? (
                <Box
                  sx={{
                    ml: "30px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "18px",
                      color: "#333",
                    }}
                  >
                    Ethereum
                  </Typography>

                  <Box
                    sx={{
                      mt: "20px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "#333",
                      }}
                    >
                      <strong>ETH:</strong>{" "}
                      {Number(balances.ethereum.ethereumBalance).toFixed(4)}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "#333",
                      }}
                    >
                      <strong>USDT:</strong>{" "}
                      {Number(balances.ethereum.usdtBalanceOnEthereum).toFixed(
                        4
                      )}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "#333",
                      }}
                    >
                      <strong>USDC:</strong>{" "}
                      {Number(balances.ethereum.usdcBalanceOnEthereum).toFixed(
                        4
                      )}
                    </Typography>
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={40} sx={{ color: "#f3f3f3" }} />
          </Box>
        )}
      </Reveal>
    </Box>
  );
}

export default BalancePage;
