import { createSlice } from "@reduxjs/toolkit";

export interface GeneralValueType {
  walletAddress: string;
  walletAddressInSystem: string;
  currentNetwork: string;
  currentToken: string;
  currentBalance: number;
  amountOfPay: string;
  openModal2: boolean;
}

export interface GeneralState {
  value: GeneralValueType;
}

const initialState: GeneralState = {
  value: {
    walletAddress: "",
    walletAddressInSystem: "",
    currentNetwork: "bsc",
    currentToken: "binancecoin",
    currentBalance: 0,
    amountOfPay: "0",
    openModal2: false,
  },
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setCurrentNetwork: (state, action) => {
      state.value.currentNetwork = action.payload;
    },
    setWalletAddress: (state, action) => {
      state.value.walletAddress = action.payload;
    },
    setWalletAddressInSystem: (state, action) => {
      state.value.walletAddressInSystem = action.payload;
    },
    setCurrentToken: (state, action) => {
      state.value.currentToken = action.payload;
    },
    setCurrentBalance: (state, action) => {
      state.value.currentBalance = action.payload;
    },
    setAmountOfPay: (state, action) => {
      state.value.amountOfPay = action.payload;
    },

    setOpenModal2: (state, action) => {
      state.value.openModal2 = action.payload;
    },
  },
});

export const {
  setCurrentBalance,
  setCurrentNetwork,
  setCurrentToken,
  setWalletAddress,
  setWalletAddressInSystem,
  setAmountOfPay,
  setOpenModal2,
} = generalSlice.actions;

export default generalSlice.reducer;
