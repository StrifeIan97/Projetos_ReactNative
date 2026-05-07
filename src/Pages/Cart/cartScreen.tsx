import CardItem from '@/src/Components/CardItem/CardItem';
import { Stack } from 'expo-router';
import { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { CartContext } from '@/src/contexts/CardContext';




export default function Cart() {
  const{cart,addItemCart,removeItemCart,totalCarrinho} = useContext(CartContext);
  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item)=> String(item.id)}
        ListEmptyComponent={()=> <Text>Nenhum Item no carrinho...</Text>}
        renderItem={({item})=>(
          <CardItem
            data={item}
            addAmount={()=>addItemCart(item)}
            removeAmount={()=>removeItemCart(item)}
          />
        )}

        ListFooterComponent={()=><Text style={styles.total}>Total R$ {totalCarrinho.toFixed(2)}</Text>}
      
      />
      <Stack.Screen
        options={{
          title: 'Meu Carrinho',
          headerShown: true,
        }}
      />

      
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fafafa',
    paddingStart: 14,
    paddingEnd:14,
    paddingTop:14,
  },

  total:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
  }
})