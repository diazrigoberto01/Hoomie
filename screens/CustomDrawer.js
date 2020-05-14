import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList, SafeAreaView,TouchableOpacity, Image, AsyncStorage } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


const Menu = [
  {id:'1',title:'Inicio',icon:"home"},
  {id:'2',title:'Mi Perfil',icon:"user"},
  {id:'3',title:'Metodos de Pago',icon:"credit-card"},
  {id:'4',title:'Mis Servicios',icon:"undo"},
  {id:'5',title:'Mis Ubicaciones',icon:"star"},
  {id:'6',title:'Cerrar Sesion',icon:"lock"}
]
const userToken = AsyncStorage.getItem('userToken');
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      nombre:""
    }
  }
logout = async() => {
 
  await AsyncStorage.clear() ;
  this.props.navigation.navigate('Auth');

};

async getnombre(){
  const nombre = await AsyncStorage.getItem("Nombre");
  this.setState({nombre:nombre})
}
componentDidMount(){
  this.getnombre();
}
 
    render() {
      return (
        
        <SafeAreaView style={{backgroundColor: '#00b7e2'}}>
          <View style={{backgroundColor: '#00b7e2', justifyContent: 'center', alignItems: 'center', padding: "8%", paddingBottom: "35%", position: 'relative'}}>
            <View style={{width:'100%', alignItems: 'center'}}>
              <Image style={styles.image} source={require('../assets/icons/home_solutions.png')} />
            </View>
            <Text style={{color: 'white', fontWeight: 'bold', paddingBottom: 8, paddingTop: 20, fontSize: 20}}>Hola, {this.state.nombre}</Text>
            <View style={{position: 'absolute', top: 0}}>
              <Image style={{height: 110, width: 110, top: "180%"}} source={require('../assets/icons/perfil_vector.png')} />
            </View>
          </View>

          <View style={{backgroundColor: '#FFFFFF', position: 'absolute', width: '100%', top: "142%"}}>  
              <FlatList 
                scrollEnabled={false}
                style={styles}
                    data={Menu}
                    renderItem={({item})=>(
                      <TouchableOpacity style={{borderColor: '#CDCDCD', borderWidth: 0.3, justifyContent: 'center'}} onPress={()=>{
                        item.title === 'Cerrar Sesion' ?
                        this.logout()
                        :this.props.navigation.navigate(item.title)}}
                      >
                        <View style={styles.menu}> 
                          <View style={{flexBasis:55}}>
                            <Icon style={styles.icon} name={item.icon} color="#CDCDCD" />
                          </View>
                          
                          <View style={{flexBasis:140}}>
                            <Text style={styles.text, {textAlign: 'left', color: '#A0A0A0'}}>
                              {item.title}
                            </Text>
                          </View>
                          
                          <View style={{flexBasis:40}}>
                            <Icon style={styles.icon} name="chevron-right" color="#CDCDCD"/>
                          </View>
                        </View>
                          
                      </TouchableOpacity>
                      )}
                keyExtractor={item=>item.id}
                  />
          </View>
        </SafeAreaView>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      flex: 1,
      justifyContent: 'space-evenly'
    },
    navItemStyle: {
      padding: 10
    },
    navSectionStyle: {
      backgroundColor: 'lightgrey'
    },
    sectionHeadingStyle: {
      paddingVertical: 10,
      paddingHorizontal: 5
    },
    footerContainer: {
      padding: 20,
      backgroundColor: 'lightgrey'
    }, 
    image: {
      height: 90,
      width: 180,
    },
    imgr: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    icon: {
      alignContent: 'center',
      color: '#CECECE',
      paddingLeft: 30,
      paddingTop: 10
    }, 
    menu: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'baseline',
      marginBottom: '5%',
      padding: '2%', 
      justifyContent: 'center' 
    },
    text: {
      flex: 1,
      flexDirection: 'row',
      textAlign: 'center',
    }
  });
