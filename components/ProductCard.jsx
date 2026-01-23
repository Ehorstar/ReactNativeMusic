import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../UI/Button/Button";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useContext } from "react";
import { FavouritesContext } from "../contexts/Favourites/FavouritesContext";

const ProductCard = ({ product, onProductPress }) => {
  const { inFavourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);

  return (
    <Pressable onPress={onProductPress} style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
      <Button
        variant="none"
        icon={
          inFavourites(product._id) ? (
            <Fontisto name="heart" size={24} color="black" />
          ) : (
            <Fontisto name="heart-alt" size={24} color="black" />
          )
        }
        style={{ position: "absolute", top: 2, right: 0 }}
        onPress={() => {
          if (inFavourites(product._id)) {
            removeFromFavourites(product._id);
          } else {
            addToFavourites(product);
          }
        }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3, // Android shadow
  },
  image: {
    width: "100%",
    height: 160,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#5fa35f",
  },
});

export default ProductCard;
