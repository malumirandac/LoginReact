
import { useAuth } from '@/components/context/auth-context';
import { Link, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

//Esta vista es el menú principal de la aplicación
export default function HomeScreen() {
  const { user, logout } = useAuth();
  
const handleLogout = () => {
  logout();
  router.replace("/login");
}

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Hello, World!</Text>
      <Text> Bienvenido, {user?.name}</Text>
        <Link href="/modal" style={styles.button}>
      <Text style={styles.buttonText}>Open Modal</Text>
        </Link>

        <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff00f2ff',
    borderRadius: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },



  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
