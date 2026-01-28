import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../contexts/Auth/AuthContext";
import Button from "../../UI/Button/Button";
import { useState } from "react";
import AppModal from "../../UI/AppModal/appModal/AppModal";

const AuthProfile = () => {
  const { user, logout } = useAuth();
  const [show, setShow] = useState(false);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Profile {user.name}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
      </View>

      <Button
        text="Logout"
        variant="danger"
        onPress={() => setShow(true)}
        style={styles.logoutBtn}
      />
      {show ? (
        <AppModal
          visible={show}
          onClose={() => setShow(false)}
          title="Logout"
          subtitle="Are you sure you want to log out?"
        >
          <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
            <Button
              text="Cancel"
              variant="secondary"
              onPress={() => setShow(false)}
              style={{ flex: 1 }}
            />
            <Button
              text="Logout"
              variant="danger"
              onPress={logout}
              style={{ flex: 1 }}
            />
          </View>
        </AppModal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#14141A",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },

  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",
  },

  row: {
    marginBottom: 12,
  },

  label: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
    marginBottom: 2,
  },

  value: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },

  logoutBtn: {
    marginTop: 10,
  },
});

export default AuthProfile;
