import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  RefreshControl
} from 'react-native';
import { AppStyles} from "./AppStyles";
import PlaceItemSer from '../components/placeItemSer';

export default class Servicios extends Component {
  constructor(props) {
    super(props);
    this.getUserServices.bind(this);
    this.state={
      JSON_from_server:[],
      isRefreshing: false,
    }
  }


  getUserServices= async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const urlB = 'https://rmdsolutions.tech/WS';
    const servicio = '/getServices.php';
    this.setState({isRefreshing: true});
    fetch(urlB + servicio, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valor0: userToken,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        {
          console.log(responseJson);
          this.setState({
            JSON_from_server: [...this.state.JSON_from_server, ...responseJson],
            isRefreshing: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({isRefreshing: false})
      });
  }
  componentDidMount(){
    this.getUserServices();
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ffff', alignItems: 'center'}}>  
        <FlatList style={{width:'100%'}}
          data={this.state.JSON_from_server}
          keyExtractor={item => item.Id}
          renderItem={itemData => (
            <PlaceItemSer
              imageU={itemData.item.ImagenU}
              fecha={itemData.item.Fecha}
              hora={itemData.item.Hora}
              estado={itemData.item.Estado}
              costo={itemData.item.Costo}
              onSelect={() => {
                this.props.navigation.navigate('DetallesServicios', {
                  id: itemData.item.Id,
                  fecha: itemData.item.Fecha,
                  hora: itemData.item.Hora,
                  hora_final: itemData.item.Hora_final,
                  costo: itemData.item.Costo,
                  nombre_emp: itemData.item.Nombre_Emp,
                  apellidos: itemData.item.Apellidos,
                  m_pago: itemData.item.M_pago,
                  ubicacion: itemData.item.Ubicacion,
                  imagen: itemData.item.ImagenU
                });
              }}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
      </View>
    );
  }
}
Servicios.navigationOptions = navData => {
  return {
    headerLeft: (
      <TouchableOpacity
        style={styles.headerbutton}
        onPress={() => navData.navigation.openDrawer()}>
        <Text style={styles.headerbuttonT}>Menu</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
  headerbutton: {
    marginLeft: 10,
  },
  headerbuttonT: {
    color: 'white',
    fontSize: AppStyles.fontSize.normal,
    fontWeight: 'bold',
  },
});