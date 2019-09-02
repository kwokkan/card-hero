import React from "react";
import AccountModel from "../models/AccountModel";

interface IAccountContextProps {
    user?: AccountModel;
    setUser: (user: AccountModel) => void;
}

export const AccountContext = React.createContext<IAccountContextProps>({ setUser: (_user: AccountModel) => { } });