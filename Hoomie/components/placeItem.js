import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Image } from "react-native-elements";
import { AppStyles } from "../screens/AppStyles";

export default class PlaceItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onSelect} style={styles.placeItem}>
        <View >
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{ uri: this.props.image }}
            PlaceholderContent={
              <ActivityIndicator color={AppStyles.color.main} size="small" />
            }
          />
          
        </View>
        <View style={styles.info}>
          <Text style={styles.titulo, {textAlign: 'left', color: '#00b7e2', fontWeight: 'bold'}}>{this.props.titulo}</Text>
          <Text style={styles.direccion}>{this.props.direccion}</Text>
          <Text style={{top: 19, color: '#CECECE'}}>Solicitado por última vez el: {this.props.ultimo_servicio} </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  placeItem: {
    marginVertical: 15,
    marginHorizontal: 33, 
    width:'100%',
    maxWidth:350,
    maxHeight: 300,
    justifyContent:'center',
    alignItems:'center',
    shadowColor:'black',
    shadowOpacity:0.26,
    shadowOffset:{width:0,height:2},
    shadowRadius:8,
    elevation:5,
    backgroundColor:'#FFFFFF',
    borderRadius:10
  },

  image: {
    width: 345,
    height: 270,
    marginBottom: 50,
    borderColor: '#A0A0A0'

  },
  info: {
    bottom: 80,
    marginLeft: -20,
    width: 250,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  titulo: {
    color: AppStyles.color.title,
    fontSize: AppStyles.fontSize.content,
    marginBottom: 5
  },
  direccion: {
    top: '12%',
    color: AppStyles.color.subtitle,
    fontSize: AppStyles.fontSize.normal
  }
});
