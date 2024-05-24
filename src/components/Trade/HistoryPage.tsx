import { getAccessTokenFromLocalStorage } from "@/localstorage/accessTokenStorage";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Reveal from "../Reveal";

function HistoryPage() {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const a = async () => {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

      const res = await fetch(`${BACKEND_URL}/trade/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        },
      });

      const status = await res.status;

      const data = await res.json();

      if (status === 200) {
        setHistories(data.tradeHistories);
      } else {
        if (data?.message) toast.error(data.message);
        else if (data?.error?.message) toast.error(data.error.message);
        else if (data?.error) toast.error(data.error);
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
        width: { xs: "90%", md: "100%" },
        position: "relative",
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: "120px",
          fontWeight: "600",
          fontSize: "22px",
        }}
      >
        Trade History
      </Typography>
      {histories[0] ? (
        <Reveal>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell align="right">From</TableCell>
                  <TableCell align="right">To</TableCell>
                  <TableCell align="right">Network</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Tx Hash</TableCell>
                  <TableCell align="right">Tx Time</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {histories.map((history: any) => (
                  <TableRow
                    key={history._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {history.amount}
                    </TableCell>
                    <TableCell align="right">{history.fromCoin}</TableCell>
                    <TableCell align="right">{history.toCoin}</TableCell>
                    <TableCell align="right">{history.network}</TableCell>
                    <TableCell align="right">{history.status}</TableCell>
                    <TableCell align="right">{history.tx}</TableCell>
                    <TableCell align="right">{history.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Reveal>
      ) : (
        <CircularProgress size={30} sx={{ color: "#f3f3f3" }} />
      )}
    </Box>
  );
}

export default HistoryPage;
