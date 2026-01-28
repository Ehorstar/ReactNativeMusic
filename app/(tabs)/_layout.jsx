import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import PlayingLayout from "../../components/playingLayout";
import { usePlayingStore } from "../../store/playingStore";

const TabsLayout = () => {
  const currentTrack = usePlayingStore((s) => s.currentTrack);
  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.green,
          tabBarInactiveTintColor: COLORS.text,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "rgba(18,18,18,0.85)",
            borderTopWidth: 0,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "index") {
              iconName = "home-outline";
            } else if (route.name === "profile") {
              iconName = "person-outline";
            } else if (route.name === "favourites") {
              iconName = "heart-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen name="index" options={{ title: "Головна" }} />
        <Tabs.Screen name="favourites" options={{ title: "Обрані треки" }} />
        <Tabs.Screen name="profile" options={{ title: "Профіль" }} />
      </Tabs>
      {currentTrack && <PlayingLayout />}
    </>
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
const styles = StyleSheet.create({});

export default TabsLayout;
