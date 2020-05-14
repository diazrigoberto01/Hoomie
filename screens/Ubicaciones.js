import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Text, 
  AsyncStorage
} from 'react-native';
import Loading from '../components/Loading';

import {AppStyles, AppIcon} from './AppStyles';
import PlaceItem from '../components/placeItem';
import ActionButton from 'react-native-action-button';

export default class Ubicaciones extends Component {
  constructor(props) {
    super(props);
    this.getLocations.bind(this);
    this.state = {
      isLoading: true,
      JSON_from_server: [],
      isRefreshing: false,
    };
    this.onRefresh.bind(this);
  }

  getLocations = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // console.log(userToken);
    const urlB = 'https://rmdsolutions.tech/WS';
    const servicio = '/locations.php';

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
            isLoading: false,
          });
          //this.props.navigation.navigate('Dashboard')
        }
      })
      .catch(error => {
        console.log(error);
        alert(error);
      });
  };
  onRefresh = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken);
    const urlB = 'https://rmdsolutions.tech/WS';
    const servicio = '/locations.php';
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
          this.setState({JSON_from_server: []});
          this.setState({
            JSON_from_server: [...this.state.JSON_from_server, ...responseJson],
            isLoading: false,
            isRefreshing: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({isRefreshing: false});
      });
  };
  componentDidMount() {
    this.getLocations();
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ffff', alignItems: 'center'}}>
      {this.state.isLoading ? (
        <Loading isVisible={this.state.isLoading} text="Cargando..." />
      ) : (
        <FlatList
        style={{width:'100%'}}
        
          data={this.state.JSON_from_server}
          keyExtractor={item => item.Id}
          renderItem={itemData => (
            <PlaceItem
              image={itemData.item.Imagen}
              titulo={itemData.item.Nombre}
              direccion={itemData.item.Direccion}
              ultimo_servicio={itemData.item.ultimo_servicio}
              onSelect={() => {
                this.props.navigation.navigate('Detalles', {
                  id: itemData.item.Id,
                  titulo: itemData.item.Nombre,
                  direccion: itemData.item.Direccion,
                  image: itemData.item.Imagen,
                  lat: itemData.item.latitude,
                  lon: itemData.item.longitude,
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
      )}

      <ActionButton
        buttonColor={AppStyles.color.main}
        onPress={() => this.props.navigation.navigate('NuevaUbicacion')}
      />
    </View>
    );
  }
}
Ubicaciones.navigationOptions = navData => {
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
