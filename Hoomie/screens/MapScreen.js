import React,{useState,useCallback,useEffect} from 'react';
import {Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import { AppStyles } from './AppStyles';
import env from "../env";

const { width, height } = Dimensions.get("window");

const MapScreen = props =>{
    const [isTap,setIsTap]=useState(false);
    const initialLocation=props.navigation.getParam('initialLocation');
     const titulo=props.navigation.getParam('titulo');
     const readonly=props.navigation.getParam('readonly');
    const [selectedLocation,setSelectedLocation]=useState(initialLocation);
    const [mapRegionA,setMapRegionA]=useState();
let mapRegion={
    latitude: initialLocation?initialLocation.lat:19.0479599,
    longitude:initialLocation?initialLocation.lon:-98.2484828,
    latitudeDelta:.009,
    longitudeDelta:.004,
}
const selectLocation= event =>{
    if(readonly){
        return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lon=event.nativeEvent.coordinate.longitude;
    setMapRegionA({latitude:lat,longitude:lon,
    latitudeDelta:.5,longitudeDelta:.5});
    console.log('Selecciona punto');
   setSelectedLocation({
       lat:lat,
       lon:lon,
       address:"",
       cp:"",
       colonia:""
   });
    

    const url = 
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        lat
    },${lon}&key=${env.googleApiKey}`;
    try {
        fetch(url).then((response) => response.json()).then(
        (responseJson) => { {  
            console.log(responseJson);
          const address= responseJson.results[0].formatted_address;
          const cp= responseJson.results[0].address_components[6].long_name;
          const colony=responseJson.results[0].address_components[2].long_name;
          console.log(address);
          console.log(initialLocation);
          setSelectedLocation({
            lat:lat,
            lon:lon,
            address:address,
            colonia:colony,
            cp:cp
    
        }); 
        //Revisar disponibilidad del servicio en la zon con el cp

          console.log(selectedLocation)


}}).catch((error)=>{
    console.error(error);
      });
    } catch (error) {
        
    }
    
 setIsTap(true);   
}
const savePickedLocation= useCallback(()=>{
    //convertir lay long a address

    if(!isTap || !selectedLocation){
        alert('Selecciona en el mapa')
        return;
    }else{
    console.log(selectedLocation);
    props.navigation.navigate('NuevaUbicacion',{pickedLocation:selectedLocation});
    }
    
},[selectedLocation,isTap]);

useEffect(()=>{ props.navigation.setParams({
    saveLocation:savePickedLocation
})},[savePickedLocation]);



  
let markerCoord;
if(selectedLocation){
    markerCoord={
        latitude:selectedLocation.lat,
        longitude:selectedLocation.lon

    }
}


return(
    <MapView style={styles.map} region ={mapRegion} onPress={selectLocation} animateToRegion={mapRegionA}> 
    {markerCoord&&(<Marker title={titulo} coordinate={markerCoord}/>
)}
    </MapView>
);
};
MapScreen.navigationOptions=navData=>{

    const saveFn=navData.navigation.getParam('saveLocation');
    const readonly=navData.navigation.getParam('readonly');
    const titulo=navData.navigation.getParam('titulo');
    if(readonly){
        return {headerTitle:(<Text style={styles.headerbuttonT}>{titulo}</Text>)};
    }
    return{
        headerRight:<TouchableOpacity  style={styles.headerbutton} onPress={saveFn}>
            <Text style={styles.headerbuttonT}>Save</Text>
        </TouchableOpacity> ,
        headerTitle:(<Text style={styles.headerbuttonT}>{titulo}</Text>)
        
    };
}

const styles=StyleSheet.create({
map: {
    width:width,
    height:height
},
headerbuttonT:{
    color:'white',
    fontSize:AppStyles.fontSize.normal
},headerbutton:{
    marginHorizontal:20
}
});
export default MapScreen;