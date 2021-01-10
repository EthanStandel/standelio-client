import axios from "axios";

export enum Authenticator {
    Google = "Google"
}

export class GardenService {

    private readonly url = "http://localhost:4000";

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
            `${this.url}/validate-token`,
            { headers: this.authenticationHeaders } 
        )
    }

}