import { Modal, Pressable, Text, View } from "react-native";
import styles from "./styles";

const AppModal = ({ visible, onClose, title, subtitle, children }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal} onPress={() => {}}>
          {(title || subtitle) && (
            <View style={styles.head}>
              {!!title && <Text style={styles.title}>{title}</Text>}
              {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
          )}

          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AppModal;
