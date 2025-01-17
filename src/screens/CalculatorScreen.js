import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CalculatorScreen({ navigation }) {
  const [shape, setShape] = useState('cube');
  const [dimensions, setDimensions] = useState({
    width: '',
    height: '',
    radius: ''
  });
  const [results, setResults] = useState({
    volume: null,
    surfaceArea: null
  });

  const shapes = [
    { value: 'cube', label: 'Cube' },
    { value: 'sphere', label: 'Sphere' },
    { value: 'cylinder', label: 'Cylinder' },
    { value: 'cone', label: 'Cone' }
  ];

  const calculate = () => {
    let volume = 0;
    let surfaceArea = 0;
    const { width, height, radius } = dimensions;
    const w = parseFloat(width);
    const h = parseFloat(height);
    const r = parseFloat(radius);

    switch(shape) {
      case 'cube':
        volume = Math.pow(w, 3);
        surfaceArea = 6 * Math.pow(w, 2);
        break;
      case 'sphere':
        volume = (4/3) * Math.PI * Math.pow(r, 3);
        surfaceArea = 4 * Math.PI * Math.pow(r, 2);
        break;
      case 'cylinder':
        volume = Math.PI * Math.pow(r, 2) * h;
        surfaceArea = 2 * Math.PI * r * (r + h);
        break;
      case 'cone':
        volume = (1/3) * Math.PI * Math.pow(r, 2) * h;
        const s = Math.sqrt(Math.pow(r, 2) + Math.pow(h, 2));
        surfaceArea = Math.PI * r * (r + s);
        break;
    }

    setResults({
      volume: volume.toFixed(2),
      surfaceArea: surfaceArea.toFixed(2)
    });
  };

  const renderInputs = () => {
    switch(shape) {
      case 'cube':
        return (
          <TextInput
            style={styles.input}
            placeholder="Side Length"
            keyboardType="numeric"
            value={dimensions.width}
            onChangeText={(text) => setDimensions({ ...dimensions, width: text })}
          />
        );
      case 'sphere':
        return (
          <TextInput
            style={styles.input}
            placeholder="Radius"
            keyboardType="numeric"
            value={dimensions.radius}
            onChangeText={(text) => setDimensions({ ...dimensions, radius: text })}
          />
        );
      case 'cylinder':
      case 'cone':
        return (
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Radius"
              keyboardType="numeric"
              value={dimensions.radius}
              onChangeText={(text) => setDimensions({ ...dimensions, radius: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Height"
              keyboardType="numeric"
              value={dimensions.height}
              onChangeText={(text) => setDimensions({ ...dimensions, height: text })}
            />
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#2B3A67" />
        </TouchableOpacity>
        <Text style={styles.title}>Shape Calculator</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Input Dimensions</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={shape}
              onValueChange={setShape}
              style={styles.picker}
            >
              {shapes.map(({ value, label }) => (
                <Picker.Item key={value} label={label} value={value} />
              ))}
            </Picker>
          </View>

          {renderInputs()}

          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculate}
            disabled={!dimensions.width && !dimensions.radius}
          >
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
        </View>

        {results.volume !== null && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Results</Text>
            <View style={styles.resultSection}>
              <Text style={styles.resultLabel}>Volume</Text>
              <Text style={styles.resultValue}>
                {results.volume}
                <Text style={styles.unit}> cubic units</Text>
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.resultSection}>
              <Text style={styles.resultLabel}>Surface Area</Text>
              <Text style={styles.resultValue}>
                {results.surfaceArea}
                <Text style={styles.unit}> square units</Text>
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    elevation: 2,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B3A67',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B3A67',
    marginBottom: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  inputGroup: {
    gap: 16,
  },
  calculateButton: {
    backgroundColor: '#2B3A67',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultSection: {
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B3A67',
  },
  unit: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E1E1E1',
    marginVertical: 16,
  },
});