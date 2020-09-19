import React, { Fragment } from 'react';
import {
    Text,
    Image,
    View
} from "react-native";
import style from "./style"

const Header = ({ userName , urlImage}) => {
    return (
        <View style={style.header}>
            <Image
                source={{ uri: urlImage}}
                style={style.userPhoto}
            />
            <Text>{userName}</Text>
        </View>
    );
}

export default Header;