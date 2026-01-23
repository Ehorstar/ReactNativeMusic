import { Modal, Pressable, Text, View } from "react-native";
import Button from "../../Button/Button";
import styles from "./styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useState } from "react";

const TrackerModal = ({ visible, onClose, children, onConfirm }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);

  const handleConfirm = () => {
    if (!selectedAmount) return;
    onConfirm(selectedAmount);
    setSelectedAmount(null);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay}>
        <View style={styles.modal}>
          {children}
          <View style={styles.icons}>
            <View
              style={[
                styles.box,
                selectedAmount === 100 && { backgroundColor: "#16bedb" },
              ]}
            >
              <Button
                variant="transparent"
                onPress={() => setSelectedAmount(100)}
                icon={
                  <MaterialCommunityIcons name="cup" size={32} color="white" />
                }
              />

              <Text style={{ fontWeight: "bold", color: "white" }}>100 ml</Text>
            </View>

            <View
              style={[
                styles.box,
                selectedAmount === 200 && { backgroundColor: "#16bedb" },
              ]}
            >
              <Button
                onPress={() => setSelectedAmount(200)}
                variant="transparent"
                icon={
                  <MaterialCommunityIcons
                    name="bottle-soda-classic"
                    size={32}
                    color="white"
                  />
                }
              />
              <Text style={{ fontWeight: "bold", color: "white" }}>200 ml</Text>
            </View>

            <View
              style={[
                styles.box,
                selectedAmount === 500 && { backgroundColor: "#16bedb" },
              ]}
            >
              <Button
                onPress={() => setSelectedAmount(500)}
                variant="transparent"
                icon={
                  <FontAwesome6 name="bottle-water" size={32} color="white" />
                }
              />

              <Text style={{ fontWeight: "bold", color: "white" }}>500 ml</Text>
            </View>
          </View>

          <View style={styles.buttons}>
            <Button text="Скасувати" onPress={onClose} variant="secondary" />
            <Button
              text="Ок"
              variant="primary"
              onPress={handleConfirm}
              disabled={!selectedAmount}
              style={{ width: 100 }}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default TrackerModal;
