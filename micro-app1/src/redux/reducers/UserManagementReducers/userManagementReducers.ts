import * as types from "redux/types/userManagementTypes";
import initialState from "../initialStates";

export default function userManagementReducer(
  state = initialState.userManagement,
  action: any
): any {
  switch (action.type) {
    case types.GET_USERS_LIST:
      state = {
        ...state,
        users: {
          ...state.users,
          userListLoading: true,
        },
      };
      return state;
    case types.GET_USERS_LIST_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          usersList: action.response.data,
          userListLoading: false,
        },
      };
      return state;
    case types.GET_USERS_LIST_FAILURE:
      state = {
        ...state,
        users: {
          ...state.users,
          userListLoading: false,
        },
      };
      return state;
    case types.COUNT_ANALYTICS_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          countDetails: action.response.data,
        },
      };
      return state;

    case types.GET_ROLES_LIST:
      state = {
        ...state,
        roles: {
          ...state.roles,
          rolesListLoading: true,
        },
      };
      return state;
    case types.GET_ROLES_LIST_SUCCESS:
      state = {
        ...state,
        roles: {
          ...state.roles,
          rolesList: action.response.data,
          createRoleState: false,
          updateRole: false,
          rolesListLoading: false,
        },
      };
      return state;
    case types.GET_ROLES_LIST_FAILURE:
      state = {
        ...state,
        roles: {
          ...state.roles,
          rolesListLoading: false,
        },
      };
      return state;
    case types.GET_ALL_USERS_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          allUsersList: action.response.data,
        },
      };
      return state;
    case types.GET_ALL_ROLES_SUCCESS:
      state = {
        ...state,
        roles: {
          ...state.roles,
          allRolesList: action.response.data,
        },
      };
      return state;
    case types.SET_ROLE_LIST_SUCCESS:
      state = {
        ...state,
        roles: {
          ...state.roles,
          createRoleState: true,
        },
      };
      return state;
    case types.UPDATE_ROLE_LIST_SUCCESS:
      state = {
        ...state,
        roles: {
          ...state.roles,
          updateRole: true,
        },
      };
      return state;
    case types.GET_ROLE_DETAIL_SUCCESS:
      state = {
        ...state,
        roles: {
          ...state.roles,
          roleDetails: action.response.data,
        },
      };
      return state;
    case types.SET_EDIT_ROLE_STATE:
      state = {
        ...state,
        roles: {
          ...state.roles,
          editRoleState: action.payload,
          resourcePermissionListPayload: [],
          resourceTypeSubItemsList: [],
          usersRoleListPayload: [],
        },
      };
      return state;
    case types.SET_ROLE_DATA:
      state = {
        ...state,
        roles: {
          ...state.roles,
          roleData: action.payload,
        },
      };
      return state;
    case types.GET_USER_DETAIL_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          userDetails: action.response.data,
          editUser: false,
          editPreferences: false,
        },
      };
      return state;
    case types.GET_LOGIN_USER_DETAILS_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          loggedInUserDetails: action.response.data,
          editUser: false,
          editPreferences: false,
        },
      };
      return state;
    case types.GET_USER_PREFERENCES_LIST_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          userPreferences: action.response.data,
        },
      };
      return state;
    case types.UPDATE_USER_DETAILS_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          editUser: true,
        },
      };
      return state;
    case types.UPDATE_USER_PREFERENCES_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          editPreferences: true,
        },
      };
      return state;
    case types.EDIT_USER_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          isUserEdited: true,
        },
      };
      return state;

    case types.GET_GROUPS_LIST:
      state = {
        ...state,
        groups: {
          ...state.groups,
          groupListLoading: true,
        },
      };
      return state;

    case types.GET_GROUPS_LIST_SUCCESS:
      state = {
        ...state,
        groups: {
          ...state.groups,
          groupsList: action.response.data,
          groupListLoading: false,
        },
      };
      return state;

    case types.GET_GROUPS_LIST_FAILURE:
      state = {
        ...state,
        groups: {
          ...state.groups,
          groupListLoading: false,
        },
      };
      return state;

    case types.GET_ALL_GROUPS_SUCCESS:
      state = {
        ...state,
        groups: {
          ...state.groups,
          allGroupsData: action.response.data,
        },
      };
      return state;

    case types.ADD_GROUPS_SUCCESS:
      state = {
        ...state,
        groups: {
          ...state.groups,
          isCreated: true,
          isCreatedResponse: action.response.data,
        },
      };
      return state;

    case types.EDIT_GROUP_SUCCESS:
      state = {
        ...state,
        groups: {
          ...state.groups,
          isEdited: true,
        },
      };
      return state;

    case types.EDIT_GROUP_FAILURE:
      state = {
        ...state,
        groups: {
          ...state.groups,
          resourceSubItemsResponse: action.error.message,
        },
      };
      return state;
    case types.REMOVE_EDIT_GROUP:
      state = {
        ...state,
        groups: {
          ...state.groups,
          resourceSubItemsResponse: null,
        },
      };
      return state;
    case types.DEACTIVATE_GROUP_SUCCESS:
      state = {
        ...state,
        groups: {
          ...state.groups,
          isDeactivated: true,
        },
      };
      return state;

    case types.GET_GROUP_BY_GROUPID_SUCCESS:
      state = {
        ...state,
        groups: {
          ...state.groups,
          dataByGroupId: action.response.data,
        },
      };

      return state;

    case types.GET_RESOURCE_TYPE_SUCCESS:
      state = {
        ...state,
        groups: {
          ...state.groups,
          resourceType: action.response.data,
        },
      };

      return state;

    case types.GET_RESOURCEBYTYPE_BY_RESOURCEID_SUCCESS:
      state = {
        ...state,
        groups: {
          ...state.groups,
          resourceTypeDataById: action.response.data,
        },
      };

      return state;

    case types.SET_RESOURCE_TYPE_PAYLOAD: {
      state = {
        ...state,
        roles: {
          ...state.roles,
          resourcePermissionListPayload: action.payload,
        },
      };

      return state;
    }

    case types.SET_USERS_ROLE_PAYLOAD: {
      state = {
        ...state,
        roles: {
          ...state.roles,
          usersRoleListPayload: action.payload,
        },
      };
      return state;
    }

    case types.SET_RESOURCE_TYPE_SUBITEMS: {
      state = {
        ...state,
        roles: {
          ...state.roles,
          resourceTypeSubItemsList: [
            ...state.roles.resourceTypeSubItemsList,
            ...action.payload,
          ],
        },
      };
      return state;
    }

    case types.REMOVE_RESOURCE_TYPE_SUBITEMS: {
      const payloadResourceIds = action.payload.map(
        (record: any) => record.resourceId
      );

      const indexToRemove = state.roles.resourceTypeSubItemsList.findIndex(
        (record: any) => payloadResourceIds.includes(record.resourceId)
      );

      if (indexToRemove !== -1) {
        const filteredArray = [...state.roles.resourceTypeSubItemsList];
        filteredArray.splice(indexToRemove, 1); // Remove one element at the found index

        state = {
          ...state,
          roles: {
            ...state.roles,
            resourceTypeSubItemsList: filteredArray,
          },
        };
      }
      return state;
    }
    case types.GET_RESOURCE_TYPE_DETAILS_SUCCESS:
      state = {
        ...state,
        roles: {
          ...state.roles,
          resourceTypeDetails: action.response.data,
          resourceTypeSubItemsList: [],
        },
        groups: {
          ...state.groups,
          isDeactivated: true,
        },
      };
      return state;
    case types.GET_LOGIN_USER_PERMISSION_LIST:
      state = {
        ...state,
        users: {
          ...state.users,
          loggedInUserScreenPermissionList: action.payload,
        },
      };
      return state;
    case types.GET_ALL_REPORTING_ROLES_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          reportingRolesList: action.response.data.roles,
        },
      };
      return state;
    case types.GET_ALL_REPORTING_DASHBOARD_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          reportingDashbaordList: action.response.data,
        },
      };
      return state;
    case types.DASHBOARD_EMBEDDED_UUID_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          dashboardEmbeddedUuid: action.response.data,
        },
      };
      return state;
    case types.DASHBOARD_EMBEDDED_UUID_FAILED:
      state = {
        ...state,
        users: {
          ...state.users,
          dashboardEmbeddedUuid: null,
        },
      };
      return state;
    default:
      return state;
  }
}
