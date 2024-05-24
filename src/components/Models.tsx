import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { GeneralValueType, setOpenModal2 } from "@/store/slices/generalSlice";
import { toast } from "react-toastify";
import copy from "clipboard-copy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Image from "next/image";
import { ReturnedUserType } from "@/types/User";

interface Props {
  user: ReturnedUserType;
}

const Models: React.FC<Props> = ({ user }: Props) => {
  const generalValues: GeneralValueType = useSelector(
    (state: RootState) => state.general.value
  ) as GeneralValueType;

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Modal
        open={generalValues.openModal2}
        onClose={() => dispatch(setOpenModal2(false))}
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 320,
            bgcolor: "rgb(26,27,31)",
            p: 2,
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                background: "#333",
                borderRadius: "100%",
                p: "3px",
                width: "22px",
                height: "22px",
                cursor: "pointer",
              }}
              onClick={() => {
                dispatch(setOpenModal2(false));
              }}
            >
              <CloseIcon
                sx={{
                  color: "#888",
                  width: "16px",
                  height: "16px",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src="https://www.gravatar.com/avatar/goldencobra?d=identicon"
              alt=""
              style={{
                borderRadius: "100%",
                objectFit: "contain",
              }}
              width={70}
              height={70}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              my: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#fff",
              }}
            >
              {generalValues?.walletAddressInSystem?.slice(0, 5)}
              ...
              {generalValues?.walletAddressInSystem?.slice(
                generalValues?.walletAddressInSystem?.length - 4,
                generalValues?.walletAddressInSystem?.length
              )}
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#999",
              }}
            >
              {generalValues.currentBalance}{" "}
              {generalValues.currentNetwork === "bsc" ? "BNB" : "ETH"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              mt: "10px",
              borderRadius: "10px",
              boxShadow: "none",
              background: "#333",
              p: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#fff",
                  mb: "10px",
                }}
              >
                Your Name
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#fff",
                    ml: "10px",
                  }}
                >
                  {user?.name}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mt: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#fff",
                  mb: "10px",
                }}
              >
                Your Email
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#fff",
                    ml: "10px",
                  }}
                >
                  {user?.email}
                </Typography>
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
              mt: "10px",
              height: "60px",
              borderRadius: "10px",
              boxShadow: "none",
              background: "#333",
              "&:hover": {
                background: "#444",
              },
            }}
            onClick={() => {
              copy(generalValues?.walletAddressInSystem);
              toast.success("Address successfully copied");
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <ContentCopyIcon
                sx={{
                  width: "15px",
                  height: "15px",
                }}
              />
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "600",
                  mt: "5px",
                }}
              >
                Copy Address
              </Typography>
            </Box>
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Models;
