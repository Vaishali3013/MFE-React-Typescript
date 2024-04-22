import {
  ADD_DASHBOARD_URL_FAILURE,
  ADD_DASHBOARD_URL_SUCCESS,
  DELETE_DASHBOARD_URL_FAILURE,
  DELETE_DASHBOARD_URL_SUCCESS,
  GET_REPORTING_LIST_SUCCESS,
  UPDATE_DASHBOARD_URL_FAILURE,
  UPDATE_DASHBOARD_URL_SUCCESS,
} from "redux/types/dashboardReportingTypes";
import initialState from "../initialStates";

export default function dashboardReportingReducers(
  state = initialState.dataExplorer,
  action: any
): any {
  switch (action.type) {
    case ADD_DASHBOARD_URL_SUCCESS:
      state = {
        ...state,
        dashboardReporting: {
          ...state.dashboardReporting,
          createDashboardUrl: true,
        },
      };
      return state;
    case ADD_DASHBOARD_URL_FAILURE:
      state = {
        ...state,
        dashboardReporting: {
          ...state.dashboardReporting,
          createDashboardUrl: false,
        },
      };
      return state;
    case GET_REPORTING_LIST_SUCCESS:
      state = {
        ...state,
        dashboardReporting: {
          ...state.dashboardReporting,
          reportingList: action.response,
        },
      };
      return state;
    case UPDATE_DASHBOARD_URL_SUCCESS:
      state = {
        ...state,
        dashboardReporting: {
          ...state.dashboardReporting,
          updateDashboardUrl: true,
        },
      };
      return state;
    case UPDATE_DASHBOARD_URL_FAILURE:
      state = {
        ...state,
        dashboardReporting: {
          ...state.dashboardReporting,
          updateDashboardUrl: false,
        },
      };
      return state;
    case DELETE_DASHBOARD_URL_SUCCESS:
      state = {
        ...state,
        dashboardReporting: {
          ...state.dashboardReporting,
          deleteDashboardUrl: true,
        },
      };
      return state;
    case DELETE_DASHBOARD_URL_FAILURE:
      state = {
        ...state,
        dashboardReporting: {
          ...state.dashboardReporting,
          deleteDashboardUrl: false,
        },
      };
      return state;
    default:
      return state;
  }
}
