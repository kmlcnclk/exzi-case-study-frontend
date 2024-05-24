import { Box, Button, Drawer, Menu, MenuItem, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  GeneralValueType,
  setCurrentNetwork,
  setOpenModal2,
  setWalletAddress,
} from "@/store/slices/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { detectMetamask } from "@/lib/general";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useRouter } from "next/router";
import WalletIcon from "@mui/icons-material/Wallet";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import AddIcon from "@mui/icons-material/Add";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ArticleIcon from "@mui/icons-material/Article";
import {
  deleteAccessTokenFromLocalStorage,
  getAccessTokenFromLocalStorage,
} from "@/localstorage/accessTokenStorage";
import { deleteRefreshTokenFromLocalStorage } from "@/localstorage/refreshTokenStorage";
import {
  AccountBalance,
  AccountBalanceWallet,
  History,
  LocalAtm,
  ShoppingCart,
} from "@mui/icons-material";

interface Props {}

const Header: React.FC<Props> = () => {
  const headList = [
    {
      name: "Home",
      id: "Home",
      target: "",
      link: "/",
    },
    {
      name: "Wallet",
      link: "/wallet",
      target: "",
    },
    {
      name: "Trade",
      link: "/trade",
      target: "",
    },
  ];

  const walletList = [
    {
      name: "Create Wallet",
      link: "/wallet/create-wallet",
      id: "create-wallet",
    },
    {
      name: "Deposit",
      link: "/wallet/deposit",
      id: "deposit",
    },
    {
      name: "Withdraw",
      link: "/wallet/withdraw",
      id: "withdraw",
    },
    {
      name: "Balance",
      link: "/wallet/balance",
      id: "balance",
    },
  ];

  const tradeList = [
    {
      name: "Buy / Sell",
      link: "/trade/buy-sell",
      id: "buy-sell",
    },
    {
      name: "History",
      link: "/trade/history",
      id: "history",
    },
  ];

  const { open } = useWeb3Modal();
  const { address, chainId } = useWeb3ModalAccount();
  const [clickedItem, setClickedItem] = useState("home");
  const [isAuth, setIsAuth] = useState(false);

  const generalValues: GeneralValueType = useSelector(
    (state: RootState) => state.general.value
  ) as GeneralValueType;

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  useEffect(() => {
    dispatch(setWalletAddress(address ?? ""));
    detectMetamask(
      address?.toString() ?? generalValues.walletAddress,
      dispatch
    );
  }, [address, generalValues.walletAddress]);

  useEffect(() => {
    if (chainId === 1 || chainId === 11155111 || chainId === 5) {
      dispatch(setCurrentNetwork("eth"));
    } else if (chainId === 56 || chainId === 97) {
      dispatch(setCurrentNetwork("bsc"));
    }
  }, [chainId]);

  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);

  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const openAuthPopup1 = Boolean(anchorEl1);

  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const openAuthPopup2 = Boolean(anchorEl2);

  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    if (typeof window != "undefined") {
      if (getAccessTokenFromLocalStorage()) {
        setIsAuth(true);
      }
    }
  }, []);

  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        height: "70px",
        backgroundColor: "#000",
        backdropFilter: "blur(32px)",
        border: "none",
        position: "fixed",
        top: "0px",
        left: "0px",
        right: "0px",
        boxShadow: "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: "100",
        px: { xs: "10px", md: "20px", lg: "40px" },
      }}
    >
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          sx={{
            width: "250px",
            background: "#333",
            height: "100%",
            p: "20px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: "30px",
            }}
          >
            <Image
              src="/exzi.svg"
              alt="Main Logo"
              width={100}
              height={100}
              fetchPriority="high"
              style={{
                objectFit: "contain",
              }}
            />
          </Box>

          {headList.map((hl, i) => (
            <Box
              sx={{
                ml: "20px",
                "*": {
                  textDecoration: "none",
                },
              }}
              key={i}
            >
              {
                <>
                  {hl.name === "Wallet" ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: "10px",
                        }}
                      >
                        <StarIcon
                          sx={{
                            fill: "white",
                            mr: "10px",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                        <Typography
                          sx={{
                            background:
                              router.asPath === hl.link
                                ? "linear-gradient(90deg, rgb(203,238,85) 0%, rgb(222,228,83) 100%)"
                                : "rgb(130,130,129)",
                            color: "#f3f3f3",
                            display: "inline-flex",
                            WebkitBackgroundClip: "text",
                            fontSize: "15px",
                            cursor: "pointer",
                          }}
                        >
                          {hl.name}
                        </Typography>
                      </Box>
                      {walletList.map((wallet, i) => (
                        <Box
                          key={i}
                          sx={{
                            ml: "25px",
                            mt: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                            onClick={() => {
                              router.push(wallet.link);
                              setTimeout(() => {
                                const itemName = wallet.id as unknown as string;

                                const item: any =
                                  document.getElementById(itemName);
                                if (item) {
                                  item.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }
                                setClickedItem(wallet.name);
                              }, 1000);
                            }}
                          >
                            {wallet.name === "Create Wallet" ? (
                              <AddIcon
                                sx={{
                                  fill: "white",
                                  mr: "10px",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                            ) : null}
                            {wallet.name === "Deposit" ? (
                              <AccountBalance
                                sx={{
                                  fill: "white",
                                  mr: "10px",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                            ) : null}
                            {wallet.name === "Withdraw" ? (
                              <LocalAtm
                                sx={{
                                  fill: "white",
                                  mr: "10px",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                            ) : null}
                            {wallet.name === "Balance" ? (
                              <AccountBalanceWallet
                                sx={{
                                  fill: "white",
                                  mr: "10px",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                            ) : null}
                            <Typography
                              sx={{
                                background: "rgb(130,130,129)",
                                color: "#f3f3f3",
                                WebkitBackgroundClip: "text",
                                fontSize: "15px",
                              }}
                            >
                              {wallet.name}
                            </Typography>
                          </Box>
                        </Box>
                      ))}{" "}
                    </>
                  ) : (
                    <>
                      {hl.name === "Trade" ? (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: "10px",
                            }}
                          >
                            <StarIcon
                              sx={{
                                fill: "white",
                                mr: "10px",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                            <Typography
                              sx={{
                                background:
                                  router.asPath === hl.link
                                    ? "linear-gradient(90deg, rgb(203,238,85) 0%, rgb(222,228,83) 100%)"
                                    : "rgb(130,130,129)",
                                color: "#f3f3f3",
                                display: "inline-flex",
                                WebkitBackgroundClip: "text",
                                fontSize: "15px",
                                cursor: "pointer",
                              }}
                            >
                              {hl.name}
                            </Typography>
                          </Box>
                          {tradeList.map((trade, i) => (
                            <Box
                              key={i}
                              sx={{
                                ml: "25px",
                                mt: "10px",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                onClick={() => {
                                  router.push(trade.link);
                                  setTimeout(() => {
                                    const itemName =
                                      trade.id as unknown as string;

                                    const item: any =
                                      document.getElementById(itemName);
                                    if (item) {
                                      item.scrollIntoView({
                                        behavior: "smooth",
                                      });
                                    }
                                    setClickedItem(trade.name);
                                  }, 1000);
                                }}
                              >
                                {trade.name === "Buy / Sell" ? (
                                  <ShoppingCart
                                    sx={{
                                      fill: "white",
                                      mr: "10px",
                                      width: "20px",
                                      height: "20px",
                                    }}
                                  />
                                ) : null}
                                {trade.name === "History" ? (
                                  <History
                                    sx={{
                                      fill: "white",
                                      mr: "10px",
                                      width: "20px",
                                      height: "20px",
                                    }}
                                  />
                                ) : null}
                                <Typography
                                  sx={{
                                    background: "rgb(130,130,129)",
                                    color: "#f3f3f3",
                                    WebkitBackgroundClip: "text",
                                    fontSize: "15px",
                                  }}
                                >
                                  {trade.name}
                                </Typography>
                              </Box>
                            </Box>
                          ))}{" "}
                        </>
                      ) : (
                        <Box
                          sx={{
                            cursor: "pointer",
                          }}
                          onClick={(e: any) => {
                            e.preventDefault();
                            router.push(hl.link);
                            setTimeout(() => {
                              const itemName = hl.id as unknown as string;

                              const item: any =
                                document.getElementById(itemName);
                              if (item) {
                                item.scrollIntoView({
                                  behavior: "smooth",
                                });
                              }
                              setClickedItem(hl.name);
                            }, 1000);
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              mt: "10px",
                            }}
                          >
                            {hl.name === "Home" ? (
                              <HomeIcon
                                sx={{
                                  fill: "white",
                                  mr: "10px",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                            ) : null}
                            {hl.name === "About Us" ? (
                              <InfoIcon
                                sx={{
                                  fill: "white",
                                  mr: "10px",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                            ) : null}
                            {hl.name === "Connect Us" ? (
                              <ForumIcon
                                sx={{
                                  fill: "white",
                                  mr: "10px",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                            ) : null}
                            {hl.name === "Whitepaper" ? (
                              <ArticleIcon
                                sx={{
                                  fill: "white",
                                  mr: "10px",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                            ) : null}
                            <Typography
                              sx={{
                                background:
                                  router.asPath === hl.link
                                    ? "linear-gradient(90deg, rgb(203,238,85) 0%, rgb(222,228,83) 100%)"
                                    : "rgb(255,255,255)",
                                color: "#f3f3f3",

                                WebkitBackgroundClip: "text",
                                fontSize: "15px",
                              }}
                            >
                              {hl.name}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </>
                  )}
                </>
              }
            </Box>
          ))}

          {generalValues?.walletAddressInSystem ? (
            <Button
              variant="contained"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100",
                height: "40px",
                borderRadius: "10px",
                boxShadow: "none",
                background: "#dc2626",
                px: "20px",
                ml: "30px",
                mt: "20px",
                "&:hover": {
                  background: "#dc2626",
                },
              }}
              onClick={() => {
                deleteAccessTokenFromLocalStorage();
                deleteRefreshTokenFromLocalStorage();
                router.reload();
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                Logout
              </Typography>
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "40px",
                  px: "30px",
                  borderRadius: "5px",
                  background:
                    "linear-gradient(90deg, rgb(203,238,85) 0%, rgb(222,228,83) 100%)",
                  color: "black",
                  ml: "30px",
                  mt: "20px",
                }}
                onClick={() => {
                  router.push("/auth/sign-in");
                }}
              >
                <Typography
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  Sign In
                </Typography>
              </Button>
              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "40px",
                  px: "30px",
                  borderRadius: "5px",
                  background:
                    "linear-gradient(90deg, rgb(203,238,85) 0%, rgb(222,228,83) 100%)",
                  color: "black",
                  ml: "30px",
                  mt: "20px",
                }}
                onClick={() => {
                  router.push("/auth/sign-up");
                }}
              >
                <Typography
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  Sign Up
                </Typography>
              </Button>
            </>
          )}
        </Box>
      </Drawer>
      <Button
        variant="text"
        sx={{
          ml: { xs: "0px", md: "20px" },
          display: { xs: "flex", lg: "none" },
          justifyContent: "center",
          alignItems: "center",
          height: "40px",
          px: "30px",
          borderRadius: "5px",
          background: "black",
          color: "black",
        }}
        onClick={() => {
          setIsDrawerOpen(true);
        }}
      >
        <MenuIcon sx={{ fill: "#fff" }} />
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src="/exzi.svg"
              alt="Main Logo"
              width={100}
              height={100}
              fetchPriority="high"
              style={{
                objectFit: "contain",
              }}
            />
          </Box>
        </Link>
      </Box>
      <Box
        sx={{
          ml: "10px",
          display: { xs: "none", lg: "flex" },
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {headList.map((hl, i) => (
          <Box
            sx={{
              ml: "20px",
              "*": {
                textDecoration: "none",
              },
            }}
            key={i}
          >
            {
              <>
                {hl.name === "Wallet" ? (
                  <>
                    <Typography
                      sx={{
                        background:
                          router.asPath === hl.link
                            ? "linear-gradient(90deg, rgb(203,238,85) 0%, rgb(222,228,83) 100%)"
                            : "rgb(255,255,255)",
                        color: "transparent",
                        WebkitBackgroundClip: "text",
                        fontSize: "15px",
                        cursor: "pointer",
                      }}
                      onClick={handleClick1}
                    >
                      {hl.name}
                    </Typography>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl1}
                      open={openAuthPopup1}
                      onClose={handleClose1}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                      sx={{
                        "& .MuiPaper-root": {
                          borderRadius: "10px",
                          mt: "5px",
                          ml: "-25px",
                        },
                        "& ul": {
                          backgroundColor: "#030712",
                          border: "#666 1px solid",
                          borderRadius: "10px",
                        },
                        "& li:hover": {
                          backgroundColor: "#111827",
                          transitionProperty: "all",
                          transitionTimingFunction:
                            "cubic-bezier(0.4, 0, 0.2, 1)",
                          transitionDuration: "150ms",
                        },
                        "& a": {
                          textDecoration: "none !important",
                        },
                      }}
                    >
                      {walletList.map((wallet, i) => (
                        <Box
                          onClick={() => {
                            router.push(wallet.link);
                            setTimeout(() => {
                              const itemName = wallet.id as unknown as string;

                              const item: any =
                                document.getElementById(itemName);
                              if (item) {
                                item.scrollIntoView({
                                  behavior: "smooth",
                                });
                              }
                              setClickedItem(wallet.name);
                            }, 1000);
                          }}
                          key={i}
                        >
                          <MenuItem onClick={handleClose1}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                sx={{
                                  background: "rgb(255,255,255)",
                                  color: "transparent",
                                  WebkitBackgroundClip: "text",
                                  fontSize: "15px",
                                }}
                              >
                                {wallet.name}
                              </Typography>
                            </Box>
                          </MenuItem>
                        </Box>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <>
                    {hl.name === "Trade" ? (
                      <>
                        <Typography
                          sx={{
                            background:
                              router.asPath === hl.link
                                ? "linear-gradient(90deg, rgb(203,238,85) 0%, rgb(222,228,83) 100%)"
                                : "rgb(255,255,255)",
                            color: "transparent",
                            WebkitBackgroundClip: "text",
                            fontSize: "15px",
                            cursor: "pointer",
                          }}
                          onClick={handleClick2}
                        >
                          {hl.name}
                        </Typography>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl2}
                          open={openAuthPopup2}
                          onClose={handleClose2}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                          sx={{
                            "& .MuiPaper-root": {
                              borderRadius: "10px",
                              mt: "5px",
                              ml: "-25px",
                            },
                            "& ul": {
                              backgroundColor: "#030712",
                              border: "#666 1px solid",
                              borderRadius: "10px",
                            },
                            "& li:hover": {
                              backgroundColor: "#111827",
                              transitionProperty: "all",
                              transitionTimingFunction:
                                "cubic-bezier(0.4, 0, 0.2, 1)",
                              transitionDuration: "150ms",
                            },
                            "& a": {
                              textDecoration: "none !important",
                            },
                          }}
                        >
                          {tradeList.map((trade, i) => (
                            <Box
                              onClick={() => {
                                router.push(trade.link);
                                setTimeout(() => {
                                  const itemName =
                                    trade.id as unknown as string;

                                  const item: any =
                                    document.getElementById(itemName);
                                  if (item) {
                                    item.scrollIntoView({
                                      behavior: "smooth",
                                    });
                                  }
                                  setClickedItem(trade.name);
                                }, 1000);
                              }}
                              key={i}
                            >
                              <MenuItem onClick={handleClose2}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      background: "rgb(255,255,255)",
                                      color: "transparent",
                                      WebkitBackgroundClip: "text",
                                      fontSize: "15px",
                                    }}
                                  >
                                    {trade.name}
                                  </Typography>
                                </Box>
                              </MenuItem>
                            </Box>
                          ))}
                        </Menu>
                      </>
                    ) : (
                      <Box
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={(e: any) => {
                          e.preventDefault();

                          router.push(hl.link);
                          setTimeout(() => {
                            const itemName = hl.id as unknown as string;

                            const item: any = document.getElementById(itemName);
                            if (item) {
                              item.scrollIntoView({
                                behavior: "smooth",
                              });
                            }
                            setClickedItem(hl.name);
                          }, 1000);
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {clickedItem === hl.name ? (
                            <Box
                              sx={{
                                width: "5px",
                                height: "5px",
                                background:
                                  "linear-gradient(90deg, rgb(203,238,85) 0%, rgb(222,228,83) 100%)",
                                borderRadius: "100%",
                                mr: "5px",
                              }}
                            ></Box>
                          ) : null}
                          <Typography
                            sx={{
                              background:
                                clickedItem === hl.name
                                  ? "linear-gradient(90deg, rgb(203,238,85) 0%, rgb(222,228,83) 100%)"
                                  : "rgb(255,255,255)",
                              color: "transparent",
                              WebkitBackgroundClip: "text",
                              fontSize: "15px",
                            }}
                          >
                            {hl.name}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </>
                )}
              </>
            }
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {generalValues?.walletAddressInSystem ? (
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100",
                height: "40px",
                borderRadius: "10px",
                boxShadow: "none",
                background: "rgb(65,65,65)",
                px: "20px",
                "&:hover": {
                  background: "#000",
                },
              }}
              onClick={() => dispatch(setOpenModal2(true))}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                {generalValues?.walletAddressInSystem?.slice(0, 5)}
                ...
                {generalValues?.walletAddressInSystem?.slice(
                  generalValues?.walletAddressInSystem?.length - 4,
                  generalValues?.walletAddressInSystem?.length
                )}
              </Typography>
            </Button>
          </Box>
        ) : null}

        {isAuth ? (
          <Button
            variant="contained"
            sx={{
              display: { xs: "none", lg: "flex" },
              justifyContent: "center",
              alignItems: "center",
              width: "100",
              height: "40px",
              borderRadius: "10px",
              boxShadow: "none",
              background: "#dc2626",
              px: "20px",
              ml: { xs: "0px", md: "20px" },
              "&:hover": {
                background: "#dc2626",
              },
            }}
            onClick={() => {
              deleteAccessTokenFromLocalStorage();
              deleteRefreshTokenFromLocalStorage();
              router.reload();
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              Logout
            </Typography>
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              sx={{
                ml: { xs: "0px", md: "20px" },
                display: { xs: "none", lg: "flex" },
                justifyContent: "center",
                alignItems: "center",
                height: "40px",
                px: "30px",
                borderRadius: "5px",
                background:
                  "linear-gradient(90deg, rgb(203,238,85) 0%, rgb(222,228,83) 100%)",
                color: "black",
              }}
              onClick={() => {
                router.push("/auth/sign-in");
              }}
            >
              <Typography
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Sign In
              </Typography>
            </Button>
            <Button
              variant="contained"
              sx={{
                ml: { xs: "0px", md: "20px" },
                display: { xs: "none", lg: "flex" },
                justifyContent: "center",
                alignItems: "center",
                height: "40px",
                px: "30px",
                borderRadius: "5px",
                background:
                  "linear-gradient(90deg, rgb(203,238,85) 0%, rgb(222,228,83) 100%)",
                color: "black",
              }}
              onClick={() => {
                router.push("/auth/sign-up");
              }}
            >
              <Typography
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Sign Up
              </Typography>
            </Button>
          </>
        )}

        <Button
          variant="contained"
          sx={{
            ml: { xs: "0px", md: "20px" },
            display: { xs: "none", lg: "flex" },
            justifyContent: "center",
            alignItems: "center",
            height: "40px",
            px: "30px",
            borderRadius: "5px",
            background:
              "linear-gradient(90deg, rgb(203,238,85) 0%, rgb(222,228,83) 100%)",
            color: "black",
          }}
          onClick={() => {
            open();
          }}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
            }}
          >
            {generalValues.walletAddress ? " Your Wallet" : "Connect Wallet"}
          </Typography>
        </Button>
        <Button
          variant="text"
          sx={{
            ml: { xs: "0px", md: "20px" },
            display: { xs: "flex", lg: "none" },
            justifyContent: "center",
            alignItems: "center",
            height: "40px",
            px: "30px",
            borderRadius: "5px",
            background: "black",
            color: "black",
          }}
          onClick={() => {
            open();
          }}
        >
          <WalletIcon
            sx={{
              fill: "#fff",
            }}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
