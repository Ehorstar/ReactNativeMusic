import React, { useContext, useMemo } from "react";
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

const GAP = 14;
const COLORS = {
  bg: "#0B0B0F",
  card: "#14141A",
  text: "#EDEDED",
  sub: "rgba(237,237,237,0.68)",
  green: "#1DB954",
  border: "rgba(255,255,255,0.06)",
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  header: {
    paddingHorizontal: GAP,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  title: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 0.2,
  },

  subtitle: {
    marginTop: 4,
    color: COLORS.sub,
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
    borderColor: COLORS.border,
  },

  clearText: {
    color: COLORS.text,
    fontWeight: "700",
    fontSize: 13,
  },

  listContent: {
    padding: GAP,
    paddingBottom: 26,
  },

  empty: {
    flex: 1,
    paddingHorizontal: GAP,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "800",
  },

  emptySub: {
    marginTop: 8,
    color: COLORS.sub,
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 18,
  },
});

export default Favourites;
