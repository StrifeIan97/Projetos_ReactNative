import React, { createContext, ReactNode, useState } from 'react';

import { ProductItem } from '../types/Product';


type CartItem = ProductItem & {
  amount: number;
  total: number;
};

type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
   addItemCart: (item: ProductItem) => void;
   removeItemCart:(item:ProductItem) =>void;
   totalCarrinho: number
};

export const CartContext = createContext({} as CartContextType);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const[totalCarrinho,setTotal] = useState(0);
function addItemCart(newItem: ProductItem){
  const indexItem = cart.findIndex(item=>item.id === newItem.id)
  
  if(indexItem !== -1){
    //Se entrou aqui, adiciona mais uma quantidade. Já no carrinho

    let cartList = cart;
    cartList[indexItem].amount = cartList[indexItem].amount +1;
    cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].preco

    setCart(cartList)
    totalResultCart(cartList);
    return;
  }

  let data = {
    ...newItem,
    amount: 1,
    total: newItem.preco
  }

  setCart(products=>[...products,data])
  totalResultCart([...cart,data])
}

function removeItemCart(product:ProductItem){
  const indexItem = cart.findIndex(item=>item.id===product.id)

  if(cart[indexItem]?.amount > 1){
    let cartList = cart;

    cartList[indexItem].amount = cartList[indexItem].amount -1;

    cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].preco

    setCart(cartList);
    totalResultCart(cartList);
    return;
  }

  const removeItem = cart.filter(item=>item.id!==product.id)
    setCart(removeItem);
    totalResultCart(removeItem);
  
}


function totalResultCart(items:CartItem[]){
  let myCart = items;
  let result = myCart.reduce((acc,obj)=> acc+obj.total,0)

  setTotal(result)
}

  return (
    <CartContext.Provider value={{ cart,addItemCart, setCart,removeItemCart,totalCarrinho }}>
      {children}
    </CartContext.Provider>
  );
}