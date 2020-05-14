import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  StyleSheet,
  AppState,
  Platform,
  AsyncStorage,
  FlatList,
  Alert,
  PermissionsAndroid,
  Picker,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AppIntroSlider from 'react-native-app-intro-slider';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {AppStyles} from './AppStyles';
import {mapStyle} from '../components/mapStyle';

const {width, height} = Dimensions.get('window');
import {Overlay, Image} from 'react-native-elements';
const servdispo = [
  {id: 1, title: 'Limpieza Regular', duracion: '4 hrs', costo: 300},
  {id: 2, title: 'Limpieza Extendida', duracion: '8 hrs', costo: 600},
];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
      appState: AppState.currentState,
      user: null,
      horaSele: '9:00',
      activemodal: null,
      isVisible: false,
      showTutorial: true,
      PickerValueHolder: '',
      PickerValueHolderPagos: '',
      dataSourceLocs: [{id: '0', Titulo: 'Ubicacion Actual'}],
      dataSourcepagos: [{id: '0', Digitos: 'Efectivo'}],
    };
  }
  //se ejecutA del render

  //manejar el tutorial
  _onDone = () => {
    this.setState({isVisibleTutorial: false});
  };
  _onSkip = () => {
    this.setState({isVisibleTutorial: false});
  };
  _renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          width: '80%',
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  ////////////////

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('Foreground');
      this.getLocationAsync();
    }
    this.setState({appState: nextAppState});
  };
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
  getuserInfo = async () => {
    //Preparar info para solicitar servico
    //obtener id, nombre de ubicaciones
    //obtener id,digitos metodos de pago
    const user = await AsyncStorage.getItem('userToken');
    this.setState({
      user: user,
      dataSourceLocs: [
        ...this.state.dataSourceLocs,
        ...[
          {id: '1', Titulo: 'Mi casa'},
          {id: '2', Titulo: 'Mi depa 1'},
          {id: '3', Titulo: 'Mi depa 2'},
          {id: '4', Titulo: 'Mi depa 3'},
          {id: '5', Titulo: 'Mi depa 4'},
        ],
      ],
      dataSourcepagos: [
        ...this.state.dataSourcepagos,
        ...[
          {id: '1', Digitos: '4452'},
          {id: '2', Digitos: '5244'},
          {id: '3', Digitos: '4549'},
          {id: '4', Digitos: '5643'},
          {id: '5', Digitos: '5745'},
        ],
      ],
    });
  };
  componentDidMount() {
    //manejar edo de la app and get the user token

    AppState.addEventListener('change', this.handleAppStateChange);
    this.requestLocationPermission();
    this.getLocationAsync();
    this.getuserInfo();
    const {navigation} = this.props;
    const isshowTutorial = navigation.getParam('alreadyLogin', null);
    console.log('tutorial' + isshowTutorial);
    this.setState({showTutorial: isshowTutorial});
  }

  handleMapRegionChange = mapRegion => {
    //console.log(mapRegion);
    this.setState(mapRegion);
  };
  renderService(item) {
    return (
      <View key={item.id} style={styles.service}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.title}</Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'normal',
              color: AppStyles.color.placeholder,
            }}>
            Tiempo: {item.duracion}
          </Text>
          {item.id === 1 ? (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.setState({horaSele: '9:00'})}
                style={
                  this.state.horaSele === '9:00'
                    ? styles.horarioS
                    : styles.horarios
                }>
                <Text
                  style={[
                    this.state.horaSele === '9:00'
                      ? {color: 'white', fontWeight: '900'}
                      : {color: 'black'},
                    {fontSize: 14},
                  ]}>
                  9:00
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({horaSele: '13:00'})}
                style={[
                  this.state.horaSele === '13:00'
                    ? styles.horarioS
                    : styles.horarios,
                  {marginLeft: 10},
                ]}>
                <Text
                  style={[
                    this.state.horaSele === '13:00'
                      ? {color: 'white', fontWeight: '900'}
                      : {color: 'black'},
                    {fontSize: 13},
                  ]}>
                  13:00
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => this.setState({horaSele: '9:00'})}
              style={
                this.state.horaSele === '9:00'
                  ? styles.horarioS
                  : styles.horarios
              }>
              <Text
                style={[
                  this.state.horaSele === '9:00'
                    ? {color: 'white', fontWeight: '900'}
                    : {color: 'black'},
                  {fontSize: 14},
                ]}>
                9:00
              </Text>
            </TouchableOpacity>
          )}

          <Text
            style={{
              fontSize: 14,
              fontWeight: 'normal',
              color: AppStyles.color.placeholder,
            }}>
            Llegamos en 15 min
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'normal',
              color: AppStyles.color.placeholder,
            }}>
            *Aplican comision en TC
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              this.setState({activemodal: item, isVisible: true});
            }} //
          >
            <View style={styles.askforService}>
              <Text style={{fontSize: 25, color: 'white', fontWeight: 'bold'}}>
                ${item.costo}*
              </Text>
              <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
                Solicitar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  renderServices() {
    return (
      <FlatList
        // showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        scrollEnabled
        centerContent
        scrollEventThrottle={16}
        snapToAlignment="center"
        style={styles.services}
        data={servdispo}
        extraData={this.state}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => this.renderService(item)}
      />
    );
  }
  renderLocs() {
    return (
      <View style={styles.MainContainer}>
        <Picker
          selectedValue={this.state.PickerValueHolder}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({PickerValueHolder: itemValue})
          }>
          {this.state.dataSourceLocs.map(item => (
            <Picker.Item
              label={item.Titulo}
              value={item.Titulo}
              key={item.id}
            />
          ))}
        </Picker>
      </View>
    );
  }
  renderMetodos() {
    console.log(this.state.dataSourcepagos);
    return (
      <View style={styles.MainContainer}>
        <Picker
          selectedValue={this.state.PickerValueHolderPagos}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({PickerValueHolderPagos: itemValue})
          }>
          {this.state.dataSourcepagos.map(item => (
            <Picker.Item
              label={item.Digitos}
              value={item.Digitos}
              key={item.id}
            />
          ))}
        </Picker>
      </View>
    );
  }

  renderModal() {
    const {activemodal, horaSele} = this.state;

    console.log(this.state.isVisible);
    if (!activemodal) {
      return null;
    }
    console.log(this.state.dataSource);
    return (
      <Overlay
        isVisible={this.state.isVisible}
        containerStyle={styles.modalContainer}
        windowBackgroundColor="rgba(255, 255, 255, .7)"
        animationType="slide"
        onBackdropPress={() => this.setState({isVisible: false})}>
        <View style={styles.modal}>
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              {this.state.activemodal.title}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'normal',
                color: AppStyles.color.placeholder,
              }}>
              {this.state.activemodal.duracion}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              ${this.state.activemodal.costo}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>{horaSele}</Text>
          </View>

          <View style={styles.modalLocations}>
            <View>
              <Text style={{textAlign: 'center', fontWeight: '500'}}>
                ¿A donde Vamos?
              </Text>
            </View>

            <View style={styles.modalHoursDropdown}>{this.renderLocs()}</View>
          </View>
          <View style={styles.modalLocations}>
            <View>
              <Text style={{textAlign: 'center', fontWeight: '500'}}>
                Selecciona el metodo de pago
              </Text>
            </View>

            <View style={styles.modalHoursDropdown}>
              {this.renderMetodos()}
            </View>
          </View>
        </View>
      </Overlay>
    );
  }
  renderTutorial() {
    return (
      <Overlay
        isVisible={this.state.showTutorial}
        containerStyle={styles.modalContainerTutorial}
        windowBackgroundColor="rgba(255, 255, 255, .3)"
        animationType="slide"
        onBackdropPress={() => this.setState({showTutorial: false})}>
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          onDone={this._onDone}
          showSkipButton={true}
          onSkip={this._onSkip}
        />
      </Overlay>
    );
  }
  async requestLocationPermission() {
    if (!Platform.OS === 'ios') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Hoomie',
            message: 'Necesitamos saber a donde vamos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          //alert("Permitido");
          return true;
        } else {
          console.log('location permission denied');
          //alert("Denegado");
          return false;
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

  async getLocationAsync() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({locationResult: JSON.stringify(position)});
        // Center the map on the location we just fetched.
        this.setState({
          mapRegion: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          },
        });
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          style={{flex: 1}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={this.state.mapRegion}
          onRegionChange={this.handleMapRegionChange}
          showsUserLocation={true}
        />
        {this.renderServices()}
        {this.renderModal()}
        {this.state.isVisibleTutorial ? this.renderTutorial() : null}
      </View>
    );
  }
}
Home.navigationOptions = navData => {
  return {
    headerLeft: (
      <TouchableOpacity
        style={styles.headerbutton}
        onPress={() => navData.navigation.openDrawer()}>
        <Text style={styles.headerbuttonT}>Menu</Text>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        style={styles.headerbutton}
        onPress={() => {
          console.log(state);
        }}>
        <Text style={styles.headerbuttonT}>Ayuda</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  services: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 30,
    //backgroundColor:'transparent'
  },
  headerbutton: {
    marginLeft: 10,
  },
  headerbuttonT: {
    color: 'white',
    fontSize: AppStyles.fontSize.normal,
    fontWeight: 'bold',
  },

  service: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 12,
    width: width - 24 * 2,
    marginHorizontal: 24,
  },
  askforService: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: AppStyles.color.main,
    padding: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  horarios: {
    borderRadius: 6,
    borderColor: AppStyles.color.main,
    borderWidth: 3,
    padding: 5,
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horarioS: {
    borderRadius: 6,
    borderColor: AppStyles.color.main,
    borderWidth: 3,
    padding: 5,
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.color.main,
  },
  modalContainer: {
    marginTop: 0,
    justifyContent: 'flex-end',
  },
  modal: {
    flexDirection: 'column',
    height: '90%',
    padding: 24,
    backgroundColor: AppStyles.color.background,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalLocations: {
    paddingVertical: 10,
    //backgroundColor: "blue"
  },
  modalHoursDropdown: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginTop: 26,
  },
  MainContainer: {
    paddingTop: Platform.OS === 'ios' ? 50 : 5,
    justifyContent: 'center',
    flex: 1,
    margin: 0,
  },
  modalTutorial: {flex: 1},
  image: {
    width: 200,
    height: 200,
  },
  modalContainerTutorial: {
    justifyContent: 'flex-end',
  },
});
const slides = [
  {
    key: 's1',
    text: 'Best Recharge offers',
    title: 'Mobile Recharge',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png',
    },
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'Flight Booking',
    text: 'Upto 25% off on Domestic Flights',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
    },
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'Great Offers',
    text: 'Enjoy Great offers on our all services',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
    },
    backgroundColor: '#17aad5',
  },
];
