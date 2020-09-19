import React, { Fragment, useState } from 'react';
import { Image, View } from 'react-native';
import {  Card, CardItem, Text, Button, Left, Right, Body } from 'native-base';
import { Rating } from 'react-native-ratings';
import AsyncStorage from "@react-native-community/async-storage";

import style from './style';

const Product = ({ 
    id,
    title,
    type,
    filename,
    rating,
    price,
    createdAt,
    description,
    mounted,
    onRemovePressed}) => {

    return (
        <Fragment>
                <Card style={{flex: 0}}>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text style={{ fontSize: 35, fontWeight: "900" }}>{title}</Text>
                                <Text style={{ fontSize: 26, fontWeight: "600" }}>{type}</Text>
                                <Text>{description}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={require(`../../../res/img/0.jpg`)} style={{height: 200, width: 200, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text style={{ fontSize: 25, fontWeight: "800" }}>$ {price}</Text>
                        </Left>
                        <Right>
                            {!mounted ? null : 
                                <Rating
                                        readonly={true}
                                        startingValue={rating}
                                />
                            }
                            
                            <Text note style={{marginTop: 8}}>Created at: {createdAt}</Text>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Left />
                        <View style={style.view}>
                            <Button style={{marginLeft: 8}} rounded danger onPress={() => onRemovePressed(id)} >
                                <Text>Remover</Text>
                            </Button>
                        </View>
                    </CardItem>
                </Card>
      </Fragment>
    )
};

export default Product;