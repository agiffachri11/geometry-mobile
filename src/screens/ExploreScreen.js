import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import Shape3DViewer from '../components/Shape3DViewer';

export default function ExploreScreen() {
  const [shapeType, setShapeType] = useState('cube');
  const [dimensions, setDimensions] = useState({
    width: 1,
    height: 1,
    depth: 1,
    radius: 1
  });
  const [color, setColor] = useState('#2B3A67');

  const shapes = [
    { label: 'Cube', value: 'cube' },
    { label: 'Sphere', value: 'sphere' },
    { label: 'Cylinder', value: 'cylinder' },
    { label: 'Cone', value: 'cone' }
  ];

  const colors = [
    { label: 'Blue', value: '#2B3A67' },
    { label: 'Red', value: '#E84855' },
    { label: 'Green', value: '#57BB8A' },
    { label: 'Purple', value: '#9B51E0' }
  ];

  const renderDimensionControls = () => {
    switch(shapeType) {
      case 'sphere':
        return (
          <DimensionSlider
            label="Radius"
            value={dimensions.radius}
            onChange={value => setDimensions(prev => ({ ...prev, radius: value }))}
          />
        );
      case 'cylinder':
      case 'cone':
        return (
          <>
            <DimensionSlider
              label="Radius"
              value={dimensions.radius}
              onChange={value => setDimensions(prev => ({ ...prev, radius: value }))}
            />
            <DimensionSlider
              label="Height"
              value={dimensions.height}
              onChange={value => setDimensions(prev => ({ ...prev, height: value }))}
            />
          </>
        );
      default: // cube
        return (
          <>
            <DimensionSlider
              label="Width"
              value={dimensions.width}
              onChange={value => setDimensions(prev => ({ ...prev, width: value }))}
            />
            <DimensionSlider
              label="Height"
              value={dimensions.height}
              onChange={value => setDimensions(prev => ({ ...prev, height: value }))}
            />
            <DimensionSlider
              label="Depth"
              value={dimensions.depth}
              onChange={value => setDimensions(prev => ({ ...prev, depth: value }))}
            />
          </>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>3D Shape Explorer</Text>
        <Text style={styles.subtitle}>Interact with the shape using touch gestures</Text>

        <View style={styles.viewerContainer}>
          {/* Comment bagian Shape3DViewer */}
          <Shape3DViewer
            shapeType={shapeType}
            dimensions={dimensions}
            color={color}
          />
          {/* <Text style={styles.placeholder}>3D Viewer Coming Soon</Text> */}
        </View>

        <View style={styles.controls}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shape</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={shapeType}
                onValueChange={setShapeType}
                style={styles.picker}
              >
                {shapes.map(shape => (
                  <Picker.Item
                    key={shape.value}
                    label={shape.label}
                    value={shape.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={color}
                onValueChange={setColor}
                style={styles.picker}
              >
                {colors.map(c => (
                  <Picker.Item
                    key={c.value}
                    label={c.label}
                    value={c.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dimensions</Text>
            {renderDimensionControls()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DimensionSlider = ({ label, value, onChange }) => (
  <View style={styles.sliderContainer}>
    <Text style={styles.label}>{label}: {value.toFixed(1)}</Text>
    <Slider
      style={styles.slider}
      minimumValue={0.1}
      maximumValue={3}
      value={value}
      onValueChange={onChange}
      minimumTrackTintColor="#2B3A67"
      maximumTrackTintColor="#E1E1E1"
      thumbTintColor="#2B3A67"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B3A67',
    marginTop: 20,
    marginHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  viewerContainer: {
    height: 300,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  controls: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B3A67',
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  picker: {
    height: 50,
  },
  sliderContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#2B3A67',
    marginBottom: 5,
  },
  slider: {
    height: 40,
  },
});