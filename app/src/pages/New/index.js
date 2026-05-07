import React,{useState} from 'react';
import { Background,Input,SubmitButton,SubmitText } from './styles';

import { SafeAreaView, TouchableWithoutFeedback,Keyboard,Alert } from 'react-native';

import Header from '../../components/header'
import RegisterTypes from '../../components/RegisterTypes';

import api from '../../services/api';
import { format } from 'date-fns';
import { useNavigation } from 'expo-router';


import { use } from 'react';
import { da } from 'date-fns/locale';

export default function New() {
    const navigation = useNavigation();

    const [labelInput,setLabelInput] = useState();
    const [valueInput,setValueInput] = useState();
    const [type,setType] = useState('receita');


    function handleSubmit(){
        Keyboard.dismiss();

        if(isNaN(parseFloat(valueInput))|| type === null){
            alert('Preencha todos os campos')
            return;
        }

        Alert.alert(
            'Confirmando dados',
            `Tipo: ${type} - Valor: ${parseFloat(valueInput)}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },

                {
                    text: 'Continuar',
                    onPress: () => handleAdd()
                }
            ]
        )
    }

    async function handleAdd(params) {
        Keyboard.dismiss();

        await api.post('/receive',{
            description: labelInput,
            value: Number(valueInput),
            type: type,
            date: format(new Date(),'dd/MM/yyyy')
        })

        setLabelInput('');
        setValueInput('');
        navigation.navigate('HOME PAGE');
    }


    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <Background>
            <Header title="Registrando" />


            <SafeAreaView style={{marginTop: 14, alignItems: 'center'}}>
                <Input
                    placeholder="Descrição desse registro"
                    value={labelInput}
                    onChangeText={(text)=>setLabelInput(text)}
                />

                <Input
                    placeholder="Valor desse registro"
                    keyboardType="numeric"
                    value={valueInput}
                    onChangeText={(text)=>setValueInput(text)}
                />

                <RegisterTypes type={type} sendTypeChanged={(item)=>setType(item)}/>

                <SubmitButton onPress={handleSubmit}>
                    <SubmitText>Registrar</SubmitText>
                </SubmitButton>

            </SafeAreaView>

        </Background>
        </TouchableWithoutFeedback>

    )

}