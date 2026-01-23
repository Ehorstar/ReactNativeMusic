import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import ProductCard from "../../components/ProductCard";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ProductsAPI } from "../../api/products"; // ✅ шлях перевір

const HomeScreen = () => {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const json = await ProductsAPI.getAll(); // ✅ запит до бекенду
        setProducts(json.data); // бо бекенд повертає { data: [...] }
      } catch (e) {
        console.log("Products error:", e.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id} // ✅ Mongo id
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ padding: 12, gap: 12 }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onProductPress={() => router.push(`/product/${item._id}`)} // ✅ Mongo id
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default HomeScreen;
