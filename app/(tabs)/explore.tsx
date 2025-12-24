import { StyleSheet, Text, View } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text> La importancia de hacer las tareas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
