import React from "react";
import { UserModel } from "../clients/clients";

interface IAccountContextProps {
    user?: UserModel;
    setUser: (user: UserModel) => void;
}

export const AccountContext = React.createContext<IAccountContextProps>({ setUser: (_user: UserModel) => { } });