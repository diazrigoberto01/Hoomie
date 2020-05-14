import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';

import {AppStyles, AppIcon} from './AppStyles';

import Loading from '../components/Loading';


export default class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      apellido: '',
      correo: '',
      cumple: '',
      celular: '',
      servicios: '',
      isVisible:true
    };
  }
  getUserProfile = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const urlB = 'https://rmdsolutions.tech/WS';
    const servicio = '/profile.php';

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
          const Nombre = AsyncStorage.setItem(
            'Nombre',
            String(responseJson[0].Nombre),
          );
          const Apellido = AsyncStorage.setItem(
            'Apellidos',
            String(responseJson[0].Apellido),
          );
          const Correo = AsyncStorage.setItem(
            'correo',
            String(responseJson[0].Correo),
          );
          const Celular = AsyncStorage.setItem(
            'celular',
            String(responseJson[0].Celular),
          );
          const Servicios = AsyncStorage.setItem(
            'servicios',
            String(responseJson[0].Total_servicios),
          );
          const cumple = AsyncStorage.setItem(
            'cumple',
            String(responseJson[0].Cumpleanos),
          );
          this.getProfile();
          this.setState({isVisible: false});
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({isVisible: false});
      });
    
  };

  async getProfile() {
    const nombre = await AsyncStorage.getItem('Nombre');
    const apellido = await AsyncStorage.getItem('Apellidos');
    const correo = await AsyncStorage.getItem('correo');
    const celular = await AsyncStorage.getItem('celular');
    const cumple = await AsyncStorage.getItem('cumple');
    const servicios = await AsyncStorage.getItem('servicios');

    this.setState({
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      celular: celular,
      cumple: cumple,
      servicios: servicios,
    });
  }
  async componentDidMount() {
    this.getUserProfile();
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View
          style={{flex: 0.3, backgroundColor: '#00b7e2', alignItems: 'center'}}>
          <View
            style={{
              height: '110%',
              width: '75%',
              backgroundColor: '#FFFFFF',
              top: '45%',
              alignItems: 'center',
              position: 'absolute',
              borderRadius: 6,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <Text
              style={{
                top: '30%',
                color: '#00b7e2',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {this.state.nombre + this.state.apellido}
            </Text>
            <View style={{alignItems: 'center', top: '50%'}}>
              <Text
                style={{color: '#00b7e2', fontSize: 16, fontWeight: 'bold'}}>
                {this.state.servicios}
              </Text>

              <Text
                style={{color: '#A0A0A0', fontSize: 16, fontWeight: 'bold'}}>
                servicios solicitados
              </Text>
            </View>

            <View style={{position: 'absolute'}}>
              <Image
                style={{height: 110, width: 110, top: '-60%'}}
                source={require('../assets/icons/perfil_vector.png')}
              />
            </View>
          </View>
        </View>

        <View style={{left: '13%', top: '20%'}}>
          <Text style={{fontSize: 12, color: '#CECECE'}}>EMAIL</Text>
          <Text style={{fontSize: 16, color: '#A0A0A0'}}>
            {this.state.correo}
          </Text>
        </View>

        <View style={{left: '13%', top: '30%'}}>
          <Text style={{fontSize: 12, color: '#CECECE'}}>
            FECHA DE NACIMIENTO
          </Text>
          <Text style={{fontSize: 16, color: '#A0A0A0'}}>
            {this.state.cumple}
          </Text>
        </View>

        <View style={{left: '13%', top: '40%'}}>
          <Text style={{fontSize: 12, color: '#CECECE'}}>
            NÚMERO DE CELULAR
          </Text>
          <Text style={{fontSize: 16, color: '#A0A0A0'}}>
            {this.state.celular}
          </Text>
        </View>
        <Loading isVisible={this.state.isVisible} text={'Iniciando Sesion...'} />
      </View>
    );
  }
}
Perfil.navigationOptions = navData => {
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