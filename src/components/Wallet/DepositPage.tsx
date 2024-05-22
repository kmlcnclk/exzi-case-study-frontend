import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Reveal from "../Reveal";
import { AppDispatch, RootState } from "@/store";
import {
  GeneralValueType,
  setAmountOfPay,
  setCurrentNetwork,
  setCurrentToken,
} from "@/store/slices/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { sendToken } from "@/lib/sendToken";
import { detectMetamask } from "@/lib/general";

function DepositPage() {
  const generalValues: GeneralValueType = useSelector(
    (state: RootState) => state.general.value
  ) as GeneralValueType;

  const [isLoading, setIsLoading] = useState(false);

  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const dispatch = useDispatch<AppDispatch>();

  const payRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chainId === 1 || chainId === 11155111 || chainId === 5) {
      dispatch(setCurrentNetwork("eth"));
      dispatch(setCurrentToken("ethereum"));
      detectMetamask(generalValues.walletAddress, dispatch);
      dispatch(setAmountOfPay("0"));
    } else if (chainId === 56 || chainId === 97) {
      dispatch(setCurrentNetwork("bsc"));
      dispatch(setCurrentToken("binancecoin"));
      detectMetamask(generalValues.walletAddress, dispatch);
      dispatch(setAmountOfPay("0"));
    }
  }, [chainId, generalValues.walletAddress]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Reveal>
        <Box
          sx={{
            backgroundColor: "rgba(80,80,80,.4)",
            backdropFilter: "blur(32px)",
            width: { xs: "100%", md: "500px", lg: "500px" },
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", lg: "flex-start" },
            flexDirection: "column",
            height: "auto",
            borderRadius: "20px",
            boxShadow: "0px 3px 20px 0px #0000001A",
            p: "20px",
          }}
        >
          <>
            <Box
              id="Sale-Container"
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "white",
                }}
              >
                Deposit
              </Typography>
            </Box>

            <Button
              variant="outlined"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                mt: "10px",
                height: "40px",
                borderRadius: "10px",
                py: "10px",
                border: "#f3f3f3 1px solid",
                "&:hover": {
                  border: "white 2px solid",
                },
              }}
              onClick={() => {
                if (generalValues.walletAddress) {
                  open({ view: "Networks" });
                }
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "white",
                }}
              >
                {generalValues.currentNetwork === "bsc"
                  ? "Switch to ETH"
                  : "Switch to BSC"}
              </Typography>
              {generalValues.currentNetwork === "eth" ? (
                <Image
                  style={{
                    marginLeft: "10px",
                    objectFit: "contain",
                  }}
                  src="/bnb-logo.png"
                  alt="BNB Logo"
                  width={27}
                  height={27}
                />
              ) : (
                <Image
                  style={{
                    marginLeft: "10px",
                    objectFit: "contain",
                  }}
                  src="/ethereum.png"
                  alt="ETH Logo"
                  width={27}
                  height={27}
                />
              )}
            </Button>

            <Grid
              container
              spacing={2}
              sx={{
                mt: "10px",
              }}
            >
              {generalValues.currentNetwork === "bsc" ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant={
                        generalValues.currentToken === "binancecoin"
                          ? "contained"
                          : "outlined"
                      }
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "none",
                        width: "100%",
                        height: "40px",
                        borderRadius: "10px",
                        border:
                          generalValues.currentToken === "binancecoin"
                            ? "#7c3aed 1px solid"
                            : "#f3f3f3 1px solid",
                        backgroundColor:
                          generalValues.currentToken === "binancecoin"
                            ? "#7c3aed"
                            : "",
                        "&:hover": {
                          border:
                            generalValues.currentToken === "binancecoin"
                              ? "#7c3aed 1px solid"
                              : "white 2px solid",
                          backgroundColor:
                            generalValues.currentToken === "binancecoin"
                              ? "#7c3aed"
                              : "",
                          "*": {
                            color:
                              generalValues.currentToken === "binancecoin"
                                ? "white"
                                : "white",
                          },
                        },
                      }}
                      onClick={() => {
                        dispatch(setCurrentToken("binancecoin"));
                      }}
                    >
                      <Image
                        style={{
                          marginRight: "10px",
                          objectFit: "contain",
                        }}
                        src="/bnb-logo.png"
                        alt="BNB Logo"
                        width={22}
                        height={22}
                      />
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "600",
                          color:
                            generalValues.currentToken === "binancecoin"
                              ? "white"
                              : "white",
                        }}
                      >
                        BNB
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant={
                        generalValues.currentToken === "ethereum"
                          ? "contained"
                          : "outlined"
                      }
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "none",
                        width: "100%",
                        height: "40px",
                        borderRadius: "10px",
                        border:
                          generalValues.currentToken === "ethereum"
                            ? "#7c3aed 1px solid"
                            : "#f3f3f3 1px solid",
                        backgroundColor:
                          generalValues.currentToken === "ethereum"
                            ? "#7c3aed"
                            : "",
                        "&:hover": {
                          border:
                            generalValues.currentToken === "ethereum"
                              ? "#7c3aed 1px solid"
                              : "white 2px solid",
                          backgroundColor:
                            generalValues.currentToken === "ethereum"
                              ? "#7c3aed"
                              : "",
                          "*": {
                            color:
                              generalValues.currentToken === "ethereum"
                                ? "white"
                                : "white",
                          },
                        },
                      }}
                      onClick={() => {
                        dispatch(setCurrentToken("ethereum"));
                      }}
                    >
                      <Image
                        style={{
                          marginRight: "10px",
                          objectFit: "contain",
                        }}
                        src="/ethereum.png"
                        alt="Ethereum Logo"
                        width={22}
                        height={22}
                      />
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "600",
                          color:
                            generalValues.currentToken === "ethereum"
                              ? "white"
                              : "white",
                        }}
                      >
                        ETH
                      </Typography>
                    </Button>
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <Button
                    variant={
                      generalValues.currentToken === "ethereum" ||
                      generalValues.currentToken === "binancecoin"
                        ? "contained"
                        : "outlined"
                    }
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "none",
                      width: "100%",
                      height: "40px",
                      borderRadius: "10px",
                      border:
                        generalValues.currentToken === "ethereum" ||
                        generalValues.currentToken === "binancecoin"
                          ? "#7c3aed 1px solid"
                          : "#f3f3f3 1px solid",
                      backgroundColor:
                        generalValues.currentToken === "ethereum" ||
                        generalValues.currentToken === "binancecoin"
                          ? "#7c3aed"
                          : "",
                      "&:hover": {
                        border:
                          generalValues.currentToken === "ethereum" ||
                          generalValues.currentToken === "binancecoin"
                            ? "#7c3aed 1px solid"
                            : "white 2px solid",
                        backgroundColor:
                          generalValues.currentToken === "ethereum" ||
                          generalValues.currentToken === "binancecoin"
                            ? "#7c3aed"
                            : "",
                        "*": {
                          color:
                            generalValues.currentToken === "ethereum" ||
                            generalValues.currentToken === "binancecoin"
                              ? "white"
                              : "white",
                        },
                      },
                    }}
                    onClick={() => {
                      if (generalValues.currentNetwork === "bsc") {
                        dispatch(setCurrentToken("binancecoin"));
                      } else if (generalValues.currentNetwork === "eth") {
                        dispatch(setCurrentToken("ethereum"));
                      }
                    }}
                  >
                    {generalValues.currentNetwork === "bsc" ? (
                      <>
                        <Image
                          style={{
                            marginRight: "10px",
                            objectFit: "contain",
                          }}
                          src="/bnb-logo.png"
                          alt="BNB Logo"
                          width={22}
                          height={22}
                        />
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "600",
                            color:
                              generalValues.currentToken === "ethereum" ||
                              generalValues.currentToken === "binancecoin"
                                ? "white"
                                : "white",
                          }}
                        >
                          BNB
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Image
                          style={{
                            marginRight: "10px",
                            objectFit: "contain",
                          }}
                          src="/ethereum.png"
                          alt="Ethereum Logo"
                          width={22}
                          height={22}
                        />
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "600",
                            color:
                              generalValues.currentToken === "ethereum" ||
                              generalValues.currentToken === "binancecoin"
                                ? "white"
                                : "white",
                          }}
                        >
                          ETH
                        </Typography>
                      </>
                    )}
                  </Button>
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <Button
                  variant={
                    generalValues.currentToken === "tether"
                      ? "contained"
                      : "outlined"
                  }
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "none",
                    width: "100%",
                    height: "40px",
                    borderRadius: "10px",
                    border:
                      generalValues.currentToken === "tether"
                        ? "#7c3aed 1px solid"
                        : "#f3f3f3 1px solid",
                    backgroundColor:
                      generalValues.currentToken === "tether" ? "#7c3aed" : "",
                    "&:hover": {
                      border:
                        generalValues.currentToken === "tether"
                          ? "#7c3aed 1px solid"
                          : "white 2px solid",
                      backgroundColor:
                        generalValues.currentToken === "tether"
                          ? "#7c3aed"
                          : "",
                      "*": {
                        color:
                          generalValues.currentToken === "tether"
                            ? "white"
                            : "white",
                      },
                    },
                  }}
                  onClick={() => {
                    dispatch(setCurrentToken("tether"));
                  }}
                >
                  <Image
                    style={{
                      marginRight: "10px",
                      objectFit: "contain",
                    }}
                    src="/usdt-logo.png"
                    alt="USDT Logo"
                    width={30}
                    height={22}
                  />
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color:
                        generalValues.currentToken === "tether"
                          ? "white"
                          : "white",
                    }}
                  >
                    USDT
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant={
                    generalValues.currentToken === "usd-coin"
                      ? "contained"
                      : "outlined"
                  }
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "none",
                    width: "100%",
                    height: "40px",
                    borderRadius: "10px",
                    border:
                      generalValues.currentToken === "usd-coin"
                        ? "#7c3aed 1px solid"
                        : "#f3f3f3 1px solid",
                    backgroundColor:
                      generalValues.currentToken === "usd-coin"
                        ? "#7c3aed"
                        : "",
                    "&:hover": {
                      border:
                        generalValues.currentToken === "usd-coin"
                          ? "#7c3aed 1px solid"
                          : "white 2px solid",
                      backgroundColor:
                        generalValues.currentToken === "usd-coin"
                          ? "#7c3aed"
                          : "",
                      "*": {
                        color:
                          generalValues.currentToken === "usd-coin"
                            ? "white"
                            : "white",
                      },
                    },
                  }}
                  onClick={() => {
                    dispatch(setCurrentToken("usd-coin"));
                  }}
                >
                  <Image
                    style={{
                      marginRight: "10px",
                      objectFit: "contain",
                    }}
                    src="/usdc-logo.png"
                    alt="USDC Logo"
                    width={42}
                    height={42}
                  />
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color:
                        generalValues.currentToken === "usd-coin"
                          ? "white"
                          : "white",
                    }}
                  >
                    USDC
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Box
                sx={{
                  borderRadius: "20px",
                  border: "none",
                  mt: "20px",
                  width: "100%",
                  height: "50px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  component="input"
                  ref={payRef}
                  type="number"
                  value={generalValues.amountOfPay}
                  onChange={(e) => {
                    dispatch(setAmountOfPay(e.target.value));
                  }}
                  sx={{
                    width: "85%",
                    height: "47px",
                    border: "none",
                    bgcolor: "#F8F9F8",
                    borderTopLeftRadius: "20px",
                    borderBottomLeftRadius: "20px",
                    color: "#666666",
                    px: "13px",
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                />
                <Box
                  sx={{
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                    borderLeft: "1px solid #d4d4d8",
                    background: "#f3f3f3",
                    width: "15%",
                    height: "47px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {generalValues.currentToken === "binancecoin" ? (
                    <Box>
                      <Image
                        src="/bnb-logo.png"
                        alt="BNB Logo"
                        width={22}
                        height={22}
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  ) : generalValues.currentToken === "tether" ? (
                    <Box>
                      <Image
                        style={{
                          objectFit: "contain",
                        }}
                        src="/usdt-logo.png"
                        alt="USDT Logo"
                        width={40}
                        height={40}
                      />
                    </Box>
                  ) : generalValues.currentToken === "usd-coin" ? (
                    <Box>
                      <Image
                        style={{
                          objectFit: "contain",
                        }}
                        src="/usdc-logo.png"
                        alt="USDC Logo"
                        width={50}
                        height={50}
                      />
                    </Box>
                  ) : (
                    <Box>
                      <Image
                        src="/ethereum.png"
                        alt="Ethereum Logo"
                        width={22}
                        height={22}
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            <Button
              variant="contained"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "50px",
                mt: "20px",
                boxShadow: "none",
                borderRadius: "10px",
                background:
                  "linear-gradient(90deg, rgb(203,238,85) 0%, rgb(222,228,83) 100%)",
                color: "black",
              }}
              onClick={async () => {
                setIsLoading(true);
                if (isConnected) {
                  if (generalValues.walletAddress) {
                    if (generalValues.amountOfPay !== "0") {
                      const result = await sendToken(
                        address,
                        generalValues.walletAddressInSystem,
                        Number(generalValues.amountOfPay),
                        generalValues.currentNetwork,
                        generalValues.currentToken,
                        walletProvider
                      );
                      if (result) {
                        toast.info("It could be a little bit time!");
                        setIsLoading(false);

                        // await saveTransfer(result);
                      }
                    } else {
                      toast.info("You have to enter amount of pay");
                    }
                  } else {
                    toast.info("Please connect your wallet");
                  }
                } else {
                  toast.info("Please connect your wallet");
                }
                setIsLoading(false);
              }}
            >
              {isLoading ? (
                <CircularProgress size={25} sx={{ color: "#f3f3f3" }} />
              ) : (
                <>Deposit now</>
              )}
            </Button>
          </>
        </Box>
      </Reveal>
    </Box>
  );
}

export default DepositPage;
