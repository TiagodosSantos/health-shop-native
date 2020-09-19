const login =  async (email, password) =>{
    let url = "10.0.2.2";
    if(Platform.OS == "ios"){
        url = "localhost";
    }
    
    const headerHTTP = {
        method:"POST",
        body:JSON.stringify({
            email,
            password
        }),
        headers:{
            "Content-type" : "application/json"
        }
    }
    const resp = await fetch(`http://${url}:8080/store/auth`, headerHTTP);
    
    if(resp.ok){
        return resp.json();
    }else{
        throw new Error("Não foi possível logar");
    }
   
}

export default login;