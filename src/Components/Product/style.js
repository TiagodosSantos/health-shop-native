import { StyleSheet, Dimensions } from "react-native";

const largura = Dimensions.get("screen").width;

const style = StyleSheet.create({
    image: {
        width: largura,
        height: largura
    },
    view:{
        flexDirection:"row",
        alignItems: "center"
    }
})

export default style;