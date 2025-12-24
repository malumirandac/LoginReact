
import { useAuth } from '@/components/context/auth-context';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
const handleLogout = () => {
  logout();
  router.replace("/login");
}

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Hello, World!</Text>
      <Text> Bienvenido, {user?.email || 'User'}!</Text>
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
