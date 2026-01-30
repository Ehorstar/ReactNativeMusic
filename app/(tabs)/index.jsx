import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  Image,
  Pressable,
} from "react-native";
import TrackCard from "../../components/TrackCard";
import { getTracks } from "../../services/tracks.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const obj = useQuery({
    queryKey: ["tracks"],
    queryFn: () => getTracks(),
  });

  const { data: tracks = [], isLoading: loading, isRefetching, refetch } = obj;
  const router = useRouter();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            router.push("/profile");
          }}
        >
          <Image
            source={require("../../assets/user.png")}
            style={styles.logo}
          />
        </Pressable>
        <View>
          <Text style={styles.hTitle}>SoundFlow</Text>
          <Text style={styles.hSub}>Recommended for you</Text>
        </View>
      </View>

      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.col}>
            <TrackCard track={item} />
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor="#1DB954"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0B0B0F",
    paddingTop: 40,
  },

  header: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  hTitle: {
    color: "#EDEDED",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.2,
  },

  hSub: {
    marginTop: 4,
    color: "rgba(237,237,237,0.68)",
    fontSize: 13,
    fontWeight: "600",
  },

  listContent: {
    padding: 14,
    paddingBottom: 28,
  },

  row: {
    gap: 14,
    marginBottom: 14,
  },

  col: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "rgba(0, 0, 0, 0.6)",
  },

  logo: {
    width: 50,
    height: 50,
  },
});

export default HomeScreen;
