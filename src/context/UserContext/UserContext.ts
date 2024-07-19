import { User } from "@/models";
import { createContext } from "react";

export type TUserContext = {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (user: User) => void;
  getUsers: (page?: number) => Promise<User[]>;
};
export const UserContext = createContext<TUserContext>({} as TUserContext);
