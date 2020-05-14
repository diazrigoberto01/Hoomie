import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { Image } from "react-native-elements";
import { AppStyles } from './AppStyles';

export default class DetallesServicios extends Component {

  static navigationOptions = ({navigation})=> {
    return{
     
        headerTitle:(<Text style={styles.headerbuttonT}>
         Detalles del servicio
        </Text>)
    }
    
  }
  constructor(props){
    super(props);
    this.state={
      fecha: this.props.navigation.getParam('fecha'),
      id:this.props.navigation.getParam('id'),
      hora:this.props.navigation.getParam('hora'),
      hora_final:this.props.navigation.getParam('hora_final'),
      costo:this.props.navigation.getParam('costo'),
      nombre_emp:this.props.navigation.getParam('nombre_emp'),
      apellidos:this.props.navigation.getParam('apellidos'),
      m_pago:this.props.navigation.getParam('m_pago'),
      ubicacion:this.props.navigation.getParam('ubicacion'),
      imagen:this.props.navigation.getParam('imagen')
    } 
  }
    render() {
      return (
        <ScrollView contentContainerStyle={{alignItems:'center'}}>
        
          <View style={styles.locationcontainer}>
            <Image source={{uri: this.state.imagen}} style={styles.mapPreview}/>
            <View style={styles.addressContainer}>
              <Text style={{fontWeight: 'bold', marginBottom: 5, paddingBottom: 5}}>{this.state.fecha} </Text>
              <Text style={{paddingBottom: 5}}>{this.state.hora} - {this.state.hora_final}</Text>
              <Text style={{fontWeight: 'bold', paddingTop: 5}}>Servicio realizado por: </Text>
              <Text style={{fontWeight: 'bold', paddingTop: 5}}>{this.state.nombre_emp} {this.state.apellidos}</Text>
              <Text>{this.state.ubicacion}</Text>
            </View>
            <View style={{bottom: 130, paddingRight: 15}}>
              <Text style={{fontWeight: 'bold', textAlign: 'right', paddingBottom: 5}}>MXN${this.state.costo}</Text>
              <Text style={{textAlign: "right"}}>{this.state.m_pago}</Text>
            </View>
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
      shadowColor:'black',
      shadowOpacity:0.26,
      shadowOffset:{width:0,height:2},
      shadowRadius:8,
      elevation:5,
      backgroundColor:'white',
      borderRadius:10
    },
    addressContainer:{
      padding:20,
      textAlign: 'left'

    },
    address:{
      color:AppStyles.color.main
    },
    mapPreview:{
      maxWidth:350,
      height:300,
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10
      
        },headerbuttonT:{
          color:'white',
          fontSize:AppStyles.fontSize.normal
      }
    });
