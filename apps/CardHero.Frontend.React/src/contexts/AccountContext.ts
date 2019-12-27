import React from "react";
import { IUserModel } from "../clients/clients";

export interface IAccountContextProps {
    user?: IUserModel;
    setUser: (user: IUserModel) => void;
}

export const AccountContext = React.createContext<IAccountContextProps>({ setUser: (_user: IUserModel) => { } });
