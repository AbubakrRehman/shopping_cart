import React from 'react';
import { CartState } from '../Context/Context';

import Product from '../Product/Product';
import "./Products.css";

function Products() {
    const {state,dispatch,filterState,filterDispatch}=CartState();
    const tranformProducts=()=>{
      console.log("pro k andar",state.products);
         
           let res =state.products.length ?state.products.sort((a,b)=>{
                return filterState.order==="ascending"? a.price-b.price:b.price-a.price
              })
              :[];
            res=res.length? res.filter((el,i)=>{
              return filterState.inStock?el.inStock===filterState.inStock:true;
            }):[]

            return res;

    }
  return (
    <div className='products-container'>
       { tranformProducts().map((item,index)=>{
            return <Product key={item.id} product={item}/>
        
        })
      }
    </div>
  )
}

export default Products