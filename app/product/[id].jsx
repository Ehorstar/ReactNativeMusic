import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "../../UI/Button/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/Cart/CartContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProductsAPI } from "../../api/products"; // ✅ шлях перевір

const ProductScreen = () => {
  const { id } = useLocalSearchParams(); // ✅ з [id].jsx
  const { addToCart, isInCart } = useContext(CartContext);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const json = await ProductsAPI.getById(id);
        setProduct(json.data); // бекенд: { data: product }
      } catch (e) {
        console.log("Product error:", e.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Товар не знайдено</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} />

        <View style={styles.line}>
          <Text style={styles.title}>{product.title}</Text>
        </View>

        <Text style={styles.text}>{product.description}</Text>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <Text style={styles.price}>${product.price}</Text>
        <Button
          text={isInCart(product._id) ? "В кошику" : "В кошик"} 
          variant="primary"
          style={styles.button}
          onPress={() => {
            addToCart(product);
            router.push("/cart");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 12, gap: 12 },
  image: { width: "100%", height: 250, borderRadius: 8 },
  title: { fontSize: 20, fontWeight: "500", paddingBottom: 20, paddingTop: 12 },
  text: { fontSize: 16, paddingBottom: 12, paddingTop: 12 },
  line: { borderBottomWidth: 1, borderBottomColor: "gray" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    marginTop: "auto",
  },
  price: { fontSize: 30, fontWeight: "600", color: "#5fa35f" },
  button: { width: "50%" },
});

export default ProductScreen;
