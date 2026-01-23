import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    base: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    pressed: {
        opacity: 0.6
    },
    disabled: {
        opacity: 0.4
    },
    primary: {
        backgroundColor: 'dodgerblue'
    },
    secondary: {
        backgroundColor: '#5f5f60ff'
    },
    danger: {
        backgroundColor: '#d40101ff'
    },
    icon: {
        backgroundColor: 'transparent',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },

    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    }
})

export default styles