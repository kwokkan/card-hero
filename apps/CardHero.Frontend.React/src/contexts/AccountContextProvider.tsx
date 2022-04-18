import { ProviderProps, useContext, useState } from "react";
import { IUserModel } from "../clients/clients";
import { AccountContext, IAccountContextProps } from "./AccountContext";

export interface IAccountContextProviderProps {
    user?: IUserModel;
}

interface IAccountContextProviderState {
    user?: IUserModel;
}

function AccountContextProvider(props: ProviderProps<IAccountContextProviderProps>): JSX.Element {
    const [state, setState] = useState<IAccountContextProviderState>({
        user: props.value.user
    });

    const contextProps: IAccountContextProps = {
        setUser: (user) => {
            setState({
                user: user
            });
        },
        user: state.user
    };

    return (
        <AccountContext.Provider
            value={contextProps}
            children={props.children}
        />
    );
}

function useAccountContext() {
    return useContext(AccountContext);
}

function useAccountContextConsumer() {
    return AccountContext.Consumer;
}

export { AccountContextProvider, useAccountContext, useAccountContextConsumer };
