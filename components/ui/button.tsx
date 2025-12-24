import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
    type?: 'primary' | 'outlined' | 'success' | 'danger' | 'warning';
    text: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
    loading?: boolean;
}

export default function Button({
  type = 'primary',  
  text,
  onPress,
  style,
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, styles[type], style, (disabled || loading ) && styles.disabled]} onPress={onPress} disabled={disabled}>
    <Text style={[styles.buttonText, type === 'outlined' && styles.buttonTextOutlined]}>
        {loading ? "Cargando..." : text}
    </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  primary: {
    backgroundColor: '#f200ffff',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#f200ffff',
  },
  success: {
    backgroundColor: '#4fff49ff'
  },
  danger: {
    backgroundColor: '#ff2424ff'
  },
  warning: {
    backgroundColor: '#fbff24ff'
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: 'center',
  },
  buttonTextOutlined: {
    color: '#f200ffff',
  },
  disabled: {
    opacity: 0.6,
  },
});
