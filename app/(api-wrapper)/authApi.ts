import axios from "axios";

export class authApi{

    static async UserLogin(Data:any){
        try {
            const response = await axios.post('/api/user/login', Data);
            localStorage.setItem('userDetails', JSON.stringify(response.data.data));
            return Promise.resolve({status:response.status,data:response.data.data});
          } catch (error:any) {

            return Promise.reject({status:error.response.status,data:error.response.data})
          }
    }

    static async UserSignUp(Data:any){
      try {
        const response = await axios.post('/api/user/signUp', Data);
        localStorage.setItem('userDetails', JSON.stringify(response.data.data));
        return Promise.resolve({status:response.status,data:response.data.data});
      } catch (error:any) {
        return Promise.reject({status:error.response.status,data:error.response.data})
      }
    }
}