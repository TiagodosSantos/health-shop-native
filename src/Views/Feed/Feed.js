import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  StatusBar,
  Platform,
} from "react-native";
import { Spinner } from 'native-base';
import { Header } from '../../Components/Header';
import AsyncStorage from "@react-native-community/async-storage";
import { Product } from '../../Components/Product';


import {
  loadProducts, 
  removeProductRequest, 
  updateProductRequest, 
  sendMessage,
} from '../../api/products';

import {
  getProductsLoading,
  getAllProducts,
  getAllMessages,
} from '../../Selectors/selectors';

const Feed = ({ 
    products = [], 
    onRemovePressed, 
    onUpdatePressed,
    isLoading, 
    message, 
    startLoadingProducts,
    onSetMessagePressed,
  }) => {

  const [user, setUser] = useState("Não logado");
  let mounted = false;

  useEffect(() => {
    mounted = true;
    startLoadingProducts();

    return () => {
      mounted = false;
    };
  }, []);


  useEffect(() => {
    async function getUser(){
      const authUser =  await AsyncStorage.getItem("auth-user");
      setUser(authUser);
    }
    getUser();
  }, []);

  useEffect(() => {
    if(message.open){
        alert(message.text);
        onSetMessagePressed({
          open: false,
          text: null,
          tipo: 'success',
          loading: false,
      });
    }
 });


  return (
    <>
    <StatusBar
            backgroundColor="white"
                 barStyle="dark-content"
          />
            
        <Header userName={user}
            urlImage={"https://lh3.googleusercontent.com/ogw/ADGmqu_rn1GjllidLMqKfEOvkHl57qdRxIPzSBwKlQEb=s64-c-mo"}/>

      {message.loading ? <Spinner /> : null }
      {isLoading ? <Spinner /> :
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
            <Fragment>
              <Product
                id={item.id}
                title={item.title}
                type={item.type}
                price={item.price}
                createdAt={item.createdAt}
                filename={item.filename}
                rating={item.rating}
                description={item.description}
                mounted = {mounted}
                onRemovePressed = {onRemovePressed}
              />
            </Fragment>}
        />}
    </>
  )
};


Feed.navigationOptions = ({ navigation }) => {
  const opcoes = {
    //title: navigation.getParam("name")
  }
  if(Platform.OS == "android"){
    opcoes.headerShown = false;
  }
  

  return opcoes;
}



const mapStateToProps = state => ({
  isLoading: getProductsLoading(state),
  products: getAllProducts(state),
  message: getAllMessages(state),
});

const mapDispatchToProps = dispatch => ({
  onRemovePressed: id => dispatch(removeProductRequest(id)),
  onUpdatePressed: (id, product) => dispatch(updateProductRequest(id, product)),
  startLoadingProducts: () => dispatch(loadProducts()),
  onSetMessagePressed: (message) => dispatch(sendMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
