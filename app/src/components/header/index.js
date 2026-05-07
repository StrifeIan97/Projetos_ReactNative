import React from "react";
import { Container,Title,ButtonMenu } from "./styles";
import Feather from '@expo/vector-icons/Feather';


import {useNavigation,useRouter} from "expo-router";

export default function Header({title}){
    const navigation = useNavigation();
    return(
        <Container>

        <ButtonMenu onPress={()=>navigation.openDrawer()}>
        <Feather name="menu" size={24} color="black" />
        </ButtonMenu>    
            {title &&(
                <Title>
                    {title}
                </Title>
            )}
        </Container>
    )
}