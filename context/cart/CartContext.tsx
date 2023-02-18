import { createContext } from 'react';
import { ICartProduct } from '../../interfaces/';
import { ShippingAddress } from './CartProvider';

interface ContextProps {
   isLoaded: boolean;
   cart: ICartProduct[];
   numberOfItems: number;
   subTotal: number;
   tax: number;
   total: number;

   shippingAddress?: ShippingAddress,

   // methods
   addProductToCard: (product: ICartProduct) => void;
   updateProductInCart: (product: ICartProduct) => void;
   deleteProductInCart: (product: ICartProduct) => void;
   updateAddress: (address: ShippingAddress) => void;
};

export const CartContext = createContext({} as ContextProps);