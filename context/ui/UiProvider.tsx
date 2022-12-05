import React, { FC, ReactNode, useReducer } from 'react'
import { UiContext, uiReducer } from './';

export interface UiState {
   isMenuOpen: boolean;
};

interface Props {
   children?: ReactNode,
}

const UI_INITIAL_STATE: UiState = {
   isMenuOpen: false,
};

export const UiProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

   const toogleSideMenu = () => {
      dispatch({
         type: '[UI] - ToggleMenu'
      });
   }

   return (
      <UiContext.Provider value={{
        ...state,

        // Methods
        toogleSideMenu,
   }}>
         { children }
      </UiContext.Provider>
   )
}