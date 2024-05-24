import { Box } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import Header from "@/components/Header";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  GeneralValueType,
  setWalletAddressInSystem,
} from "@/store/slices/generalSlice";
import Models from "../Models";
import { ReturnedUserType } from "@/types/User";
import {
  deleteAccessTokenFromLocalStorage,
  getAccessTokenFromLocalStorage,
} from "@/localstorage/accessTokenStorage";
import { deleteRefreshTokenFromLocalStorage } from "@/localstorage/refreshTokenStorage";

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const generalValues: GeneralValueType = useSelector(
    (state: RootState) => state.general.value
  ) as GeneralValueType;
  const [user, setUser] = useState<ReturnedUserType | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {}, [generalValues.currentNetwork]);

  useEffect(() => {
    const a = async () => {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

      const res = await fetch(`${BACKEND_URL}/user/getUserById`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
      } else {
        if (
          data?.error?.message === "JWT Token Expired" ||
          data?.error?.message === "jwt expired"
        ) {
          deleteAccessTokenFromLocalStorage();
          deleteRefreshTokenFromLocalStorage();
        }
      }
    };

    if (typeof window !== "undefined") {
      if (getAccessTokenFromLocalStorage()) {
        a();
      }
    }
  }, [generalValues.walletAddress]);

  useEffect(() => {
    const a = async () => {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

      const res = await fetch(`${BACKEND_URL}/wallet/getWalletByUserId`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        },
      });

      const status = await res.status;

      const data = await res.json();

      if (status === 200) {
        dispatch(setWalletAddressInSystem(data.walletAddress));
      } else {
        if (
          data?.error?.message === "JWT Token Expired" ||
          data?.error?.message === "jwt expired"
        ) {
          deleteAccessTokenFromLocalStorage();
          deleteRefreshTokenFromLocalStorage();
        }
      }
    };

    if (typeof window !== "undefined") {
      if (getAccessTokenFromLocalStorage()) {
        a();
      }
    }
  }, [generalValues?.walletAddressInSystem]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        paddingBottom: "30px",
        height: "100%",
      }}
    >
      <Header />
      <>{children}</>

      {user?._id ? <Models {...{ user }} /> : null}
    </Box>
  );
}
