import React from 'react';
import { StyleSheet,View,Text } from "react-native"


export default function Listagem({data}) {
    return (

        <View style={styles.container} >
            <Text style={styles.text}>{data.nome}</Text>
            <Text style={styles.text}>{data.cargo}</Text>
        </View>

    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop:20,
        marginBottom:10,
        padding:10,
        backgroundColor:'black',
        width:400,
    },
    text: {
       color:'white',
       
     }  

})