import { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import TrackCard from "../../components/TrackCard";
import { FavouritesContext } from "../../contexts/Favourites/FavouritesContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Favourites = () => {
  const { favourites } = useContext(FavouritesContext);

  const hasItems = favourites?.length > 0;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Favourites</Text>
          <Text style={styles.subtitle}>
            {hasItems ? `${favourites.length} liked tracks` : "No saved tracks"}
          </Text>
        </View>
      </View>

      {!hasItems ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Немає обраного</Text>
          <Text style={styles.emptySub}>
            Натискай на сердечко — і трек зʼявиться тут.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <TrackCard track={item} />}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0B0B0F",
  },

  header: {
    paddingHorizontal: 14,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  title: {
    color: "#EDEDED",
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 0.2,
  },

  subtitle: {
    marginTop: 4,
    color: "rgba(237,237,237,0.68)",
    fontSize: 13,
    fontWeight: "600",
  },

  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  clearText: {
    color: "#EDEDED",
    fontWeight: "700",
    fontSize: 13,
  },

  listContent: {
    padding: 14,
    paddingBottom: 26,
  },

  empty: {
    flex: 1,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    color: "#EDEDED",
    fontSize: 18,
    fontWeight: "800",
  },

  emptySub: {
    marginTop: 8,
    color: "rgba(237,237,237,0.68)",
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 18,
  },
});

export default Favourites;
