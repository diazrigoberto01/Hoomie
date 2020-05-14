import React, { useState,useCallback } from 'react';
import { View, Text, StyleSheet,Platform,ScrollView,TextInput,AsyncStorage} from 'react-native';

import LocationPicker from "../components/locationPicker";

import { AppStyles } from './AppStyles';
import env from "../env";
import { TouchableOpacity } from 'react-native-gesture-handler';
const newLoc = props => {
  const [titleValue, setTitleValue] = useState("");
  const [celphoneValue, setCelphoneValue] = useState("");
  const [roomsValue, setRoomsValue] = useState("");
  const [referenceValue, setReferenceValue] = useState("");
  const [selectedLocation,setSelectedLocation]=useState();
  const a=props;
  

 const  titleChangeHandler = text => {
    // you could add validation
    setTitleValue(text);
    
  };
  const cellPhoneChangeHandler = text => {
    setCelphoneValue(text);
  }
  const roomsChangeHandler = text => {
    setRoomsValue(text);
  }
  const referenceChangeHandler = text => {
    setReferenceValue(text);
  }
  const savePlaceHandler = async () => {

    //añadir validaciones
    const user =await AsyncStorage.getItem('userToken');
    const loc = selectedLocation;
    if(!loc){
      alert('Selecciona una ubicacion')
      
    }else{
      if(titleValue===""){
        alert('Ingresa un titulo');
      } else if(celphoneValue==""){
        alert("Ingrese un número de celular");
      } else if(roomsValue==""){
        alert("Ingrese un número de habitaciones");
      } else if(referenceValue==""){
        alert("Ingrese un número de celular");
      } else{
        //alert(titleValue+" lat"+loc.lat+"lon"+loc.lon+" address:"+loc.address+" Colonia:"+loc.colonia+" cp:"+loc.cp);

 
        const urlB="https://rmdsolutions.tech/WS";
        const servicio="/iLocation.php";
        const nombre = titleValue;
        const referencia = referenceValue;
        const phone = celphoneValue;
        const cuartos= roomsValue;
        
        const urlImage = `https://maps.googleapis.com/maps/api/staticmap?center=${
           loc.lat
          },${
           loc.lon
          }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
            loc.lat
          },${loc.lon}&key=${env.googleApiKey}`;
console.log(loc.colonia)

        fetch(urlB+servicio,{
          method:'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
          },
          body : JSON.stringify({
            valor0:user,
            valor1:nombre,
            valor2:referencia,
            valor3:phone,
            valor4:loc.address,
            valor5:loc.colonia,
            valor6:loc.cp,
            valor7:cuartos,
            valor8:urlImage,
            valor9:loc.lat,
            valor10:loc.lon


          })}).then((response) => response.text()).then(
            (responseJson) => { {  
               alert(responseJson)
               a.navigation.goBack();

  }
            }
          ).catch((error)=>{
            console.error(error);
          });

      
      }

    }
  };
  const locationPicked= useCallback(location=>{
    //console.log(location)
    setSelectedLocation(location);
  },[selectedLocation]) 

   
      return (
        <ScrollView>
        <View style={styles.form}>
          <Text style={styles.label}>Anadir casa o departamento</Text>
          
          <View style={styles.map}> 
          <LocationPicker  navigation={props.navigation} titulo={titleValue} onLocationPicked={locationPicked}/>
          </View>
       
          <View style={styles.InputContainer}>
            <TextInput
            style={styles.body}
            placeholder="Titulo"
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
            onChangeText={titleChangeHandler}
            value={titleValue}
            />
             <TextInput
            style={styles.body}
            placeholder="Teléfono"
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
            onChangeText={cellPhoneChangeHandler}
            value={celphoneValue}
            />
             <TextInput
            style={styles.body}
            placeholder="Número de habitaciones"
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
            onChangeText={roomsChangeHandler}
            value={roomsValue}
            />
             <TextInput
            style={styles.body}
            placeholder="Titulo"
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
            onChangeText={referenceChangeHandler}
            value={referenceValue}
            />
          </View>
         
          <TouchableOpacity style={{alignItems: 'center'}}>
            <View style={{alignItems: 'center', alignText:'center', backgroundColor: '#00b7e2', borderRadius: 6, width: 100, height: 30}}>
              <Text style={{color:'#FFFFFF'}}>Guardar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      );
    }
  

  const styles = StyleSheet.create({

    Menu:{
      paddingLeft:10,
      color:'white',
      paddingTop: (Platform.OS == 'android'? 30 : 0),
    },label: {
      fontSize: AppStyles.fontSize.title,
      marginBottom: 15,
      alignSelf:'center'
    },
    InputContainer: {
      width: AppStyles.textInputWidth.main,
      marginTop: 10,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: AppStyles.color.grey,
      borderRadius: AppStyles.borderRadius.main,
      alignItems:'center',
      alignSelf:'center'
    },
    body: {
      height: 42,
      paddingLeft: 20,
      paddingRight: 20,
      color: AppStyles.color.text
    },
    map:{
      marginTop:20
    },form:{
      justifyContent:'center'
    }
  });
  export default newLoc;