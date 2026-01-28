import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    padding: 16,
  },

  modal: {
    backgroundColor: "#14141A",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  head: {
    marginBottom: 12,
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 4,
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    fontWeight: "600",
  },
});
