import { AuthServices } from "../(services)/AuthServices";

export class commonServices{

    static ApiHeader(){
        return {headers:{Authorization:`Bearer ${AuthServices.GetToken()}`}}
    }

}