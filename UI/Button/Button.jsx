import { Pressable, StyleSheet, Text, View } from "react-native";
import styles from "./styles";

const Button = ({
  text,
  onPress,
  variant = "primary",
  disabled,
  icon,
  style = {},
  textColor = "white",
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.content}>
        {text && (
          <Text style={[styles.text, { color: textColor }]}>{text}</Text>
        )}
        {icon && icon}
      </View>
    </Pressable>
  );
};

export default Button;
