import React, { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { getAccessTokenFromLocalStorage } from "@/localstorage/accessTokenStorage";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage();
    if (!accessToken) {
      router.push("/auth/sign-in");
    }
  }, []);

  return <>{children}</>;
};

export default RequireAuth;
