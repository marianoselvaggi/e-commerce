import React, { FC, ReactNode, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';

export interface CartState {
   cart: ICartProduct[];
};


const CART_INITIAL_STATE: CartState = {
    cart: [],
};

interface Props {
   children?: ReactNode,
}

export const CartProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

   useEffect(() => {
      const cookieCart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
      if (!state.cart.length) {
         dispatch({ type: '[Cart] - Load cart from cookies | storage', payload: cookieCart })
      }
   })
   
   useEffect(() => {
     Cookie.set('cart', JSON.stringify(state.cart))
   
   }, [state.cart])
   

   const addProductToCard = (product: ICartProduct) => {
      const productExist = state.cart.some(p => p.slug === product.slug);
      if (!productExist) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] });
      
      const productWithSizeExist = state.cart.some(p => p.slug === product.slug && p.size === product.size);
      if (!productWithSizeExist) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] });

      const products = state.cart.map(p => {
         if (p.slug !== product.slug) return p;

         if (p.size !== product.size) return p;

         p.quantity += product.quantity;
         return p;
      });
      dispatch({ type: '[Cart] - Update products in cart', payload: products });
   }

   const updateProductInCart = (product: ICartProduct) => {
      dispatch({ type: '[Cart] - Update product in cart', payload: product });
   }

   const deleteProductInCart = (product: ICartProduct) => {
      dispatch({ type: '[Cart] - Remove product in cart', payload: product });
   }

   return (
      <CartContext.Provider value={{
        ...state,

        // methods
        addProductToCard,
        updateProductInCart,
        deleteProductInCart,
   }}>
         { children }
      </CartContext.Provider>
   )
}