import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
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
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import Image from "next/image";
import { toast } from "react-toastify";
import { detectMetamask } from "@/lib/general";
import { getAccessTokenFromLocalStorage } from "@/localstorage/accessTokenStorage";

function BuyAndSalePage() {
  const generalValues: GeneralValueType = useSelector(
    (state: RootState) => state.general.value
  ) as GeneralValueType;

  const [isLoadingForBuy, setIsLoadingForBuy] = useState(false);
  const [isLoadingForSell, setIsLoadingForSell] = useState(false);

  const [buyFrom, setBuyFrom] = useState("");
  const [buyTo, setBuyTo] = useState("");
  const [buyAmount, setBuyAmount] = useState("");

  const [sellFrom, setSellFrom] = useState("");
  const [sellTo, setSellTo] = useState("");
  const [sellAmount, setSellAmount] = useState("");

  const { open } = useWeb3Modal();
  const { chainId } = useWeb3ModalAccount();

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

  const buyCoin = async () => {
    setIsLoadingForBuy(true);

    if (buyFrom) {
      if (buyTo) {
        if (buyAmount) {
          const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

          const buyData: any = {
            amount: buyAmount,
            tokens: [buyFrom, buyTo],
            network: generalValues.currentNetwork,
          };

          const res = await fetch(`${BACKEND_URL}/trade/buy`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
            },
            body: JSON.stringify(buyData),
          });

          const status = await res.status;

          const data = await res.json();

          if (status === 200) {
            toast.success(data.message);
            setIsLoadingForBuy(false);
          } else {
            setIsLoadingForBuy(false);

            if (data?.message) toast.error(data.message);
            else if (data?.error) toast.error(data.error);
            else if (data[0]) toast.error(data[0].message);
          }
        } else {
          toast.info("Please enter an amount!");
        }
      } else {
        toast.info("Select To for buy coin");
      }
    } else {
      toast.info("Select From for buy coin");
    }
    setIsLoadingForBuy(false);
  };

  const sellCoin = async () => {
    setIsLoadingForSell(true);

    if (sellFrom) {
      if (sellTo) {
        if (buyAmount) {
          const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

          const sellData: any = {
            amount: sellAmount,
            tokens: [sellFrom, sellTo],
            network: generalValues.currentNetwork,
          };

          const res = await fetch(`${BACKEND_URL}/trade/sell`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
            },
            body: JSON.stringify(sellData),
          });

          const status = await res.status;

          const data = await res.json();

          if (status === 200) {
            toast.success(data.message);
            setIsLoadingForSell(false);
          } else {
            setIsLoadingForSell(false);

            if (data?.message) toast.error(data.message);
            else if (data?.error) toast.error(data.error.message);
            else if (data[0]) toast.error(data[0].message);
          }
        } else {
          toast.info("Please enter an amount!");
        }
      } else {
        toast.info("Select To for sell coin");
      }
    } else {
      toast.info("Select From for sell coin");
    }
    setIsLoadingForSell(false);
  };

  return (
    <Box
      sx={{
        height: { xs: "100%", lg: "100vh" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        mt: { xs: "100px", lg: "0px" },
      }}
    >
      <Reveal>
        <Box
          sx={{
            backgroundColor: "rgba(80,80,80,.4)",
            backdropFilter: "blur(32px)",
            width: { xs: "300px", md: "500px", lg: "500px" },
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
                Buy
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
                } else {
                  toast.info("Please connect your wallet");
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

            <Box
              sx={{
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "white",
                  mt: "20px",
                }}
              >
                From
              </Typography>
              <Select
                value={buyFrom}
                onChange={(e: SelectChangeEvent) => {
                  setBuyFrom(e.target.value as string);
                }}
                sx={{
                  width: "100%",
                  bgcolor: "#f3f3f3",
                  mt: "10px",
                  ".MuiSelect-select": {
                    display: "flex",
                  },
                }}
              >
                {generalValues.currentNetwork === "bsc" ? (
                  <MenuItem value="bnb">
                    <Image
                      style={{
                        marginRight: "10px",
                        objectFit: "contain",
                        marginLeft: "20px",
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
                        color: "#333",
                      }}
                    >
                      BNB
                    </Typography>
                  </MenuItem>
                ) : null}
                <MenuItem value="eth">
                  <Image
                    style={{
                      marginRight: "10px",
                      objectFit: "contain",
                      marginLeft: "20px",
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
                      color: "#333",
                    }}
                  >
                    ETH
                  </Typography>
                </MenuItem>
                <MenuItem value="tether">
                  <Image
                    style={{
                      marginRight: "10px",
                      objectFit: "contain",
                      marginLeft: "15px",
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
                      color: "#333",
                    }}
                  >
                    USDT
                  </Typography>
                </MenuItem>
                <MenuItem value="usdc">
                  <Image
                    style={{
                      marginRight: "10px",
                      objectFit: "contain",
                      marginLeft: "14px",
                    }}
                    src="/usdc-logo.png"
                    alt="USDC Logo"
                    width={32}
                    height={26}
                  />
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    USDC
                  </Typography>
                </MenuItem>
              </Select>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "white",
                  mt: "30px",
                }}
              >
                To
              </Typography>
              <Select
                value={buyTo}
                onChange={(e: SelectChangeEvent) => {
                  setBuyTo(e.target.value as string);
                }}
                sx={{
                  width: "100%",
                  bgcolor: "#f3f3f3",
                  mt: "10px",
                  ".MuiSelect-select": {
                    display: "flex",
                  },
                }}
              >
                {generalValues.currentNetwork === "bsc" ? (
                  <MenuItem value="bnb">
                    <Image
                      style={{
                        marginRight: "10px",
                        objectFit: "contain",
                        marginLeft: "20px",
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
                        color: "#333",
                      }}
                    >
                      BNB
                    </Typography>
                  </MenuItem>
                ) : null}
                <MenuItem value="eth">
                  <Image
                    style={{
                      marginRight: "10px",
                      objectFit: "contain",
                      marginLeft: "20px",
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
                      color: "#333",
                    }}
                  >
                    ETH
                  </Typography>
                </MenuItem>
                <MenuItem value="tether">
                  <Image
                    style={{
                      marginRight: "10px",
                      objectFit: "contain",
                      marginLeft: "15px",
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
                      color: "#333",
                    }}
                  >
                    USDT
                  </Typography>
                </MenuItem>
                <MenuItem value="usdc">
                  <Image
                    style={{
                      marginRight: "10px",
                      objectFit: "contain",
                      marginLeft: "14px",
                    }}
                    src="/usdc-logo.png"
                    alt="USDC Logo"
                    width={32}
                    height={26}
                  />
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    USDC
                  </Typography>
                </MenuItem>
              </Select>
            </Box>

            <Box
              sx={{
                width: "100%",
                mt: "20px",
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
                  value={buyAmount}
                  onChange={(e) => {
                    setBuyAmount(e.target.value);
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
              onClick={() => {
                buyCoin();
              }}
            >
              {isLoadingForBuy ? (
                <CircularProgress size={25} sx={{ color: "#f3f3f3" }} />
              ) : (
                <>Buy now</>
              )}
            </Button>
          </>
        </Box>
      </Reveal>

      <Reveal>
        <Box
          sx={{
            mt: { xs: "20px", lg: "0px" },
            ml: { xs: "0px", lg: "20px" },
            backgroundColor: "rgba(80,80,80,.4)",
            backdropFilter: "blur(32px)",
            width: { xs: "300px", md: "500px", lg: "500px" },
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
                Sale
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
                } else {
                  toast.info("Please connect your wallet");
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

            <Box
              sx={{
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "white",
                  mt: "20px",
                }}
              >
                From
              </Typography>
              <Select
                value={sellFrom}
                onChange={(e: SelectChangeEvent) => {
                  setSellFrom(e.target.value as string);
                }}
                sx={{
                  width: "100%",
                  bgcolor: "#f3f3f3",
                  mt: "10px",
                  ".MuiSelect-select": {
                    display: "flex",
                  },
                }}
              >
                {generalValues.currentNetwork === "bsc" ? (
                  <MenuItem value="bnb">
                    <Image
                      style={{
                        marginRight: "10px",
                        objectFit: "contain",
                        marginLeft: "20px",
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
                        color: "#333",
                      }}
                    >
                      BNB
                    </Typography>
                  </MenuItem>
                ) : null}
                <MenuItem value="eth">
                  <Image
                    style={{
                      marginRight: "10px",
                      objectFit: "contain",
                      marginLeft: "20px",
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
                      color: "#333",
                    }}
                  >
                    ETH
                  </Typography>
                </MenuItem>
                <MenuItem value="tether">
                  <Image
                    style={{
                      marginRight: "10px",
                      objectFit: "contain",
                      marginLeft: "15px",
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
                      color: "#333",
                    }}
                  >
                    USDT
                  </Typography>
                </MenuItem>
                <MenuItem value="usdc">
                  <Image
                    style={{
                      marginRight: "10px",
                      objectFit: "contain",
                      marginLeft: "14px",
                    }}
                    src="/usdc-logo.png"
                    alt="USDC Logo"
                    width={32}
                    height={26}
                  />
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    USDC
                  </Typography>
                </MenuItem>
              </Select>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "white",
                  mt: "30px",
                }}
              >
                To
              </Typography>
              <Select
                value={sellTo}
                onChange={(e: SelectChangeEvent) => {
                  setSellTo(e.target.value as string);
                }}
                sx={{
                  width: "100%",
                  bgcolor: "#f3f3f3",
                  mt: "10px",
                  ".MuiSelect-select": {
                    display: "flex",
                  },
                }}
              >
                {generalValues.currentNetwork === "bsc" ? (
                  <MenuItem value="bnb">
                    <Image
                      style={{
                        marginRight: "10px",
                        objectFit: "contain",
                        marginLeft: "20px",
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
                        color: "#333",
                      }}
                    >
                      BNB
                    </Typography>
                  </MenuItem>
                ) : null}
                <MenuItem value="eth">
                  <Image
                    style={{
                      marginRight: "10px",
                      objectFit: "contain",
                      marginLeft: "20px",
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
                      color: "#333",
                    }}
                  >
                    ETH
                  </Typography>
                </MenuItem>
                <MenuItem value="tether">
                  <Image
                    style={{
                      marginRight: "10px",
                      objectFit: "contain",
                      marginLeft: "15px",
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
                      color: "#333",
                    }}
                  >
                    USDT
                  </Typography>
                </MenuItem>
                <MenuItem value="usdc">
                  <Image
                    style={{
                      marginRight: "10px",
                      objectFit: "contain",
                      marginLeft: "14px",
                    }}
                    src="/usdc-logo.png"
                    alt="USDC Logo"
                    width={32}
                    height={26}
                  />
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    USDC
                  </Typography>
                </MenuItem>
              </Select>
            </Box>

            <Box
              sx={{
                width: "100%",
                mt: "20px",
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
                  value={sellAmount}
                  onChange={(e) => {
                    setSellAmount(e.target.value);
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
              onClick={() => {
                sellCoin();
              }}
            >
              {isLoadingForSell ? (
                <CircularProgress size={25} sx={{ color: "#f3f3f3" }} />
              ) : (
                <>Sale now</>
              )}
            </Button>
          </>
        </Box>
      </Reveal>
    </Box>
  );
}

export default BuyAndSalePage;
