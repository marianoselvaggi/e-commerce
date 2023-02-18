import React, { FC, ReactNode, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';

export interface CartState {
   cart: ICartProduct[];
   isLoaded: boolean;
   numberOfItems: number;
   subTotal: number;
   tax: number;
   total: number;
   shippingAddress?: ShippingAddress,
};

export interface ShippingAddress {
   firstName: string;
   lastName: string;
   address: string;
   address2?: string;
   zip: string;
   city: string;
   country: string; 
   phone: string;   
}


const CART_INITIAL_STATE: CartState = {
   cart: [],
   isLoaded: false,
   numberOfItems: 0,
   subTotal: 0,
   tax: 0,
   total: 0,
   shippingAddress: undefined,
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
   },[])
   
   useEffect(() => {
     Cookie.set('cart', JSON.stringify(state.cart))
   }, [state.cart])

   useEffect(() => {
      const numberOfItems = state.cart.reduce((prev,current:ICartProduct) => (current.quantity + prev), 0)
      const subtotal = state.cart.reduce((prev,current:ICartProduct) => (current.quantity * current.price + prev), 0)
      const tax = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0) * subtotal
      
      const summaryCart = {
         numberOfItems: numberOfItems,
         subTotal: subtotal,
         tax: tax,
         total: subtotal + tax,
      }

      dispatch({ type: '[Cart] - Update summary cart', payload: summaryCart })

   }, [state.cart])

   useEffect(() => {
      if (Cookie.get('firstName')) {
         const shippingAddress = {
            firstName: Cookie.get('firstName') || '',
            lastName: Cookie.get('lastName') || '',
            address: Cookie.get('address') || '',
            address2: Cookie.get('address2') || '',
            zip: Cookie.get('zip') || '',
            city: Cookie.get('city') || '',
            country: Cookie.get('country') || '',
            phone: Cookie.get('phone') || '',
         }
         
         dispatch({type: '[Cart] - Loaded shippingAddress from cart', payload: shippingAddress});
      }
   }, [])
   

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

   const updateAddress = (address: ShippingAddress) => {
      Cookie.set('firstName', address.firstName);
      Cookie.set('lastName', address.lastName);
      Cookie.set('address', address.address);
      Cookie.set('address2', address.address2 || '');
      Cookie.set('zip', address.zip);
      Cookie.set('city', address.city);
      Cookie.set('country', address.country);
      Cookie.set('phone', address.phone);
      dispatch({type:'[Cart] - Update shippingAddress from cart',payload:address});
   }

   return (
      <CartContext.Provider value={{
        ...state,

        // methods
        addProductToCard,
        updateProductInCart,
        deleteProductInCart,
        updateAddress,
   }}>
         { children }
      </CartContext.Provider>
   )
}