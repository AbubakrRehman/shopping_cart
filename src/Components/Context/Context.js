// import { createContext } from "react";
import { faker } from '@faker-js/faker';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import cartReducer from '../reducers/cartReducer';
import filterReducer from '../reducers/filterReducer';
// faker.seed(99);
const Cart = createContext();



function Context({ children }) {


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
    const [products, setProducts] = useState({});
    useEffect(()=>{
        let products={};
        fetch('https://dummyjson.com/products')
        .then(res=>res.json())
        .then(json=>{
            console.log(json);
            products["name"]=json.title;
            products["price"]=json.price;
            products["fashion"]=json.image;
            products["id"]=json.id;
            products["Dept"]=json.category;
            products["inStock"]=json.stock?true:false;
            setProducts(products);
        })
    },[]);

    
    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: []
    });


    const [filterState, filterDispatch] = useReducer(filterReducer, {
      order:"",
      inStock:false

    });
    
    // console.log(state);

    return (
        
        <Cart.Provider value={{ state, dispatch,filterState,filterDispatch }}>{children}</Cart.Provider>
    )
}

export default Context;

export const CartState = () => {
    return useContext(Cart);
}