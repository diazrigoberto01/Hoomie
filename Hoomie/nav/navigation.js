import React, { Component } from "react";
import {
  View,
  StatusBar,
  AsyncStorage
} from "react-native";

import { AppStyles } from "../screens/AppStyles";

import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator
} from "react-navigation";

import Login from "../screens/Login";
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Perfil";
import Servicios from "../screens/Servicios";
import Ubicaciones from "../screens/Ubicaciones";
import Pagos from "../screens/Pagos";
import CustomDrawer from "../screens/CustomDrawer";
import Registro from "../screens/Registro";
import DetallesUbicaciones from "../screens/detallesUbi";
import newloc from "../screens/newLoc";
import MapScreen from "../screens/MapScreen";
import Loading from "../components/Loading";
import addCard from "../screens/addCard";
import DetallesServicios from "../screens/DetallesServicios";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log(userToken);
    this.props.navigation.navigate(
      userToken === null || undefined ? "Welcome" : "Dashboard"
    ),{alreadyLogin:true};
  };
  // This will switch to the App screen or Auth screen and this loading
  // screen will be unmounted and thrown away.
  // Render any loading content that you like here
  render() {
    return (
      <View
        style={{ alignContent: "center", justifyContent: "center", flex: 1 }}
      >
        <StatusBar barStyle="light-content" backgroundColor={AppStyles.color.main} />
        <Loading isVisible={true} text="Cargando..." />
      </View>
    );
  }
}

const HomeStackNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: AppStyles.color.main
      },
      headerTintColor: AppStyles.color.white,
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerBackTitle: null
    }
  }
);
const ProfileStackNavigator = createStackNavigator(
  {
    Perfil: { screen: ProfileScreen }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: AppStyles.color.main
      },
      headerTintColor: AppStyles.color.white,
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerBackTitle: null
    }
  }
);

const ServiciosStackNavigator = createStackNavigator(
  {
    Servicios: { screen: Servicios },
    DetallesServicios: { screen: DetallesServicios }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: AppStyles.color.main
      },
      headerTintColor: AppStyles.color.white,
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerBackTitle: null
    }
  }
);

const UbicacionesStackNavigator = createStackNavigator(
  {
    Ubicaciones: { screen: Ubicaciones },
    Detalles: { screen: DetallesUbicaciones },
    NuevaUbicacion: { screen: newloc },
    Map: { screen: MapScreen }
  },
  {
    initialRouteName: "Ubicaciones",
    headerMode: "screen",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: AppStyles.color.main
      },
      headerTintColor: AppStyles.color.white,
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerBackTitle:null
    }
  }
);
const PagosStackNavigator = createStackNavigator(
  {
    Pagos: { screen: Pagos },
    newCard: { screen: addCard }
  },
  {
    initialRouteName: "Pagos",
    headerMode: "screen",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: AppStyles.color.main
      },
      headerTintColor: AppStyles.color.white,
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerBackTitle:null
    }
  }
);
const WelcomeStack = createStackNavigator(
  {
    Login: { screen: Login },
    Registro: { screen: Registro }
  },
  {
    initialRouteName: "Login",
    headerMode: "screen",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: AppStyles.color.main
      },
      headerTintColor: AppStyles.color.white,
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerBackTitle:null
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Inicio: {
      screen: HomeStackNavigator
    },
    "Mi Perfil": {
      screen: ProfileStackNavigator
    },
    "Mis Servicios": {
      screen: ServiciosStackNavigator
    },
    "Mis Ubicaciones": {
      screen: UbicacionesStackNavigator
    },
    "Metodos de Pago": {
      screen: PagosStackNavigator
    }
  },
  {
    hideStatusBar: false,
    drawerPosition: "left",
    contentComponent: CustomDrawer
  }
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    Auth: { screen: AuthLoadingScreen },
    Welcome: { screen: WelcomeStack },
    Dashboard: { screen: AppDrawerNavigator }
  },
  {
    initialRouteName: "Auth"
  }
);

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;
