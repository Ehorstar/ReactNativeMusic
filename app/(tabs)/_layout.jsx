import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { CartContext } from "../../contexts/Cart/CartContext";
import { useContext } from "react";
import Button from "../../UI/Button/Button";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const TabsLayout = () => {
  const { items, clearCart } = useContext(CartContext);

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: "#e91e63",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "index") {
            iconName = "home-outline";
          } else if (route.name === "cart") {
            iconName = "cart-outline";
          } else if (route.name === "profile") {
            iconName = "person-outline";
          } else if (route.name === "favourites") {
            iconName = "heart-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Магазин" }} />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Кошик",
          headerRight: () => (
            <Button
              variant="none"
              style={{ marginRight: 10 }}
              icon={<FontAwesome6 name="trash-alt" size={24} color="black" />}
              onPress={() => clearCart()}
            />
          ),
          tabBarBadge: items.length > 0 ? items.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "#9b5cff",
            color: "#fff",
            fontSize: 12,
            fontWeight: "700",
            shadowColor: "#9b5cff",
            shadowOpacity: 0.8,
            shadowRadius: 6,
          },
        }}
      />
      <Tabs.Screen name="favourites" options={{ title: "Обрані товари" }} />
      <Tabs.Screen name="profile" options={{ title: "Профіль" }} />
    </Tabs>
  );
};

const styles = StyleSheet.create({});

export default TabsLayout;
