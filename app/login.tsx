import { useAuth } from "@/components/context/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';


export default function LoginScreen() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    //la herramienta exporouter nos permitirá acceder a los tab una vez hecho el login exitoso
    const router = useRouter();
    //logica con authProvider
    const { login } = useAuth();


    const handleUsernameChange = (text: string) => {
        setUsername(text);
    }

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    }


    //handleLogin con lógica de credenciales simples, sin authtProvider
    /* const handleLogin = () => {
        const EXPECTED_USER = {
            username: "user",
            password: "1234"
        }

        if (username === EXPECTED_USER.username && password === EXPECTED_USER.password){
            //en versión web usaremos el window.alert
            window.alert(`Login successful\nWelcome, ${username}!`);
            //en versión nativo usaremos Alert.alert
            //Alert.alert("Login successful", `Welcome, ${username}!`);
            router.replace("/(tabs)");
            //utilizamos replace en lugar de navigate para que al devolvernos en la navegación, no nos devuelva al login sino que al menu principal
        } else {
            //en versión web usaremos el window.alert
            window.alert("Login failed\nInvalid username or password");
            //en versión nativo usaremos Alert.alert
            //Alert.alert("Login failed", "Invalid username or password");
        }
    } */

    //handleLogin con lógica de authProvider 
    const handleLogin = () => {
        try {
            login(username, password);
            router.replace("/(tabs)");
        } catch (error) {
            //Alert.alert("Login Failed", (error as Error).message);
            window.alert("Login failed\nInvalid username or password");
        }
    }
    

    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Username:</Text>
                <TextInput 
                style={styles.input} 
                placeholder="Username" 
                onChangeText={handleUsernameChange} 
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password:</Text>
                <TextInput 
                style={styles.input} 
                placeholder="Password" 
                secureTextEntry 
                onChangeText={handlePasswordChange}
                />
            </View>
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
        </View>
    )
}


//estilos
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
    },
    input: {
        height: 40,
        borderColor: "#ff00f2ff",
        borderWidth: 1,
        marginTop: 8,
        paddingHorizontal: 10,
        width: '100%',
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
    },
})

