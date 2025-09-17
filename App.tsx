import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity,Pressable } from 'react-native';
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput style={styles.input} placeholder='Email' placeholderTextColor={"#FFFFFF"} />
      <TextInput style={styles.input} placeholder='Password' secureTextEntry placeholderTextColor={"#FFFFFF"}/>
        <Pressable onPress={() => {console.log("Button Pressed")}} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    justifyContent: 'center',
    padding: 20,
    gap: 20,
    color: "#FFFFFF"
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 10,
    borderRadius: 5,
    color: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF"
  },
  button: {
    backgroundColor: "#FF0101",
    padding: 15,
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  }
});
