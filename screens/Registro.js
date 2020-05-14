import React, {Component} from 'react';
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  AsyncStorage,
} from 'react-native';
import {AppStyles} from './AppStyles';
import DatePicker from 'react-native-datepicker';
import Loading from '../components/Loading';


export default class Registro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      nombre: '',
      apellido: '',
      phone: '',
      email: '',
      password: '',
      date: '1995-12-01',
      hoy: '',
    };
  }

  componentDidMount() {}

  registrate = async () => {
    //Fetcha data from server to login
    this.setState({loading: true});

    console.log(this.state);
    const urlB = 'https://rmdsolutions.tech/WS';
    const servicio = '/register.php';
    const {nombre} = this.state;
    const {apellido} = this.state;
    const {phone} = this.state;
    const {email} = this.state;
    const {password} = this.state;
    const {date} = this.state;

    fetch(urlB + servicio, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valor1: nombre,
        valor2: apellido,
        valor3: phone,
        valor4: email,
        valor5: password,
        valor6: date,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        {
          console.log(responseJson);
          if (!responseJson[0].Token) {
            alert('no');
          } else {
            const userToken = AsyncStorage.setItem(
              'userToken',
              String(responseJson[0].Token),
            );
            console.log(userToken);
            this.setState({loading: false});
            this.props.navigation.navigate('Dashboard', {showTutorial: true});
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View>
            <Text style={[styles.title, styles.leftTitle]}>
              Crear Nueva Cuenta
            </Text>
          </View>

          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Nombre"
              onChangeText={text => this.setState({nombre: text})}
              value={this.state.nombre}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Apellido"
              onChangeText={text => this.setState({apellido: text})}
              value={this.state.apellido}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Celular"
              onChangeText={text => this.setState({phone: text})}
              value={this.state.phone}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="E-mail "
              onChangeText={text => this.setState({email: text})}
              value={this.state.email}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Contraseña"
              secureTextEntry={true}
              onChangeText={text => this.setState({password: text})}
              value={this.state.password}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>

          <View>
            <Text style={{color:'black'}}>Fecha de Nacimiento</Text>
          </View>
          <DatePicker
            style={{width: 200, paddingTop: 20}}
            date={this.state.date} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2000-01-01"
            maxDate="1950-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={date => {
              this.setState({date: date});
            }}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.registrate} style={styles.button}>
              <Text style={styles.textB}>Registrarse</Text>
            </TouchableOpacity>
          </View>
          <Loading isVisible={this.state.loading} text="Cargando..." />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.main,
    marginTop: 20,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
  button: {
    backgroundColor: AppStyles.color.main,
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  textB: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '80%',
    paddingBottom: 20,
  },
  textT: {
    marginTop: 11,
    //marginLeft:1,
    color: AppStyles.color.grey,
  },
});
