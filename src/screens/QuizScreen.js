import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { quizQuestions } from '../data/quizQuestions';
import QuizQuestion from '../components/QuizQuestion';
import TouchableButton from '../components/TouchableButton';
import { saveQuizResult } from '../utils/firebase';

export default function QuizScreen({ navigation }) {
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const calculateScore = async () => {
    const correctAnswers = Object.entries(answers).filter(
      ([index, answer]) => answer === quizQuestions[index].correctAnswer
    ).length;
    const finalScore = (correctAnswers / quizQuestions.length) * 100;
    setScore(finalScore);

    if (user) {
      try {
        const result = {
          score: finalScore,
          totalQuestions: quizQuestions.length,
          correctAnswers,
          userEmail: user.email, // Pastikan email ada
          timestamp: new Date().toISOString()
        };
        await saveQuizResult(user.uid, result);
      } catch (error) {
        console.error('Error saving quiz result:', error);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            {/* Results Section */}
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Quiz Complete!</Text>
              <Text style={styles.scoreText}>{score.toFixed(0)}%</Text>
              <Text style={styles.resultSummary}>
                You answered {Object.keys(answers).length} questions and got{' '}
                {Math.round((score / 100) * quizQuestions.length)} correct.
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableButton
                  title="Try Again"
                  onPress={restartQuiz}
                />
                <TouchableButton
                  title="Practice More"
                  variant="secondary"
                  onPress={() => navigation.navigate('ExploreTab')}
                />
              </View>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${progress}%` }]}
            />
          </View>
        </View>

        <QuizQuestion
          {...currentQuestion}
          selectedAnswer={answers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          isAnswered={Boolean(answers[currentQuestionIndex])}
          isCorrect={answers[currentQuestionIndex] === currentQuestion.correctAnswer}
          correctAnswer={currentQuestion.correctAnswer}
        />

        <View style={styles.navigationButtons}>
          <TouchableButton
            title="Previous"
            variant="secondary"
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
          />
          <TouchableButton
            title={currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}
            onPress={handleNext}
            disabled={!answers[currentQuestionIndex]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E1E1E1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2B3A67',
    borderRadius: 4,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16,
  },
  resultContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B3A67',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2B3A67',
    marginBottom: 8,
  },
  resultSummary: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
});