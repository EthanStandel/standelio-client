import * as _ from "lodash";
import axios from "axios";
import React, { Dispatch, useState } from "react";
import { environment } from "../config.json";

export enum Authenticator {
    Google = "Google"
}

export class GardenService {

    private readonly url = environment.gardenServiceUrl;

    private authenticationHeaders = {
        Authorization: `Bearer ${this.accessToken}`,
        Authenticator: this.authenticator
    }

    public constructor(
        private readonly accessToken: string,
        private readonly authenticator: Authenticator = Authenticator.Google
    ) {}

    public validateAuth(): Promise<void> {
        return axios.get(
            `${this.url}/authentication/validate-token`,
            { headers: this.authenticationHeaders } 
        )
    }

}

export namespace GardenServiceProvider {

    type HookContext = [GardenService | undefined, Dispatch<GardenService | undefined>];

    const Context = React.createContext([undefined, _.noop] as HookContext);

    export const useGardenService = () => {
        return React.useContext(Context);
    }

    export const Component: React.FC = ({ children }) => {
        const gardenServiceState = useState<undefined | GardenService>(undefined);
        
        return (
            <Context.Provider 
                value={gardenServiceState}
                children={children}
            />
        );
    }

    
}
