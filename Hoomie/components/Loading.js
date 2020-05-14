import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";
import { AppStyles } from "../screens/AppStyles";

//Componente Loading para mostrar en todas las esperas del usuario
const Loading = props => {
  const { isVisible, text } = props;

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color={AppStyles.color.main} />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
};
const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: AppStyles.color.main,
    borderWidth: 2,
    borderRadius: 10
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: AppStyles.color.main,
    textTransform: "uppercase",
    marginTop: 10
  }
});

export default Loading;
