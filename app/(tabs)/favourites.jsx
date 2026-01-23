import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ProductCard from "../../components/ProductCard";
import { FavouritesContext } from "../../contexts/Favourites/FavouritesContext";
import { useRouter } from "expo-router";

const Favourites = () => {
  const { favourites } = useContext(FavouritesContext);
  const router = useRouter();

  if (favourites.length === 0) {
    return (
      <View>
        <Text>Немає обраного</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={favourites}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onProductPress={() => router.push(`/product/${item._id}`)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Favourites;
