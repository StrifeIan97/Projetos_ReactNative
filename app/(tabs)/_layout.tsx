import { Stack } from 'expo-router';
import CartProvider from '../../src/contexts/CardContext';


export default function Layout() {
  return( 
  <CartProvider>
 <Stack initialRouteName="index"
  />;
  </CartProvider>
 

  )
}