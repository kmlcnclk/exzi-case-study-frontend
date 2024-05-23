import { getAccessTokenFromLocalStorage } from "@/localstorage/accessTokenStorage";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Reveal from "../Reveal";

function CreateWalletPage() {
  const [walletType, setWalletType] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const userData: { type: string } = {
      type: walletType,
    };

    const res = await fetch(`${BACKEND_URL}/wallet/create-wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
      },
      body: JSON.stringify(userData),
    });

    const status = await res.status;

    const data = await res.json();

    if (status === 200) {
      toast.success("Wallet successfully created!");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      if (data?.message) toast.error(data.message);
      else if (data?.error) toast.error(data.error.message);
      else if (data[0]) toast.error(data[0].message);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Reveal>
        <Box
          component={Paper}
          sx={{
            boxShadow: "0px 4px 20px 2px rgba(0, 0, 0, 0.25)",
            borderRadius: "30px",
            px: { xs: "25px", md: "30px" },
            py: { xs: "25px", md: "50px" },
            width: { xs: "310px", sm: "420px", md: "450px", xl: "520px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "black", mb: { xs: "5px", md: "20px" }, mt: "5px" }}
          >
            Create your wallet
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Select
              value={walletType}
              sx={{
                width: "100%",
              }}
              onChange={(e: SelectChangeEvent) => {
                setWalletType(e.target.value as string);
              }}
            >
              <MenuItem value="ethereum">Ethereum</MenuItem>
            </Select>
            <Button
              sx={{
                background: "linear-gradient(90deg, #FC9BB3 0%, #7673FE 100%)",
                boxShadow: "0px 4px 10px 1px #00000040",
                borderRadius: "10px",
                width: "100%",
                height: "50px",
                my: "20px",
              }}
              type="submit"
            >
              {isLoading ? (
                <CircularProgress size={30} sx={{ color: "#f3f3f3" }} />
              ) : (
                <Typography
                  sx={{
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#FFFFFF",
                  }}
                >
                  Create Wallet
                </Typography>
              )}
            </Button>
          </Box>
        </Box>
      </Reveal>
    </Box>
  );
}

export default CreateWalletPage;
