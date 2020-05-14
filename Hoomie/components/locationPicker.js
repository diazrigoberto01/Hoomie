import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {AppStyles} from '../screens/AppStyles';
import MapPreview from '../components/MapPreview';

const {width, height} = Dimensions.get('window');
import env from '../env';
const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(true);
  const [pickedLocation, setPickedLocation] = useState({});
  

  const mapPickedLocation = props.navigation.getParam('pickedLocation');

  const {onLocationPicked} = props;
  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }),
    [mapPickedLocation, onLocationPicked];
  useEffect(() => {
    getLocationHandler();
  }, []);

  const verifyPermissions = async () => {
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
  };

  const getLocationHandler = async () => {
     console.log("hey")
    if (!Platform.OS === 'ios') {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        console.log('SAle');
        return;
      }
    }

    try {
      Geolocation.getCurrentPosition(
        position => {
          setPickedLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            address: null,
            cp: null,
            colonia: null,
          });
          props.onLocationPicked({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            address: null,
            cp: null,
            colonia: null,
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

      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pickedLocation.lat},${pickedLocation.lon}&key=${env.googleApiKey}`;
console.log(pickedLocation.lat)
      await fetch(url)
        .then(response => response.json()
        )
        .then(responseJson => {
          {
            //console.log('Aqui falla')
            //console.log(responseJson);
            const address = responseJson.results[0].formatted_address;
            const colony =
              responseJson.results[0].address_components[2].long_name;
            let cp = responseJson.results[0].address_components[6].long_name;
            if (!cp) {
              cp = responseJson.results[0].address_components[5].long_name;
            }

            props.onLocationPicked({
              lat: pickedLocation.lat,
              lon: pickedLocation.lon,
              address: address,
              cp: cp,
              colonia: colony,
            });
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (err) {
      console.log(""+err.toString());

      /*Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{text: 'Okay'}],
      );*/
    }

    setIsFetching(false);

    //alert('lat'+this.state.lat+ 'lon'+this.state.lon)
  };
  const selonMap = () => {
    props.navigation.navigate('Map', {
      titulo: props.titulo,
      initialLocation: pickedLocation,
    });
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        Location={pickedLocation}
        onPress={selonMap}>
        {isFetching ? (
          <ActivityIndicator size="large" color={AppStyles.color.main} />
        ) : (
          <Text>¡Busca en el mapa!</Text>
        )}
      </MapPreview>

      <Button
        title="Busca en el mapa"
        //color={Colors.primary}
        onPress={selonMap}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: height / 4,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default LocationPicker;
