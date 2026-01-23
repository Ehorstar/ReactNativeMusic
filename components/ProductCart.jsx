import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../UI/Button/Button";
import { useContext } from "react";
import { CartContext } from "../contexts/Cart/CartContext";
import { useRouter } from "expo-router";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Reanimated, { useAnimatedStyle } from "react-native-reanimated";

const RightAction = ({ _id, progress }) => {
  const { removeFromCart } = useContext(CartContext);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress ? progress.value : 0,
    transform: [
      {
        scale: progress.value ? progress.value : 0,
      },
    ],
  }));

  return (
    <View style={styles.rightAction}>
      <Reanimated.View style={animatedStyle}>
        <Button
          variant="none"
          icon={<FontAwesome6 name="trash-alt" size={30} color="black" />}
          onPress={() => removeFromCart(_id)}
        />
      </Reanimated.View>
    </View>
  );
};

const ProductCart = ({ item }) => {
  const { incrementQuantity, decrementQuantity } = useContext(CartContext);
  const router = useRouter();

  return (
    <ReanimatedSwipeable
      renderRightActions={(progress) => (
        <RightAction _id={item._id} progress={progress} />
      )}
    >
      <View style={styles.container}>
        <Pressable onPress={() => router.push(`/product/${item._id}`)}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </Pressable>

        <View style={styles.content}>
          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
          <View style={styles.buttons}>
            <Button
              text="-"
              variant="secondary"
              style={styles.btn}
              onPress={() => decrementQuantity(item._id)}
            />
            <Text style={styles.qty}>{item.quantity}</Text>
            <Button
              text="+"
              variant="secondary"
              style={styles.btn}
              onPress={() => incrementQuantity(item._id)}
            />
          </View>
        </View>
      </View>
    </ReanimatedSwipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    marginHorizontal: 12,
    // marginVertical: 6,
    alignItems: "center",
    elevation: 2,
  },
  rightAction: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  image: {
    borderRadius: 12,
    width: 50,
    height: 50,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    flexShrink: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
  },
  price: {
    fontSize: 15,
    fontWeight: "600",
    color: "#5fa35f",
    marginTop: 4,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  qty: {
    textAlign: "center",
    fontWeight: "500",
  },
});

export default ProductCart;
