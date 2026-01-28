import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../UI/Button/Button";
import Fontisto from "@expo/vector-icons/Fontisto";

const NotAuthProfile = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Account</Text>

        <View style={styles.headerContent}>
          <Fontisto name="applemusic" size={35} color="white" />
          <Text style={styles.text}>Best tracks.</Text>
          <Text style={styles.text}>For you in SoundFlow.</Text>
        </View>
      </View>

      <View style={styles.center}>
        <Button
          text="Registration"
          variant="register"
          textColor="black"
          onPress={() => router.push("/register")}
        />
        <Button
          text="Login"
          variant="login"
          textColor="white"
          onPress={() => router.push("/login")}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.textFooter}>© 2026 SoundFlow</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flex: 1,
    paddingTop: 60, 
    paddingBottom: 50,
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  text: {
    color: "white",
    fontSize: 28,
    fontWeight: "800",
  },
  textFooter: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
});

export default NotAuthProfile;
