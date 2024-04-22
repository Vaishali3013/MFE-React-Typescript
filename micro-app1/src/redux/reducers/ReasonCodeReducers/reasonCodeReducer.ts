import {
  DEFAULT_REASON_CODE_VALUE,
  DEFAULT_REASON_FACTORY_VALUE,
  GET_ALL_DOWNTIMES,
  GET_ALL_DOWNTIMES_FAIL,
  GET_ALL_DOWNTIMES_SUCCESS,
  GET_ALL_REASON_CATEGORY_SUCCESS,
  GET_ALL_REASON_CODE_SUCCESS,
  GET_ALL_REASON_FACTOR_SUCCESS,
  GET_REASON_CODE_NODE_DETAILS,
  GET_REASON_CODE_NODE_DETAILS_FAIL,
  GET_REASON_CODE_NODE_DETAILS_SUCCESS,
  SET_REASON_CODE_SUCCESS,
} from "redux/types/reasonCodeTypes";
import initialState from "../initialStates";

export default function reasonCodeReducer(
  state = initialState.reasonCode,
  action: any
): any {
  switch (action.type) {
    case GET_ALL_DOWNTIMES:
      state = {
        ...state,
        downTimesListLoading: true,
      };
      return state;
    case GET_ALL_DOWNTIMES_SUCCESS:
      state = {
        ...state,
        downTimesListLoading: false,
        downTimesList: action.response.data,
        createReasonCode: false,
      };
      return state;
    case GET_ALL_DOWNTIMES_FAIL:
      state = {
        ...state,
        downTimesListLoading: false,
        downTimesList: action?.response?.data,
      };
      return state;
    case GET_ALL_REASON_CATEGORY_SUCCESS:
      state = {
        ...state,
        reasonCategory: action.response.data,
      };
      return state;
    case GET_ALL_REASON_CODE_SUCCESS:
      state = {
        ...state,
        reasonCode: action.response.data,
      };
      return state;
    case GET_ALL_REASON_FACTOR_SUCCESS:
      state = {
        ...state,
        reasonFactor: action.response.data,
      };
      return state;
    case SET_REASON_CODE_SUCCESS:
      state = {
        ...state,
        createReasonCode: true,
      };
      return state;
    case DEFAULT_REASON_CODE_VALUE:
      state = {
        ...state,
        reasonCode: [],
      };
      return state;
    case DEFAULT_REASON_FACTORY_VALUE:
      state = {
        ...state,
        reasonFactor: [],
        reasonCode: [],
      };
      return state;
    case GET_REASON_CODE_NODE_DETAILS:
      state = {
        ...state,
        nodeDetailsLoading: true,
      };
      return state;
    case GET_REASON_CODE_NODE_DETAILS_SUCCESS:
      state = {
        ...state,
        nodeDetailsLoading: false,
        nodeDetails: action.response.data,
      };
      return state;
    case GET_REASON_CODE_NODE_DETAILS_FAIL:
      state = {
        ...state,
        nodeDetailsLoading: false,
        nodeDetails: action?.response?.data,
      };
      return state;
    default:
      return state;
  }
}
