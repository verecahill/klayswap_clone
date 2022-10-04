// action type
const SET_FROM_ADDRESS = "token/SET_FROM_ADDRESS";
const SET_KLAY_KETH_AMOUNT = "token/SET_KLAY_KETH_AMOUNT";
const SET_ESTIMATED_KETH_AMOUNT = "token/SET_ESTIMATED_KETH_AMOUNT";
const SET_EXCHANGE_KLAY_AMOUNT = "token/SET_EXCHANGE_KLAY_AMOUNT";

// actions
export const setFromAddress = (address) => {
  return { type: SET_FROM_ADDRESS, address };
};

export const setKlayKEthAmount = (klay, kEth) => {
  return { type: SET_KLAY_KETH_AMOUNT, klay, kEth };
};

export const setEstimatedKethAmount = (estimatedKEth) => {
  return { type: SET_ESTIMATED_KETH_AMOUNT, estimatedKEth };
};

export const setExchangeKlayAmount = (exchangeKlayAmount) => {
  return { type: SET_EXCHANGE_KLAY_AMOUNT, exchangeKlayAmount };
};

// Reducer
const initialState = {
  fromAddress: "",
  klay: 0,
  kEth: 0,
  estimateKEth: 0,
  exchangeKlayAmount: 0,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FROM_ADDRESS:
      return { ...state, fromAddress: action.address };
    case SET_KLAY_KETH_AMOUNT:
      return { ...state, klay: action.klay, kEth: action.kEth };
    case SET_ESTIMATED_KETH_AMOUNT:
      return { ...state, estimatedKEth: action.estimatedKEth };
    case SET_EXCHANGE_KLAY_AMOUNT:
      return { ...state, exchangeKlayAmount: action.exchangeKlayAmount };
    default:
      return state;
  }
}
