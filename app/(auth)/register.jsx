import { StyleSheet, Text, View } from "react-native";
import AppTextInput from "../../UI/TextInput/AppTextInput";
import { useState } from "react";
import Button from "../../UI/Button/Button";
import { useAuth } from "../../contexts/Auth/AuthContext";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorName, setErrorName] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const router = useRouter();

  const { register, login } = useAuth();

  const handleRegister = async () => {
    
    if (!name) setErrorName("Name is required");
    else setErrorName(null);

    if (!email) setErrorEmail("Email is required");
    else setErrorEmail(null);

    if (!password) setErrorPassword("Password is required");
    else setErrorPassword(null);

    if (!email || !password || !name) return;

    try {
      await register({ name, email, password });
      await login({ email, password });
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          variant="transparent"
          icon={<Feather name="arrow-left" size={28} color="white" />}
          onPress={() => router.push("/profile")}
          style={styles.backBtn}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.form}>
          <AppTextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            error={errorName}
          />

          <AppTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            error={errorEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <AppTextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={errorPassword}
          />

          <View style={styles.actions}>
            <Button
              text="Registration"
              variant="register"
              textColor="black"
              onPress={handleRegister}
            />
            <Text style={styles.text}>Already have an account?</Text>
            <Button
              text="Login"
              onPress={() => router.push("/(auth)/login")}
              variant="secondary"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },

  header: {
    paddingHorizontal: 8,
    paddingTop: 4,
    alignItems: "flex-start",
  },
  backBtn: {
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 999,
  },

  content: {
    flex: 1,
    paddingHorizontal: 18,
    justifyContent: "center",
  },

  form: {
    gap: 12,
  },

  actions: {
    marginTop: 8,
    gap: 12,
  },

  text: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    textAlign: "center",
  },
});

export default Register;
