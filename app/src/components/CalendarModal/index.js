import React,{useState} from "react";
import { TouchableWithoutFeedback,View } from "react-native";

import {Container,ButtonFilterText,ModalContent,ButtonFilter} from './styles';

import { Calendar,LocaleConfig } from "react-native-calendars";
import { ptBR } from "./localeCalendar";

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarModal({setVisible,handleFilter,markedDatesFromMovements}){
    const[dateNow,setDateNow] = useState(new Date())
    const [markedtDates,setMarkedDates] = useState(markedDatesFromMovements || {});


    function handleFilterDate(){
        handleFilter(dateNow);
        setVisible();
    }


    function handleOnDayPress(date){
        setDateNow(new Date(date.dateString))

        let markedDay = {
        ...markedDatesFromMovements,
        [date.dateString]: {
            selected: true,
            selectedColor: '#3b3dbf',
            textColor: '#fff'
        },
        };

        setMarkedDates(markedDay)
    }

    return(
        <Container>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={{flex: 1}}></View>
            </TouchableWithoutFeedback>

            <ModalContent>

                <Calendar
                onDayPress={handleOnDayPress}
                markedDates={markedtDates}
                enableSwipeMonths={true}
                theme={{
                    todayTextColor: '#ff0000',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#fff'
                }}
                />
                
                <ButtonFilter onPress={handleFilterDate}>
                    <ButtonFilterText>Filtrar</ButtonFilterText>
                </ButtonFilter>


            </ModalContent>
        </Container>
    )
}