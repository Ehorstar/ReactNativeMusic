import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        width: '80%'
    }
})

export default styles