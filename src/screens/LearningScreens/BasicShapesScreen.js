import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BasicShapesScreen({ navigation }) {
  const sections = [
    {
      title: "Cube",
      icon: "cube-outline",
      points: [
        "6 equal square faces",
        "12 edges of equal length",
        "8 vertices",
        "All angles are 90 degrees"
      ]
    },
    {
      title: "Sphere",
      icon: "sphere",
      points: [
        "Every point is equidistant from the center",
        "Has no edges or vertices",
        "Has one continuous surface"
      ]
    },
    {
      title: "Cylinder",
      icon: "cylinder",
      points: [
        "Two parallel circular bases",
        "One curved surface connecting the bases",
        "Equal radius for both bases"
      ]
    },
    {
      title: "Cone",
      icon: "cone",
      points: [
        "One circular base",
        "One vertex (point at the top)",
        "One curved surface",
        "Slant height from vertex to base edge"
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#2B3A67" />
        </TouchableOpacity>
        <Text style={styles.title}>Basic Shapes</Text>
      </View>

      <ScrollView style={styles.content}>
        {sections.map((section, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name={section.icon} size={24} color="#2B3A67" />
              <Text style={styles.cardTitle}>{section.title}</Text>
            </View>
            <View style={styles.pointsContainer}>
              {section.points.map((point, idx) => (
                <View key={idx} style={styles.pointRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.pointText}>{point}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B3A67',
    marginLeft: 8,
  },
  pointsContainer: {
    gap: 8,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    color: '#2B3A67',
    marginRight: 8,
    marginTop: -2,
  },
  pointText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});