import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();

  const modules = [
    {
      title: "Basic Shapes",
      icon: "cube-outline",
      description: "Introduction to 3D geometric shapes and their properties",
      onPress: () => navigation.navigate('BasicShapes'),
    },
    {
      title: "Surface Area",
      icon: "square-outline",
      description: "Learn to calculate surface areas of various 3D shapes",
      onPress: () => navigation.navigate('SurfaceArea'),
    },
    {
      title: "Volume",
      icon: "cube-scan",
      description: "Volume calculations for different geometric solids",
      onPress: () => navigation.navigate('Volume'),
    },
  ];

  const features = [
    {
      title: "3D Explorer",
      icon: "rotate-3d",
      description: "Interact with 3D shapes in real-time",
      onPress: () => navigation.navigate('ExploreTab'),
    },
    {
      title: "Quiz",
      icon: "head-question",
      description: "Test your knowledge",
      onPress: () => navigation.navigate('Quiz'),
    },
    {
      title: "Calculator",
      icon: "calculator",
      description: "Calculate area and volume",
      onPress: () => navigation.navigate('Calculator'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>
              Welcome back,{'\n'}
              <Text style={styles.username}>
                {user?.email?.split('@')[0]}
              </Text>
            </Text>
          </View>
  
          {/* Learning Modules */}
          <Text style={styles.sectionTitle}>Learning Modules</Text>
          <View style={styles.modulesContainer}>
            {modules.map((module, index) => (
              <TouchableOpacity
                key={index}
                style={styles.moduleCard}
                onPress={module.onPress}
              >
                <MaterialCommunityIcons
                  name={module.icon}
                  size={32}
                  color="#2B3A67"
                />
                <Text style={styles.moduleTitle}>{module.title}</Text>
                <Text style={styles.moduleDescription}>
                  {module.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
  
          {/* Features Section */}
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureCard}
                onPress={feature.onPress}
              >
                <MaterialCommunityIcons
                  name={feature.icon}
                  size={24}
                  color="#2B3A67"
                />
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: 40,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    color: '#2B3A67',
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B3A67',
    marginBottom: 16,
  },
  modulesContainer: {
    gap: 16,
    marginBottom: 24,
  },
  moduleCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B3A67',
    marginTop: 8,
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    color: '#666',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2B3A67',
    marginTop: 8,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
  },
  leaderboardSection: {
    marginTop: 24,
    marginBottom: 16,
  },
});

export default HomeScreen;