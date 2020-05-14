import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text,TouchableOpacity, AsyncStorage } from "react-native";
import CardList from "../components/CardList";

import { AppStyles } from "./AppStyles";
import ActionButton from "react-native-action-button";
import Loading from "../components/Loading";



const Pagos = props => {
  const { navigation } = props;
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [isLoadingF, setIsLoadingF] = useState(true);

  async function getCards() {
    const userToken = await AsyncStorage.getItem("userToken");
    
    //console.log(userToken);
    //Aqui obtener datos del servidor
    const urlB = "https://rmdsolutions.tech/WS";
    const servicio = "/getC.php";

    fetch(urlB + servicio, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        valor0: userToken
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        {
          console.log(responseJson);

          setCards([...responseJson]);
          setIsLoadingF(false);
          //this.props.navigation.navigate('Dashboard')
        }
      })
      .catch(error => {
        console.error(error);
      });

    
  }

  async function getMoreCards() {
    setIsLoading(true);
    //solicitar mas contenido al servidro web se hace desde aca
    //console.log(userToken);
    //Aqui obtener datos del servidor
    
  setIsLoading(false);
  }

  useEffect(() => {
    getCards();
    setIsReload(false);
    console.log(cards)
  }, [isReload]);

  // console.log(props);
  return (
    <View style={styles.cont}>
    {isLoadingF?<Loading isVisible={isLoadingF} text="Cargando..." />: cards.length>0?<CardList  data={cards} isLoading={isLoading} moreContent={getMoreCards} />:
    <View><Text>no hay tarjetas</Text></View>}
   
      
      {<AddCard navigation={navigation} setisreload={setIsReload}/>}
    </View>
  );
};


function AddCard(props){
const {navigation,setisreload}=props;
return(<ActionButton buttonColor={AppStyles.color.main}  onPress={() => navigation.navigate("newCard",{setisreload})} />);
}
Pagos.navigationOptions=navData=>{

  return{
      headerLeft:<TouchableOpacity  style={styles.headerbutton}  onPress={() => navData.navigation.openDrawer()}>
          <Text style={styles.headerbuttonT}>Menu</Text>
      </TouchableOpacity> 
      
      
  };
}


const styles = StyleSheet.create({
  cont:{
    flex:1
  },
  headerbutton:{
    marginLeft:10
  },
  headerbuttonT:{
    color:'white',
    fontSize:AppStyles.fontSize.normal,
    fontWeight:'bold'
  }
});

export default Pagos;
