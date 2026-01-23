import { Modal, Pressable, View } from 'react-native';
import styles from './styles';
import Button from '../../Button/Button';


const AppModal = ({ visible, onClose, children }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modal}>
          {children}
          <Button text="Close" onPress={onClose} variant="danger" />
        </View>
      </Pressable>
    </Modal>
  );
};

export default AppModal;

