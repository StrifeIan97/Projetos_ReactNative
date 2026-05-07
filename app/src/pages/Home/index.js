import React,{useContext,useEffect,useState} from "react";
import{View,Text,Button, TouchableOpacity,Modal} from 'react-native';
import { AuthContext } from "../../contexts/auth";
import { Background, ListBalance,Area,Title2,List } from "./styles";

import Header from '../../components/header'
import api from "../../services/api";
import { format } from "date-fns";
import BalanceItem from "../../components/BalanceItem";

import  Icon  from "react-native-vector-icons/MaterialIcons";

import { useIsFocused } from "@react-navigation/native";
import { Title } from "../../components/header/styles";
import HistoricoList from "../../components/HistoricoList";

import CalendarModal from "../../components/CalendarModal";

export default function HomePage(){
    const isFocused = useIsFocused();
    const[listBalance,setListBalance] = useState([]);
    const[movements,setMovements] = useState([]);
    const[modalVisible,setModalVisible] = useState(false);
    const[dateMovements,setDateMovements] = useState(new Date());

    useEffect(()=>{
        let isActive = true;
        
        async function getMovements() {
            //let dateFormated = format(dateMovements, 'dd/MM/yyyy');

            let onlyDate = dateMovements.valueOf() + dateMovements.getTimezoneOffset() * 60 * 1000;


            let dateFormated = format(onlyDate,'dd/MM/yyyy');

            const receives = await api.get('/receives',{
                params:{
                    date: dateFormated
                }
            })

            const balance = await api.get('balance',{
                params:{
                    date: dateFormated
                }
            })

            if(isActive){
                setMovements(receives.data);
               setListBalance(balance.data); 
            }
        }
        getMovements();

        return () => isActive = false;
    },[isFocused,dateMovements])

    async function handleDelete(id) {
        try{
            await api.delete('/receives/delete',{
                params:{
                    item_id: id
                }
            })

            setDateMovements(new Date())
        }catch(err){
            console.log(err)
        }
    }

    const{signOut,user} = useContext(AuthContext)

    function filterDateMovements(dateSelected){
        setDateMovements(dateSelected);
    }

    function generateMarkedDates(movements) {
    const marked = {};

    movements.forEach((item) => {
        const date = item.date; // supondo que seja no formato "2024-07-30"
        marked[date] = {
            marked: true,
            dotColor: '#3b3dbf',
        };
    });

    return marked;
}


    return(
        <Background>
            <Header title="Minhas Movimentações"/>


            <ListBalance
                data={listBalance}
                horizontal={true}
                showHorizontalScrollIndicator={false}
                keyExtractor={item=>item.tag}
                renderItem={({item})=>(<BalanceItem data={item}/>)}
            />

            <Area>
                <TouchableOpacity onPress={()=>setModalVisible(true)}>
                    <Icon name="event" color="#121212" size={30}/>
                </TouchableOpacity>
                <Title2>Ultimas Movimentações</Title2>
            </Area>

            <List
                data={movements}
                keyExtractor={item=>item.id}
                renderItem={({item})=><HistoricoList data={item} deleteItem={handleDelete}/>}
                showVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:20}}
            />

            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <CalendarModal
                    setVisible={()=>setModalVisible(false)}
                    handleFilter={filterDateMovements}
                    markedDatesFromMovements={generateMarkedDates(movements)}


                />
            </Modal>



        </Background>
            
    )
}