import {StyleSheet, Dimensions} from "react-native"

const largura = Dimensions.get("screen").width;
const style = StyleSheet.create({
    container:{
        flexGrow:2,
        justifyContent:"center",
        alignItems:"center"
    },
    inputs:{
        width:largura*0.8,
        textAlign:"center",
        marginTop:40,
        fontSize:30
    },
    viewButton:{
        alignItems:"center",
        marginBottom:50,
    }
})
export default style;