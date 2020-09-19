import { 
    removeProduct,
    updateProduct,
    loadProductsInProgress, 
    loadProductsSuccess,
    loadProductsFailure, 
    setMessage,
} from '../Redux/Actions';

import AsyncStorage from "@react-native-community/async-storage";

let url = "10.0.2.2";
if(Platform.OS == "ios"){
    url = "localhost";
}
const urlBase = `http://${url}:8080/store/products`;

export const loadProducts = () => async (dispatch, getState) => {
    
    try{
        dispatch(loadProductsInProgress());
        const response = await fetch(`${urlBase}`);
        const products = await response.json();

        dispatch(loadProductsSuccess(products));
    }catch(e){
        dispatch(loadProductsFailure());
        dispatch(
            setMessage({
                open: true,
                text: `Erro ao processar a requisição ${e}`,
                tipo: 'danger',
                loading: false,
            })
        );
    }
}

export const updateProductRequest = (id, product) => async (dispatch) => {
    try{
        const body = JSON.stringify(product);
        const auth = await AsyncStorage.getItem("auth-token");
        const response = await fetch(`${urlBase}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth,
            },
            method: 'PUT',
            body,
        });

        if (response.ok) {
            const updatedProduct = await response.json();
            dispatch(updateProduct(updatedProduct));
            dispatch(
                setMessage({
                    open: true,
                    text: `${updatedProduct.title} atualizado com sucesso!`,
                    loading: false,
                    tipo: 'success',
                })
            );
        } else {
            console.log(`Erro response ${response.status}`);
            dispatch(
                setMessage({
                    open: true,
                    text: `${response.status == 403 ? 'Você precisa estar logado para realizar esta ação' : 'Erro ao processar a exclusão' }`,
                    tipo: 'danger',
                    loading: false,
                })
            );
        }

    }catch(e){
        dispatch(
            setMessage({
                open: true,
                text: `Erro ao processar a atualizacão ${e}`,
                tipo: 'danger',
                loading: false,
            })
        );
    }
}

export const removeProductRequest = (id) => async (dispatch) => {
    try{

        dispatch(
            setMessage({
                open: false,
                text: null,
                loading: true,
                tipo: 'success',
            })
        );

        const auth = await AsyncStorage.getItem("auth-token");
        const response = await fetch(`${urlBase}/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': auth,
            },
        });
    
        if (response.ok) {
            dispatch(removeProduct(id));
            dispatch(
                setMessage({
                    open: true,
                    text: `Producto Id ${id} removido com sucesso!`,
                    loading: false,
                    tipo: 'success',
                })
            );
            
          } else {
            console.log(`Erro response ${response.status}`);
            dispatch(
                setMessage({
                    open: true,
                    text: `${response.status == 403 ? 'Você precisa estar logado para realizar esta ação' : 'Erro ao processar a exclusão' }`,
                    tipo: 'danger',
                    loading: false,
                })
            );
          }
        
    }catch(e){
        dispatch(
            setMessage({
                open: true,
                text: `Erro ao processar a exclusão ${e}`,
                tipo: 'danger',
                loading: false,
            })
        );
    }
}

export const sendMessage = (message) => async (dispatch) => {
    dispatch(setMessage(message));
};