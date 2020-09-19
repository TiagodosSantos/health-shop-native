import React, {Fragment , useState} from 'react';
import {
  Text,
  TextInput,
  Button,
  View,
  Platform

} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import style from "./style";
import {default as loginApi} from '../../api/login';

const Login = ({ navigation }) => {

const [user, setUser] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("")

  const login = async ()=> {
    try{
      const {token, type} = await loginApi(user, password);
      await AsyncStorage.setItem("auth-token", type+" "+token);
      await AsyncStorage.setItem("auth-user", user);
      //Navigate to feed screen
      navigation.replace("Feed",{ name : user })

    }catch(error){
      setMessage(error.message)
    }
   
  }
  
  return (
    <Fragment>
      <View style={style.container}>
        <TextInput 
          style={style.inputs}
          placeholder="Email"
          onChangeText={text => setUser(text)}
         />
         <TextInput 
          style={style.inputs}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
         />
         <Text>{message}</Text>
      </View>

      <View style={style.viewButton}>
        <Button title="Login" onPress={login}/>
      </View>
    </Fragment>
    

  )
};

Login.navigationOptions = () => {
  const opcoes = {
    title:"Login"
  }
  if(Platform.OS == "android"){
    opcoes.headerShown = null
  }
  

  return opcoes;
}
export default Login;
