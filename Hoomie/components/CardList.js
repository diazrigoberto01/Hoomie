import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,

} from "react-native";
import Card from "../components/cardItem";
import Loading from "../components/Loading";
import { AppStyles } from "../screens/AppStyles";

const CardList = props => {
  const { data, isLoading, moreContent } = props;
  //console.log(data);

  return (
    <View style={{flex:1,alignItems:'center'}}>
      {data ? (
        <FlatList
          data={data}
          renderItem={card => <Card card={card} />}
          keyExtractor={item => item.Id}
          onEndReached={moreContent}
          onEndReachedThreshold={0}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <Loading isVisible={true} text="Cargando Tarjetas..." />
      )}
    </View>
  );
};
const FooterList = props => {
  const { isLoading } = props;
  console.log(isLoading);
  if (isLoading) {
    console.log(isLoading);
    return (
      <View style={styles.isloading}>
        <ActivityIndicator size={"large"} color={AppStyles.color.main} />
      </View>
    );
  } else {
    return (
      <View style={styles.notResults}>
      
      </View>
    );
  }
};
const styles = StyleSheet.create({
  isloading: {
    marginTop: 20,
    alignItems: "center"
  },
  notResults: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center"
  },
  loader: {
    marginTop: 10,
    marginBottom: 10
  }
});
export default CardList;
