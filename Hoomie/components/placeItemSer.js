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


export default class PlaceItemSer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onSelect} style={styles.placeItemSer}>
        <View>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{ uri: this.props.imageU }}
            PlaceholderContent={
              <ActivityIndicator color={AppStyles.color.main} size="small" />
            }
          />
          
        </View>
        <View style={styles.info}>
          <Text style={styles.titulo, {textAlign: 'left', marginBottom: 5}}>{this.props.fecha} {this.props.hora}</Text>
          <Text style={{color: '#CECECE', marginBottom: 5}}>{this.props.estado}</Text>
          <Text style={{fontWeight: 'bold'}}>MXN${this.props.costo}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  placeItemSer: {
    marginVertical: 15,
    marginHorizontal: 33, 
    width:'100%',
    maxWidth:350,
    maxHeight: 320,
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
    bottom: 45,
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
