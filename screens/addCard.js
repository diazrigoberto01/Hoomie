import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  AsyncStorage,
  Alert,
} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';
import Conekta from 'react-native-conekta';

const addCard = props => { 
  const conektaApi = new Conekta();
  const {navigation} = props;
  const {setisreload} = navigation.state.params;
  const [numberCard, setNumberCard] = useState(0);
  const [numberCvc, setNumberCvc] = useState(0);
  const [expiry, setExpiry] = useState('');
  const [isDisable, setisDisable] = useState(true);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    //console.log(props);
  }, []);

  const _onFocus = field => console.log('focusing', field);
  const _onChange = form => {
    //console.log(form);
    if (form.status.number === 'valid') {
      //console.log('valid Number');
      setNumberCard(form.values.number);
      setType(form.values.type);
      //console.log(numberCard);
    }
    if (form.status.cvc === 'valid') {
      //console.log('valid CVC');
      setNumberCvc(form.values.cvc);
      //console.log(numberCvc);
    }
    if (form.status.expiry === 'valid') {
      //console.log('valid expiry');
      setExpiry(form.values.expiry);
      //console.log(expiry);
    }
    if (form.status.name === 'valid') {
      //console.log('valid name');
      setName(form.values.name);
      //console.log(name);
    }
    if (form.valid) {
      setisDisable(false);
    }
  };
  const saveCard = async props => {
    const a = props;
    const user = await AsyncStorage.getItem('userToken');
    const urlB = 'https://rmdsolutions.tech/WS';
    const servicio = '/addC.php';
    const strNumber = numberCard;
    const resDigitos = strNumber.substring(
      strNumber.length - 4,
      strNumber.length,
    );
    const str = expiry;
    const resExpiry = str.split('/');

    //usar el numero para generar token
   

    conektaApi.setPublicKey('key_IQRyS8gcqCSTVffga5r8fqA');

     conektaApi.createToken(
      {
        cardNumber: numberCard,
        name: name,
        cvc: numberCvc,
        expMonth: resExpiry[0],
        expYear: resExpiry[1],
      },
      function(data) {
        console.log(data)
         fetch(urlB + servicio, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            valor0: user,
            valor1: data.id,
            valor2: resDigitos,
            valor3: type,
            valor4: name,
          }),
        })
          .then(response => response.json())
          .then(responseJson => {
            {
              alert(responseJson);
              setisreload(true);
              navigation.goBack();
            }
          })
          .catch(function(error) {
            console.log("Hay un problema")
            throw error;
          }); // data.id to get the Token ID
      },
      function() {
        console.log('Error!');
      },
    );
    //Guardar ultimos 4 digitos nadamas
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text>logo</Text>
      </View>

      <CreditCardInput
        autoFocus
        requiresName={true}
        requiresCVC
        labelStyle={styles.label}
        inputStyle={styles.input}
        validColor={'black'}
        invalidColor={'red'}
        placeholderColor={'darkgray'}
        onFocus={_onFocus}
        onChange={_onChange}
      />

      <Button
        buttonStyle={styles.fbLoginButton}
        onPress={saveCard}
        title="Guardar"
        color="#3897f1"
        disabled={isDisable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#F5F5F5',
    marginTop: 60,
  },
  label: {
    color: 'black',
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: 'black',
  },
});

export default addCard;