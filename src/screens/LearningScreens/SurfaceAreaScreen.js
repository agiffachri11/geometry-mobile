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

export default function SurfaceAreaScreen({ navigation }) {
  const sections = [
    {
      title: "What is Surface Area?",
      content: "Surface Area is the total area of all faces of a 3D shape. It tells us how much space covers the outside of the shape. Measured in square units"
    },
    {
      title: "Basic Formulas",
      formulas: [
        { shape: "Cube", formula: "SA = 6a² (a = edge length)" },
        { shape: "Sphere", formula: "SA = 4πr² (r = radius)" },
        { shape: "Cylinder", formula: "SA = 2πr² + 2πrh (r = radius, h = height)" },
        { shape: "Cone", formula: "SA = πr² + πrs (r = radius, s = slant height)" }
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
        <Text style={styles.title}>Surface Area</Text>
      </View>

      <ScrollView style={styles.content}>
        {sections.map((section, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{section.title}</Text>
            {section.content && (
              <Text style={styles.contentText}>{section.content}</Text>
            )}
            {section.formulas && section.formulas.map((formula, idx) => (
              <View key={idx} style={styles.formulaRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.formulaText}>
                  {formula.shape}: {formula.formula}
                </Text>
              </View>
            ))}
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B3A67',
    marginBottom: 12,
  },
  contentText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  formulaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#2B3A67',
    marginRight: 8,
  },
  formulaText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});