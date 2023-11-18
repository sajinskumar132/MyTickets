export class AuthServices{

    static GetToken=()=>{
        let token;
        const LocalData=localStorage.getItem('userDetails')
        if(LocalData) {
            let ParseData=JSON.parse(LocalData)
            token=ParseData.token
        }
        return token
    }


    static GetUserDetails=()=>{
        let userDetails={
            userName:'',
            email:''
        }
        const LocalData=localStorage.getItem('userDetails')
        if(LocalData) {
            let ParseData=JSON.parse(LocalData)
            userDetails.userName=ParseData.userName
            userDetails.email=ParseData.email
        }
        return userDetails
    }
}