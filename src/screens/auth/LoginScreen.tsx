import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
  Animated,
  Dimensions,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { AuthStackParamList } from '../../navigation/types';
import { loginSchema, forgotPasswordSchema } from '../../utils/validation';
import { loginSuccess } from '../../store/authSlice';

const { height } = Dimensions.get('window');

type LoginScreenProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

interface FormErrors {
  email?: string;
  password?: string;
  forgotEmail?: string;
}

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenProp>();
  const dispatch = useDispatch();
  
  // Form Input States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [forgotEmail, setForgotEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  // Modal Visibility State
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  // Placeholder Animation Tracking Nodes
  const usernameFocusAnim = useRef(new Animated.Value(username ? 1 : 0)).current;
  const passwordFocusAnim = useRef(new Animated.Value(password ? 1 : 0)).current;
  const forgotEmailFocusAnim = useRef(new Animated.Value(forgotEmail ? 1 : 0)).current;

  const handleFocus = (animRef: Animated.Value) => {
    Animated.timing(animRef, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = (animRef: Animated.Value, currentText: string) => {
    if (!currentText) {
      Animated.timing(animRef, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSignInSubmit = () => {
    setErrors({});
    const result = loginSchema.safeParse({ email: username, password });
    
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof FormErrors;
        if (path) fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Atomically swap the global application state root over to the dashboard layout view
    dispatch(loginSuccess({ email: username }));
  };

  const openForgotPassword = () => {
    setErrors({});
    setForgotPasswordVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const closeForgotPassword = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setForgotPasswordVisible(false);
      setForgotEmail('');
      setErrors({});
      forgotEmailFocusAnim.setValue(0);
    });
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
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.overlayContainer}>
            <View style={styles.brandHeader}>
              <Image 
                source={require('../../assets/images/JTClogo.png')} 
                style={styles.miniCupIcon}
              />
              <Text style={styles.titleText}>Welcome Back</Text>
              <Text style={styles.subtitleText}>Sign in to your JTC Chai account</Text>
            </View>

            <View style={styles.cardContainer}>
              <View style={[styles.inputWrapperContainer, errors.email ? { marginBottom: 4 } : null]}>
                <Animated.Text style={[styles.floatingLabel, createLabelStyle(usernameFocusAnim)]} pointerEvents="none">
                  Email Address
                </Animated.Text>
                <TextInput
                  style={[styles.textInput, errors.email ? styles.textInputErrorBorder : null]}
                  value={username}
                  onChangeText={(val) => {
                    setUsername(val);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onFocus={() => handleFocus(usernameFocusAnim)}
                  onBlur={() => handleBlur(usernameFocusAnim, username)}
                />
              </View>
              {errors.email && <Text style={styles.inlineErrorText}>{errors.email}</Text>}
              
              <View style={[styles.passwordInputWrapper, errors.password ? { marginBottom: 4 } : null]}>
                <Animated.Text style={[styles.floatingLabel, createLabelStyle(passwordFocusAnim)]} pointerEvents="none">
                  Password
                </Animated.Text>
                <TextInput
                  style={styles.passwordFieldInput}
                  secureTextEntry={secureText}
                  value={password}
                  onChangeText={(val) => {
                    setPassword(val);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }
                  }}
                  autoCapitalize="none"
                  onFocus={() => handleFocus(passwordFocusAnim)}
                  onBlur={() => handleBlur(passwordFocusAnim, password)}
                />
                <TouchableOpacity 
                  style={styles.visibilityToggle} 
                  onPress={() => setSecureText(!secureText)}
                >
                  <Text style={styles.visibilityIcon}>{secureText ? '👁️' : '🙈'}</Text>
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.inlineErrorText}>{errors.password}</Text>}

              <View style={styles.passwordLabelRow}>
                <TouchableOpacity onPress={openForgotPassword}>
                  <Text style={styles.inlineLinkText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.primaryButton} onPress={handleSignInSubmit}>
                <Text style={styles.primaryButtonText}>Sign In</Text>
              </TouchableOpacity>

              <View style={styles.dividerLine} />

              <View style={styles.footerRow}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.footerLinkHighlight}>Sign up free</Text>
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
    paddingTop: 60,
    paddingBottom: 40,
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(247, 244, 239, 0.88)', 
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: 28,
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
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: -12,
    paddingHorizontal: 2,
  },
  inlineLinkText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9C7A53',
  },
  passwordInputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E5E0',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    paddingRight: 14,
    height: 50,
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
  passwordFieldInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#261F1A',
  },
  visibilityToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  visibilityIcon: {
    fontSize: 16,
    color: '#706861',
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
  }
});