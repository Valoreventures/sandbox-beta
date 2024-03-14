import Header from "../components/Header"
import Login from "../components/Login"

export default function LoginPage(){

    //Handle Login API Integration here
    // const authenticateUser = () =>{
        
       
    //     const endpoint=`https://api.loginradius.com/identity/v2/auth/login?apikey=${apiKey}`;
    //      fetch(endpoint,
    //          {
    //          method:'POST',
    //          headers: {
    //          'Content-Type': 'application/json'
    //          },
    //          body:JSON.stringify(loginFields)
    //          }).then(response=>response.json())
    //          .then(data=>{
    //             //API Success from LoginRadius Login API
    //          })
    //          .catch(error=>console.log(error))
         
    // }

    return(
        <>
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login/>
        </>
    )
}