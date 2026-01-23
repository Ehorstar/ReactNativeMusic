import { FlatList, StyleSheet, Text, View } from "react-native";
import { CartContext } from "../../contexts/Cart/CartContext";
import { useContext } from "react";
import Button from "../../UI/Button/Button";
import ProductCart from "../../components/ProductCart";

const CartScreen = () => {
  const {
    items,
    totalPrice,
  } = useContext(CartContext);

  if (items.length === 0) {
    return (
      <View>
        <Text>Кошик порожній</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <ProductCart item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CartScreen;
