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

export default function VolumeScreen({ navigation }) {
  const sections = [
    {
      title: "What is Volume?",
      content: "Volume is the amount of space a 3D shape takes up. It tells us how much a shape can hold inside. Measured in cubic units"
    },
    {
      title: "Basic Formulas",
      formulas: [
        { shape: "Cube", formula: "V = a³ (a = edge length)" },
        { shape: "Sphere", formula: "V = 4/3 πr³ (r = radius)" },
        { shape: "Cylinder", formula: "V = πr²h (r = radius, h = height)" },
        { shape: "Cone", formula: "V = 1/3 πr²h (r = radius, h = height)" }
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
        <Text style={styles.title}>Volume</Text>
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