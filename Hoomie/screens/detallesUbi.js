import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,Platform,ScrollView} from 'react-native';
import { AppStyles } from './AppStyles';


import MapPreview from "../components/MapPreview";

export default class detallesUbi extends Component {

  static navigationOptions = ({navigation})=> {
    return{
     
        headerTitle:(<Text style={styles.headerbuttonT}>
         { navigation.getParam('titulo')}
        </Text>)
    }
    
  }
  constructor(props){
    super(props);
    this.state={
      direccion: this.props.navigation.getParam('direccion'),
      id:this.props.navigation.getParam('id'),
      titulo:this.props.navigation.getParam('titulo'),
      imagen:this.props.navigation.getParam('image'),
      lat:this.props.navigation.getParam('lat'),
      lon:this.props.navigation.getParam('lon')

    }
    this.viewOnMap.bind(this);

  }
viewOnMap=()=>{
  const initialLocation={lat:parseFloat(this.state.lat),lon:parseFloat(this.state.lon)
    
  };
  const {titulo}=this.state;
    console.log(titulo)
  this.props.navigation.navigate('Map',{readonly:true,initialLocation:initialLocation,titulo:titulo})}


    render() {
      return (
        <ScrollView contentContainerStyle={{alignItems:'center'}}>
          
          <View style={styles.locationcontainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{
              this.state.direccion
            }
            </Text>
          </View>
            
            <MapPreview Location={{lat:this.state.lat,lon:this.state.lon}} style={styles.mapPreview} onPress={this.viewOnMap}/>
          </View>
        </ScrollView>
      );
    }
  }

  const styles = StyleSheet.create({
    imagen:{
      height: '35%',
      minHeight:300,
      width:'100%',
      backgroundColor:AppStyles.color.grey
    },
    locationcontainer:{
      marginVertical:20,
      width:'90%',
      maxWidth:350,
      justifyContent:'center',
      alignItems:'center',
      shadowColor:'black',
      shadowOpacity:0.26,
      shadowOffset:{width:0,height:2},
      shadowRadius:8,
      elevation:5,
      backgroundColor:'white',
      borderRadius:10
    },
    addressContainer:{
      padding:20
    },
    address:{
      color:AppStyles.color.main
    },
    mapPreview:{
      width:'100%',
      maxWidth:350,
      height:300,
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10
      
        },headerbuttonT:{
          color:'white',
          fontSize:AppStyles.fontSize.normal
      }
    });
