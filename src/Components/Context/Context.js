// import { createContext } from "react";
import { faker } from '@faker-js/faker';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import cartReducer from '../reducers/cartReducer';
import filterReducer from '../reducers/filterReducer';
// faker.seed(99);
const Cart = createContext();



export default function Context({ children }) {


    // const products = [...Array(20)].map((item, index) => {
    //     return {
    //         "name": faker.commerce.product(),
    //         "price": faker.commerce.price(),
    //         "fashion": faker.image.abstract(),
    //         "id": faker.datatype.uuid(),
    //         "Dept": faker.commerce.department(),
    //         "ratings":faker.datatype.number({ min: 1, max: 5, precision: 1}) ,
    //         "inStock":faker.datatype.boolean()
    //     }
    // });
   

    const [state, dispatch] = useReducer(cartReducer, {
        products: [],
        cart: []
    });
    useEffect(() => {

        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(json => {
                const datas = json.products.map(element => {
                    return {
                        "name": element.title,
                        "price": element.price,
                        "fashion": element.thumbnail,
                        "id": element.id,
                        "Dept": element.category,
                        "inStock": element.stock ? true : false,
                        "ratings":element.rating
                    }
                });
                
                dispatch({
                    type:"ADD_PRODUCTS",
                    payload:datas
                });
            })
    }, []);


   


    const [filterState, filterDispatch] = useReducer(filterReducer, {
        order: "",
        inStock: false

    });

    // console.log(state);

    return (

        <Cart.Provider value={{ state, dispatch, filterState, filterDispatch }}>{children}</Cart.Provider>
    )
}



export const CartState = () => {
    return useContext(Cart);
}