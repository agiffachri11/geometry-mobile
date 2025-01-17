import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Shape3DViewer from './Shape3DViewer';

export default function QuizQuestion({
  question,
  options,
  selectedAnswer,
  onAnswerSelect,
  shape,
  explanation,
  isAnswered,
  isCorrect,
  correctAnswer // tambahkan ini
}) {
  return (
    <View style={styles.container}>
      {/* 3D Visualization */}
      <View style={styles.shapeContainer}>
        <Shape3DViewer
          shapeType={shape.type}
          dimensions={shape.dimensions}
          color={shape.color}
        />
      </View>

      {/* Question */}
      <Text style={styles.questionText}>{question}</Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option && styles.selectedOption,
              isAnswered && option === correctAnswer && styles.correctOption,
              isAnswered && selectedAnswer === option && 
              option !== correctAnswer && styles.wrongOption,
            ]}
            onPress={() => onAnswerSelect(option)}
            disabled={isAnswered}
          >
            <Text style={[
              styles.optionText,
              selectedAnswer === option && styles.selectedOptionText,
              isAnswered && option === correctAnswer && styles.correctOptionText,
              isAnswered && selectedAnswer === option && 
              option !== correctAnswer && styles.wrongOptionText,
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Explanation */}
      {isAnswered && (
        <View style={styles.explanationContainer}>
          <View style={[
            styles.resultBanner,
            { backgroundColor: isCorrect ? '#4CAF50' : '#E84855' }
          ]}>
            <Text style={styles.resultText}>
              {isCorrect ? 'Correct!' : 'Incorrect!'}
            </Text>
          </View>
          <Text style={styles.explanationText}>
            {explanation}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  shapeContainer: {
    height: 200,
    marginBottom: 16,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    overflow: 'hidden',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B3A67',
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
  selectedOption: {
    backgroundColor: '#2B3A67',
    borderColor: '#2B3A67',
  },
  correctOption: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  wrongOption: {
    backgroundColor: '#E84855',
    borderColor: '#E84855',
  },
  optionText: {
    fontSize: 16,
    color: '#2B3A67',
  },
  selectedOptionText: {
    color: 'white',
  },
  correctOptionText: {
    color: 'white',
  },
  wrongOptionText: {
    color: 'white',
  },
  explanationContainer: {
    marginTop: 16,
  },
  resultBanner: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  resultText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  explanationText: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#F5F7FA',
    padding: 12,
    borderRadius: 8,
  },
});