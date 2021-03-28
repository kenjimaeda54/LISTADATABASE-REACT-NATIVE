import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  FlatList,
  ActivityIndicator
}
  from 'react-native';
import firebase from './src/firebase/firebaseconection'
import Listagem from "./src/listagem/"

console.disableYellowBox = true;


export default function App() {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function dados() {

      await firebase.database().ref('Usuarios').on('value', (snapshot) => {
        setUsuarios([]);
        //E necessairio seUsurios([]) ,por que no forEach sempre monta
        // um novo array com os intens anterior e isto duplica o array,
        //dessa forma garanto que reotorna um array vazio apenas com os
        //dados novo

        snapshot.forEach((chilItem) => {
          let data = {
            key: chilItem.key,
            nome: chilItem.val().nome,
            cargo: chilItem.val().cargo
          };

          setUsuarios(oldArray => [...oldArray, data].reverse());
          //metodo reverse coloca o ultimo em primeiro na lista
      
        })
        setLoading(false);
      })

    }
     
    dados();


  }, []);

  async function cadastrar() {
    let usuario = await firebase.database().ref('Usuarios')
    let chave = usuario.push().key;
    if (nome !== '' && cargo !== '') {
      usuario.child(chave).set({
        nome: nome,
        cargo: cargo
      })
      alert('Usuario cadastrado com sucesso');
      setNome('');
      setCargo('')
    } else {
      alert('Possui campos vazios ou invalidos');
    }
  }


  return (
    <View style={styles.container}>

      <Text style={styles.text} >Nome</Text>

      <TextInput
        placeholder="Seu nome"
        value={nome}
        onChangeText={(item) => setNome(item)}
        style={styles.textInput}
      />

      <Text style={styles.text}>Cargo</Text>

      <TextInput
        placeholder="Cargo"
        value={cargo}
        //necessario o value.Caso não coloque sera impossivel,manipular
        //valor que usuario colocou ou seja por exemplo apagar este estado
        onChangeText={(item) => setCargo(item)}
        style={styles.textInput}
      />

      <Button
        title="Cadastrar"
        onPress={cadastrar}
        style={styles.button}
      />
      {loading ? (

        <ActivityIndicator color="black" size={45} />
      )
        :
        (

          <FlatList
            keyExtractor={item => item.key}
            data={usuarios}
            renderItem={({item}) => (
              <Listagem data={item} />
            )}
          />
        )
      }

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: '#dddd',
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 30,
    textAlign: 'center',
    width: '90%',
    height: 100,
  },
  text: {
    color: 'black',
    fontSize: 26,
    marginTop: 30,
    marginBottom: 3,
  },
  button:{
    color:'black',
  }

});