import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { signUpSchema } from '../../utils/validation';

type SignUpScreenProp = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;

interface SignUpErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpScreenProp>();

  // Profile Form States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<SignUpErrors>({});

  // Floating Placeholder Engine Refs
  const fnFocusAnim = useRef(new Animated.Value(firstName ? 1 : 0)).current;
  const lnFocusAnim = useRef(new Animated.Value(lastName ? 1 : 0)).current;
  const emailFocusAnim = useRef(new Animated.Value(email ? 1 : 0)).current;
  const passFocusAnim = useRef(new Animated.Value(password ? 1 : 0)).current;
  const cpFocusAnim = useRef(new Animated.Value(confirmPassword ? 1 : 0)).current;

  const handleFocus = (animRef: Animated.Value) => {
    Animated.timing(animRef, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = (animRef: Animated.Value, text: string) => {
    if (!text) {
      Animated.timing(animRef, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSignUpSubmit = () => {
    setErrors({});
    const constructedFullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    const result = signUpSchema.safeParse({
      fullName: constructedFullName,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const fieldErrors: SignUpErrors = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof SignUpErrors;
        if (path === 'fullName') {
          fieldErrors.fullName = issue.message;
        } else if (path) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    Alert.alert('Success', 'Profile created successfully!');
    navigation.navigate('Login');
  };

  const createLabelStyle = (animRef: Animated.Value) => ({
    top: animRef.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -10],
    }),
    fontSize: animRef.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 12],
    }),
    backgroundColor: animRef.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', '#FFFFFF'],
    }),
    paddingHorizontal: animRef.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 6],
    }),
    color: animRef.interpolate({
      inputRange: [0, 1],
      outputRange: ['#A19E9B', '#8C6D4A'],
    }),
  });

  return (
    <ImageBackground
      source={require('../../assets/images/Tea_backdrop.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.overlayContainer}>
            <View style={styles.brandHeader}>
              <Image 
                source={require('../../assets/images/JTClogo.png')} 
                style={styles.miniCupIcon}
              />
              <Text style={styles.titleText}>Create Account</Text>
              <Text style={styles.subtitleText}>Join JTC Chai and discover premium chai blends</Text>
            </View>

            <View style={styles.cardContainer}>
              {/* Split First/Last Name Container Row */}
              <View style={[styles.splitRow, errors.fullName ? { marginBottom: 4 } : null]}>
                <View style={styles.splitColumn}>
                  <View style={styles.inputWrapperContainer}>
                    <Animated.Text style={[styles.floatingLabel, createLabelStyle(fnFocusAnim)]} pointerEvents="none">
                      First Name
                    </Animated.Text>
                    <TextInput
                      style={[styles.textInput, errors.fullName ? styles.textInputErrorBorder : null]}
                      value={firstName}
                      onChangeText={(val) => { setFirstName(val); if(errors.fullName) setErrors({...errors, fullName: undefined}); }}
                      onFocus={() => handleFocus(fnFocusAnim)}
                      onBlur={() => handleBlur(fnFocusAnim, firstName)}
                    />
                  </View>
                </View>
                
                <View style={styles.splitColumn}>
                  <View style={styles.inputWrapperContainer}>
                    <Animated.Text style={[styles.floatingLabel, createLabelStyle(lnFocusAnim)]} pointerEvents="none">
                      Last Name
                    </Animated.Text>
                    <TextInput
                      style={[styles.textInput, errors.fullName ? styles.textInputErrorBorder : null]}
                      value={lastName}
                      onChangeText={(val) => { setLastName(val); if(errors.fullName) setErrors({...errors, fullName: undefined}); }}
                      onFocus={() => handleFocus(lnFocusAnim)}
                      onBlur={() => handleBlur(lnFocusAnim, lastName)}
                    />
                  </View>
                </View>
              </View>
              {errors.fullName && <Text style={styles.inlineErrorText}>{errors.fullName}</Text>}

              {/* Email Address Input Container */}
              <View style={[styles.inputWrapperContainer, errors.email ? { marginBottom: 4 } : null]}>
                <Animated.Text style={[styles.floatingLabel, createLabelStyle(emailFocusAnim)]} pointerEvents="none">
                  Email Address
                </Animated.Text>
                <TextInput
                  style={[styles.textInput, errors.email ? styles.textInputErrorBorder : null]}
                  value={email}
                  onChangeText={(val) => { setEmail(val); if(errors.email) setErrors({...errors, email: undefined}); }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => handleFocus(emailFocusAnim)}
                  onBlur={() => handleBlur(emailFocusAnim, email)}
                />
              </View>
              {errors.email && <Text style={styles.inlineErrorText}>{errors.email}</Text>}

              {/* Password Input Container */}
              <View style={[styles.inputWrapperContainer, errors.password ? { marginBottom: 4 } : null]}>
                <Animated.Text style={[styles.floatingLabel, createLabelStyle(passFocusAnim)]} pointerEvents="none">
                  Password
                </Animated.Text>
                <TextInput
                  style={[styles.textInput, errors.password ? styles.textInputErrorBorder : null]}
                  secureTextEntry
                  value={password}
                  onChangeText={(val) => { setPassword(val); if(errors.password) setErrors({...errors, password: undefined}); }}
                  autoCapitalize="none"
                  onFocus={() => handleFocus(passFocusAnim)}
                  onBlur={() => handleBlur(passFocusAnim, password)}
                />
              </View>
              {errors.password && <Text style={styles.inlineErrorText}>{errors.password}</Text>}

              {/* Confirm Password Input Container */}
              <View style={[styles.inputWrapperContainer, errors.confirmPassword ? { marginBottom: 4 } : null]}>
                <Animated.Text style={[styles.floatingLabel, createLabelStyle(cpFocusAnim)]} pointerEvents="none">
                  Confirm Password
                </Animated.Text>
                <TextInput
                  style={[styles.textInput, errors.confirmPassword ? styles.textInputErrorBorder : null]}
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={(val) => { setConfirmPassword(val); if(errors.confirmPassword) setErrors({...errors, confirmPassword: undefined}); }}
                  autoCapitalize="none"
                  onFocus={() => handleFocus(cpFocusAnim)}
                  onBlur={() => handleBlur(cpFocusAnim, confirmPassword)}
                />
              </View>
              {errors.confirmPassword && <Text style={styles.inlineErrorText}>{errors.confirmPassword}</Text>}

              <TouchableOpacity style={styles.primaryButton} onPress={handleSignUpSubmit}>
                <Text style={styles.primaryButtonText}>Create Account</Text>
              </TouchableOpacity>

              <View style={styles.dividerLine} />

              <View style={styles.footerRow}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.footerLinkHighlight}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(247, 244, 239, 0.88)',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  miniCupIcon: {
    width: 46,
    height: 46,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#261F1A',
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 14,
    color: '#706861',
    marginTop: 6,
    textAlign: 'center',
    fontWeight: '400',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#5C4E43',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  splitRow: {
    flexDirection: 'row',
    gap: 12,
  },
  splitColumn: {
    flex: 1,
  },
  inputWrapperContainer: {
    position: 'relative',
    marginBottom: 20,
    justifyContent: 'center',
    height: 50,
  },
  floatingLabel: {
    position: 'absolute',
    left: 14,
    zIndex: 2,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E5E0',
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 50,
    fontSize: 15,
    color: '#261F1A',
    width: '100%',
  },
  textInputErrorBorder: {
    borderColor: '#D32F2F',
  },
  inlineErrorText: {
    color: '#D32F2F',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 14,
    paddingLeft: 4,
  },
  primaryButton: {
    backgroundColor: '#8C6D4A',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#E8E5E0',
    marginVertical: 24,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#706861',
  },
  footerLinkHighlight: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8C6D4A',
  },
});