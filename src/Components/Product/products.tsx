import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ProductItem = {
  id: string;
  name: string;
  preco: number;
};

type Props = {
  data: ProductItem;
  addToCart: () => void;
};

export default function Product({data,addToCart}:Props) {
 return (
   <View style={styles.container}>
    <View>
        <Text style={styles.title}>{data.name}</Text>
         <Text> R$ {data.preco}</Text>
    </View>

    <TouchableOpacity style={styles.buttonAdd} onPress={addToCart}>
        <Text>+</Text>
    </TouchableOpacity>


   </View>
  );
}

const styles = StyleSheet.create ({
    container:{
        borderWidth: 1,
        borderColor: '#dfdfdf',
        borderRadius: 2,
        marginBottom: 14,
        padding: 8,
        paddingBottom: 14,
        paddingTop: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    title:{
        fontWeight: 'bold'
    },
    buttonAdd:{
        paddingStart: 12,
        paddingEnd:12,
        backgroundColor: '#168fff',
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 2,

    }
})