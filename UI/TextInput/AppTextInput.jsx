import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

export default function AppTextInput({ label, error, style, ...props }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputWrap, error && styles.inputWrapError]}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="rgba(255,255,255,0.45)"
          selectionColor="#1DB954"
          {...props}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    color: "rgba(255,255,255,0.75)",
    marginBottom: 8,
    textTransform: "uppercase",
  },

  inputWrap: {
    borderRadius: 14,
    backgroundColor: "#14141A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  input: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EDEDED",
    padding: 0,
    margin: 0,
  },

  inputWrapError: {
    borderColor: "rgba(255, 80, 80, 0.75)",
  },

  errorText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 80, 80, 0.85)",
  },
});
