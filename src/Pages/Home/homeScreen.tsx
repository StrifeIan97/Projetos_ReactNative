import { CartContext } from '@/src/contexts/CardContext';
import { Stack, useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProductItem } from '@/src/types/Product';
import { Feather } from '@expo/vector-icons';

import Product from '../../Components/Product/products';

export default function Home() {

  const { cart, addItemCart } = useContext(CartContext)

  const [products, setProducts] = useState([
    { id: '1', name: "Coca Cola", preco: 13.00 },
    { id: '2', name: "Chocolate", preco: 6.50 },
    { id: '3', name: "Queijo 500g", preco: 15 },
    { id: '4', name: "Batata Frita", preco: 15.00 },
    { id: '6', name: "Refri Lata", preco: 6 },
    { id: '7', name: "Miojo", preco: 3.00 },
  ]);

  function handleAddCart(item: ProductItem) {
    addItemCart(item)
  }

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Página Inicial',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0080fe',
          },
          headerTintColor: '#fff'
        }}
      />

      <View style={styles.cartContainer}>
        <Text style={styles.title}>Lista de Produtos</Text>
        <TouchableOpacity style={styles.cartButton}
          onPress={() => router.push('/cart')}
        >
          {cart.length >= 1 && (
            <View style={styles.dot}>
              <Text style={styles.dotText}>{cart?.length}</Text>

            </View>


          )}
          <Feather name="shopping-cart" size={30} color="#000" />
        </TouchableOpacity>


      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Product data={item} addToCart={() => handleAddCart(item)} />}

      />


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingEnd: 14,
    paddingStart: 14,
    marginTop: -40
  },

  cartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  dot: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    zIndex: 99,
    bottom: -2,
    left: -4,
  },

  dotText: {
    fontSize: 12,
  },

  cartButton: {

  },



})