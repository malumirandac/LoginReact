import { useAuth } from "@/components/context/auth-context";
import Button from "@/components/ui/button";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';


export default function LoginScreen() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { login, loading } = useAuth();
    const router = useRouter();

    const handleUsernameChange = (text: string) => {
        setUsername(text);
    }

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    }

    const handleLogin = async () => {
        try {
            await login(username, password);
            router.replace('/(tabs)');
        } catch (error) {
            Alert.alert("Login Failed", (error as Error).message);
        }
    }
    

    return (
        <View style={styles.container}>
            <Text>L O G I N</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                style={styles.input} 
                placeholder="Enter email" 
                onChangeText={handleUsernameChange} 
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput 
                style={styles.input} 
                placeholder="Enter password" 
                secureTextEntry 
                onChangeText={handlePasswordChange}
                />
            </View>
            <Button 
                style={styles.button} 
                onPress={handleLogin} 
                disabled={!username || !password} 
                loading={loading} 
                text="Login" 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    inputContainer: {
        width: '80%',
        marginTop: 16,
    },
    label: {
        marginTop: 8,
        color: "#ff00f2ff",
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: "#ff00f2ff",
        borderWidth: 1,
        marginTop: 8,
        paddingHorizontal: 10,
        width: '100%',
        borderRadius: 5,
        color: 'gray',
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ff00f2ff',
        width: '80%',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
})

