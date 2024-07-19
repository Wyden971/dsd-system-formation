import { ReactNode, useReducer } from "react";
import { UserContext, TUserContext } from "./UserContext";
import { User } from "@/models";
import { useUserRepository } from "@/hooks";
import { createUser, deleteUser, getUsers, updateUser } from "@/services/api";

export type Props = {
  children: ReactNode;
};

export enum UserActionTypes {
  SET_USER = "SET_USER",
  ADD_USER = "ADD_USER",
  UPDATE_USER = "UPDATE_USER",
  DELETE_USER = "DELETE_USER",
}

export const UserContextProvider = ({ children }: Props) => {
  const { select, insert, remove, update } = useUserRepository();

  const [state, dispatch] = useReducer(
    (state: TUserContext, action: any) => {
      switch (action.type) {
        case UserActionTypes.SET_USER:
          return {
            ...state,
            users:
              action.page === 1
                ? action.users
                : [...state.users, ...action.users],
          };

        case UserActionTypes.ADD_USER:
          return {
            ...state,
            users: [...state.users, action.user],
          };

        case UserActionTypes.UPDATE_USER:
          return {
            ...state,
            users: state.users.map((user) =>
              user.id === action.user.id ? action.user : user
            ),
          };

        case UserActionTypes.DELETE_USER:
          return {
            ...state,
            users: state.users.filter((user) => user.id !== action.user.id),
          };
      }
      return {
        ...state,
      };
    },
    {
      users: [],

      getUsers: (page = 1) => {
        return getUsers(page)
          .then(({ data, cached }) => {
            console.log("cached : ", cached);
            return data;
          })
          .then((users) => {
            dispatch({
              type: UserActionTypes.SET_USER,
              users,
              page,
            });
            return users;
          });
      },

      setUsers: (users: TUserContext["users"]) => {
        dispatch({
          type: UserActionTypes.SET_USER,
          users,
        });
      },

      addUser: (user: User) => {
        return createUser(user)
          .then(({ data }) => data)
          .then((createdUser) => {
            dispatch({
              type: UserActionTypes.ADD_USER,
              user: createdUser,
            });
            return createdUser;
          });
      },

      updateUser: (user: User) => {
        return updateUser(user)
          .then(({ data }) => data)
          .then((updatedUser) => {
            dispatch({
              type: UserActionTypes.UPDATE_USER,
              user: updatedUser,
            });
            return updatedUser;
          });
      },

      deleteUser: (user: User) => {
        return deleteUser(user.id.toString()).then(() => {
          dispatch({
            type: UserActionTypes.DELETE_USER,
            user,
          });
        });
      },
    }
  );

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
