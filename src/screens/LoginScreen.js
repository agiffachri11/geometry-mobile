import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Rename ke isLoading
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Please fill all fields');
    }

    try {
      setIsLoading(true);  // Gunakan isLoading
      await login(email, password);
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Login Error',
        error.message || 'Failed to login'
      );
    } finally {
      setIsLoading(false);  // Gunakan isLoading
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}  
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}  
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
          disabled={isLoading}  
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Logging in...' : 'Login'}  
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => navigation.navigate('Register')}
          disabled={isLoading}  
        >
          <Text style={styles.linkText}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// src/screens/LoginScreen.js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center', // Tambahkan ini
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2B3A67',
    marginBottom: 32,
    textAlign: 'center', // Tambahkan ini
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    width: '100%', // Tambahkan ini
  },
  button: {
    backgroundColor: '#2B3A67',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    width: '100%', // Tambahkan ini
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center', // Tambahkan ini
  },
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#2B3A67',
    fontSize: 14,
    textAlign: 'center', // Tambahkan ini
  },
});