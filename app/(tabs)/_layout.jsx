import { Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname } from "expo-router";
import { StyleSheet } from "react-native";
import PlayingLayout from "../../components/playingLayout";
import { usePlayingStore } from "../../store/playingStore";
import { useContext, useEffect } from "react";
import { FavouritesContext } from "../../contexts/Favourites/FavouritesContext";

const TabsLayout = () => {
  const currentTrack = usePlayingStore((s) => s.currentTrack);
  const pathname = usePathname();
  const { favourites } = useContext(FavouritesContext);
  const stop = usePlayingStore((s) => s.stop);

  const isProfile = pathname === "/profile";

  useEffect(() => {
    if (isProfile) {
      stop();
    }
  }, [isProfile, stop]);

  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#1DB954",
          tabBarInactiveTintColor: "#EDEDED",
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
        <Tabs.Screen
          name="favourites"
          options={{
            title: "Обрані треки",
            tabBarBadge: favourites.length > 0 ? favourites.length : undefined,
            tabBarBadgeStyle: {
              backgroundColor: "#1DB954",
              color: "#000",
              fontSize: 11,
              minWidth: 18,
              height: 18,
              borderRadius: 9,
              paddingHorizontal: 4,
            },
          }}
        />
        <Tabs.Screen name="profile" options={{ title: "Профіль" }} />
      </Tabs>
      {!isProfile && currentTrack && <PlayingLayout />}
    </>
  );
};

const styles = StyleSheet.create({});

export default TabsLayout;
