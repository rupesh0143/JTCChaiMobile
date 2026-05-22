import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { bootstrapAuth } from '../store/authSlice';

export default function SplashScreen() {
  const dispatch = useDispatch();

  // Entrance & Global Animations
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;
  const backgroundScale = useRef(new Animated.Value(1)).current;

  // Loop refs to safely track and stop animations on unmount
  const backgroundLoopRef = useRef<Animated.CompositeAnimation | null>(null);
  const steamLoops = useRef<Animated.CompositeAnimation[]>([]);
  const particleLoops = useRef<Animated.CompositeAnimation[]>([]);

  // Steam Elements
  const steam1 = useRef(new Animated.Value(0)).current;
  const steam2 = useRef(new Animated.Value(0)).current;
  const steam3 = useRef(new Animated.Value(0)).current;

  // Particle Elements
  const particle1 = useRef(new Animated.Value(0)).current;
  const particle2 = useRef(new Animated.Value(0)).current;
  const particle3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Entrance Animations
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 2200,
        useNativeDriver: true
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        tension: 35,
        useNativeDriver: true
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        delay: 1600,
        duration: 1500,
        useNativeDriver: true
      })
    ]).start();

    // 2. Ambient Background Scale Loop
    backgroundLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundScale, {
          toValue: 1.06,
          duration: 5000,
          useNativeDriver: true
        }),
        Animated.timing(backgroundScale, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true
        })
      ])
    );
    backgroundLoopRef.current.start();

    // 3. Initialize Ambient FX Loops
    startSteamAnimation(steam1, 0, 0);
    startSteamAnimation(steam2, 800, 1);
    startSteamAnimation(steam3, 1600, 2);

    startParticleAnimation(particle1, 0, 0);
    startParticleAnimation(particle2, 1200, 1);
    startParticleAnimation(particle3, 2400, 2);

    // 4. Global Screen Fade Out & Navigation Bridge
    const fadeOutTimeout = setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true
      }).start(() => {
        // ⚠️ CRITICAL BRIDGE: Tells Redux loading is done, forcing RootNavigator to change stacks
        dispatch(bootstrapAuth());
      });
    }, 3000);

    // 5. Cleanup Protocol (Prevents background thread overhead)
    return () => {
      clearTimeout(fadeOutTimeout);
      if (backgroundLoopRef.current) backgroundLoopRef.current.stop();
      steamLoops.current.forEach(anim => anim.stop());
      particleLoops.current.forEach(anim => anim.stop());
    };
  }, []);

  const startSteamAnimation = (anim: Animated.Value, delay: number, index: number) => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration: 2400,
          useNativeDriver: true
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ])
    );
    steamLoops.current[index] = loop;
    loop.start();
  };

  const startParticleAnimation = (anim: Animated.Value, delay: number, index: number) => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ])
    );
    particleLoops.current[index] = loop;
    loop.start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: screenOpacity,
          transform: [{ scale: backgroundScale }]
        }
      ]}
    >
      <StatusBar backgroundColor="#1E120D" barStyle="light-content" />

      <LinearGradient
        colors={['#1E120D', '#3E2C23', '#6B4A3A']}
        style={styles.gradient}
      >
        {/* Particles Layer */}
        <Animated.View
          style={[
            styles.particle,
            {
              left: '20%',
              opacity: particle1,
              transform: [{
                translateY: particle1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [80, -120]
                })
              }]
            }
          ]}
        />

        <Animated.View
          style={[
            styles.particle,
            {
              left: '70%',
              opacity: particle2,
              transform: [{
                translateY: particle2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, -150]
                })
              }]
            }
          ]}
        />

        <Animated.View
          style={[
            styles.particle,
            {
              left: '50%',
              opacity: particle3,
              transform: [{
                translateY: particle3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [120, -180]
                })
              }]
            }
          ]}
        />

        {/* Steam Layer */}
        <Animated.View
          style={[
            styles.steam,
            {
              left: '46%',
              opacity: steam1,
              transform: [
                {
                  translateY: steam1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -100]
                  })
                },
                {
                  translateX: steam1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10]
                  })
                }
              ]
            }
          ]}
        />

        <Animated.View
          style={[
            styles.steam,
            {
              left: '50%',
              opacity: steam2,
              transform: [
                {
                  translateY: steam2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -120]
                  })
                },
                {
                  translateX: steam2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 10]
                  })
                }
              ]
            }
          ]}
        />

        <Animated.View
          style={[
            styles.steam,
            {
              left: '54%',
              opacity: steam3,
              transform: [
                {
                  translateY: steam3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -110]
                  })
                },
                {
                  translateX: steam3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -5]
                  })
                }
              ]
            }
          ]}
        />

        {/* Brand Assets */}
        <Animated.View
          style={{
            opacity: logoOpacity,
            transform: [{ scale: logoScale }]
          }}
        >
          <Image
            source={require('../assets/images/JTClogo.png')}
            style={styles.logo}
          />
        </Animated.View>

        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: textOpacity
            }
          ]}
        >
          SIP THE TRADITION
        </Animated.Text>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E120D'
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 270,
    height: 270,
    resizeMode: 'contain'
  },
  tagline: {
    marginTop: 15,
    fontSize: 17,
    letterSpacing: 7,
    color: '#F5E6D3',
    fontWeight: '300'
  },
  steam: {
    position: 'absolute',
    top: '31%',
    width: 14,
    height: 70,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.18)',
    zIndex: 10
  },
  particle: {
    position: 'absolute',
    bottom: 120,
    width: 8,
    height: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,215,170,0.3)'
  }
});