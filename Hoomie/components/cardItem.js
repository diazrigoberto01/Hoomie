import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { AppStyles } from "../screens/AppStyles";
import { Image } from "react-native-elements";

export default class cardItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { card } = this.props;
    const { Digitos } = card.item;
    const { Tipo } = card.item;
    const { Nombre } = card.item;
    
   
    //console.log(image)
    return (
      <TouchableOpacity
        onPress={() => console.log("Tarjeta seleccionada" + Digitos)}
        style={styles.cardItem}
      >
        <View style={{ marginRight: 10 }}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={Tipo==='visa'?require('../assets/visa.png'):require("../assets/master.png")}
            PlaceholderContent={
              <ActivityIndicator color={AppStyles.color.main} size="small" />
            }
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.titulo}>{Digitos}</Text>
          <Text style={styles.direccion}>{Nombre}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  cardItem: {
    borderBottomColor: AppStyles.color.grey,
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    shadowColor:'black',
    shadowOpacity:0.26,
    shadowOffset:{width:0,height:2},
    shadowRadius:8,
    elevation:5,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: AppStyles.borderRadius.main,
    //backgroundColor: AppStyles.color.background,
    borderColor: AppStyles.color.grey
  },
  info: {
    marginLeft: 25,
    width: 250,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  titulo: {
    color: AppStyles.color.title,
    fontSize: AppStyles.fontSize.content,
    marginBottom: 5
  },
  direccion: {
    color: AppStyles.color.subtitle,
    fontSize: AppStyles.fontSize.normal
  }
});
