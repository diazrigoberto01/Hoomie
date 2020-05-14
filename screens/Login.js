import React, {Component} from 'react';
import {
  Keyboard,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  TouchableHighlight,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  StatusBar,
  Platform,
  AsyncStorage
} from 'react-native';
import Loading from '../components/Loading';
const {width, height} = Dimensions.get('window');
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      isVisible: false,
      isDisabled: false,
    };
    this.emailChangeHandler.bind(this);
    this.passChangeHandler.bind(this);
  }
  componentDidMount() {
    this.requestLocationPermition();
  }

  componentWillUnmount() {}
  emailChangeHandler = text => {
    // you could add validation
    this.setState({user: text});
  };
  passChangeHandler = text => {
    // you could add validation
    this.setState({pass: text});
  };

  render() {
    const logo = require('../assets/icons/home_solutions.png');
    const fb = require('../assets/icons/facebook.png');

    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <StatusBar barStyle="light-content" backgroundColor="#00B7E2" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{alignContent: 'center', alignItems: 'center'}}>
            <View>
              <Image
                source={logo}
                resizeMode="contain"
                style={{width: width * 0.95, height: height * 0.17}}
              />
            </View>
            <View style={[styles.inputContainer, styles.email]}>
              <TextInput
                style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                placeholderTextColor="#00B7E2"
                autoCapitalize="none"
                onChangeText={this.emailChangeHandler}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Password"
                placeholderTextColor="#00B7E2"
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={this.passChangeHandler}
              />
            </View>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.onLoginPress()}
              disabled={this.state.isDisabled}>
              <Text style={styles.loginText}>Continuar</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.registro}
              onPress={() => this.props.navigation.navigate('Registro')}>
              <Text style={styles.text}>¿Nuevo Usuario? Registrate</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.forgot}
              onPress={() => alert('contraseña olvidada')}>
              <Text style={styles.text}>¿Olvidaste tu contraseña?</Text>
            </TouchableHighlight>

            <View style={styles.fb}>
              <TouchableHighlight onPress={() => alert('Registro con FB')}>
                <Text style={styles.text}>Registrate con Facebook</Text>
              </TouchableHighlight>
              <Image
                source={fb}
                resizeMode="contain"
                style={{
                  width: width * 0.05,
                  height: height * 0.025,
                  marginLeft: 5,
                }}
              />
            </View>

            <Loading isVisible={this.state.isVisible} text={'Iniciando Sesion...'} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
  onLoginPress = async () => {
    if (this.state.user === '' || this.state.pass === '') {
      alert('Ingresa tu datos');
      return;
    } else {
      console.log(this.state);
      this.setState({isDisabled: true});
      this.setState({isVisible: true});

      const urlB = 'https://rmdsolutions.tech/WS';
      const servicio = '/login.php';

      const {user} = this.state;
      const {pass} = this.state;

      try {
        fetch(urlB + servicio, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user,
            password: pass,
          }),
        })
          .then(response => response.json())
          .then(responseJson => {
            {
              console.log(responseJson);
              this.setState({isVisible: false});
              if (responseJson[0].Token === '0') {
                this.setState({isDisabled: false});
                Alert.alert('Aviso', 'Usuario/contraseña Incorrecto');
              } else {
                const userToken = AsyncStorage.setItem(
                  'userToken',
                  String(responseJson[0].Token)
                );
                const Nombre = AsyncStorage.setItem(
                  'Nombre',
                  String(responseJson[0].Nombre)
                );
                const Apellido = AsyncStorage.setItem(
                  'Apellidos',
                  String(responseJson[0].Apellido)
                );
                const Correo = AsyncStorage.setItem(
                  'correo',
                  String(responseJson[0].Correo)
                );
                const Celular = AsyncStorage.setItem(
                  'celular',
                  String(responseJson[0].Celular)
                );
                const Servicios = AsyncStorage.setItem(
                  'servicios',
                  String(responseJson[0].Total_servicios)
                );
                const cumple = AsyncStorage.setItem(
                  'cumple',
                  String(responseJson[0].Cumple)
                );

                
                console.log(responseJson[0].Nombre);
                this.props.navigation.navigate('Dashboard');
              }
            }
          })
          .catch(error => {
            this.setState({isDisabled: false});

            console.log(error);
            alert(error);
            this.setState({isVisible: false});
          });
      } catch (error) {
        this.setState({isVisible: false});
        console.log(error);
        alert('2:' + error);
      }
    } //Fetcha data from server to login
  };

  async onFbLoginPress() {}
  requestLocationPermition = async () => {
    if (Platform.OS === 'ios') {
      return;
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'ReactNativeCode Location Permission',
            message: 'ReactNativeCode App needs access to your location ',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
          Alert.alert('Necesitamos saber donde estas');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00B7E2',
  },
  inputContainer: {
    borderBottomColor: '#00B7E2',
    backgroundColor: 'rgba(255,255,255,.7)',
    borderRadius: 12,
    borderBottomWidth: 1,
    width: '85%',
    height: 45,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  email: {
    marginTop: height / 11,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    color: '#00B7E2',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    width: '70%',
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#fff',
    marginLeft: width - width / 2,
    width: 120,
    borderRadius: 12,
  },
  loginText: {
    color: '#00B7E2',
  },
  text: {
    color: 'white',
    fontFamily: '../assets/fonts/Roboto-Light.ttf',
  },
  fb: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
});