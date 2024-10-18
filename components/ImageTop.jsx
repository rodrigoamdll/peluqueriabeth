import { StyleSheet, View, Image, Dimensions } from "react-native";
import Logo from "..//img/logo.png";
import Wave from "..//img/wave.png";

export const ImagenTop = () => {
  return (
    <View style={styles.imageContainer}>
      <Image source={Wave} style={styles.imageTop} resizeMode="cover" />
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
  },
  imageTop: {
    width: Dimensions.get("window").width, // Ancho completo de la pantalla
    height: Dimensions.get("window").height * 0.4, // 40% de la altura de la pantalla
    position: "relative"
  },
  logo: {
    width: 200,
    height: 200,
    position: "absolute",
    top: 50, // Ajusta la posición del logo para que esté dentro de la imagen de fondo
    zIndex: 1,
  },
});
