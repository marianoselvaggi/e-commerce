import { createContext } from 'react';
import { ICartProduct } from '../../interfaces/';

interface ContextProps {
   cart: ICartProduct[];
   numberOfItems: number;
   subTotal: number;
   tax: number;
   total: number;

   // methods
   addProductToCard: (product: ICartProduct) => void;
   updateProductInCart: (product: ICartProduct) => void;
   deleteProductInCart: (product: ICartProduct) => void;
};

export const CartContext = createContext({} as ContextProps);