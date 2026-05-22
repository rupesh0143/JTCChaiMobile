import React, { useRef, useEffect } from 'react';
import { View, TextInput, Animated, Text, StyleSheet, TextInputProps } from 'react-native';

interface AnimatedInputProps extends TextInputProps {
  label: string;
  error?: string;
  value: string;
}

export default function AnimatedInput({ label, error, value, onFocus, onBlur, ...props }: AnimatedInputProps) {
  // Animated value for label position and size (0 = idle/inside, 1 = focused/above)
  const animatedFocus = useRef(new Animated.Value(value ? 1 : 0)).current;
  const isFocusedRef = useRef(false);

  useEffect(() => {
    // Keep placeholder floated if there's pre-filled text
    Animated.timing(animatedFocus, {
      toValue: (isFocusedRef.current || value) ? 1 : 0,
      duration: 180,
      useNativeDriver: false, // Layout animations (fontSize/top) don't support native driver
    }).start();
  }, [value]);

  const handleFocus = (e: any) => {
    isFocusedRef.current = true;
    Animated.timing(animatedFocus, {
      toValue: 1,
      duration: 180,
      useNativeDriver: false,
    }).start();
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    isFocusedRef.current = false;
    if (!value) {
      Animated.timing(animatedFocus, {
        toValue: 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }
    if (onBlur) onBlur(e);
  };

  // Interpolate position and size transformations
  const labelTop = animatedFocus.interpolate({
    inputRange: [0, 1],
    outputRange: [16, -10],
  });

  const labelFontSize = animatedFocus.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12],
  });

  const labelColor = animatedFocus.interpolate({
    inputRange: [0, 1],
    outputRange: ['#A0A0A0', '#D4AF37'], // Fades to premium gold accent on focus
  });

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.label,
          {
            top: labelTop,
            fontSize: labelFontSize,
            color: error ? '#FF4D4D' : labelColor,
          },
        ]}
        pointerEvents="none"
      >
        {label}
      </Animated.Text>
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : isFocusedRef.current ? styles.inputFocused : null,
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        placeholderTextColor="transparent" // Hides native placeholder to let custom animation shine
        {...props}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    position: 'relative',
    width: '100%',
  },
  label: {
    position: 'absolute',
    left: 12,
    backgroundColor: '#1E120D', // Matches splash theme backdrop to clip line neatly
    paddingHorizontal: 4,
    zIndex: 1,
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: '#3E2C23',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#F5E6D3',
    fontSize: 16,
    backgroundColor: 'rgba(30, 18, 13, 0.5)',
  },
  inputFocused: {
    borderColor: '#D4AF37',
  },
  inputError: {
    borderColor: '#FF4D4D',
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});