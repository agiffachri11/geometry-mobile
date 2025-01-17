import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const TouchableButton = ({ 
  onPress, 
  title, 
  variant = 'primary', 
  disabled = false 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'secondary' && styles.secondaryButtonText,
          disabled && styles.disabledButtonText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#2B3A67',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2B3A67',
  },
  disabledButton: {
    backgroundColor: '#E1E1E1',
    borderColor: '#E1E1E1',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#2B3A67',
  },
  disabledButtonText: {
    color: '#999',
  }
});

export default TouchableButton;