import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <StatusBar hidden={true} />
      
      {/* Standardized Centered Header Module */}
      <View style={styles.headerBar}>
        <TouchableOpacity 
          style={styles.hamburgerTouchArea}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={26} color="#261F1A" />
        </TouchableOpacity>

        {/* Centered Brand Container: [Logo] JTC */}
        <View style={styles.brandingWrapper}>
          <Image 
            source={require('../../assets/images/JTClogo.png')} 
            style={styles.brandLogoAsset}
            resizeMode="contain"
          />
          <Text style={styles.brandTitleText}>JTC</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.bannerCardWrapper}>
          <ImageBackground
            source={require('../../assets/images/Tea_backdrop_2.png')}
            style={styles.bannerImageBackground}
            resizeMode="cover"
          >
            <View style={styles.leftContentColumn}>
              <Text style={styles.taglineText}>Authentic. Premium. Timeless</Text>
              
              <Text style={styles.heroTitleText}>
                Sip the{'\n'}
                <Text style={styles.heroTitleAccent}>Tradition</Text> of{'\n'}
                Uttar Pradesh
              </Text>
              
              <Text style={styles.heroBodyText}>
                Experience the warmth of authentic masala chai and premium tea blends. 
                Crafted with care in Uttar Pradesh, steeped in tradition, delivered across India.
              </Text>

              <View style={styles.actionButtonRow}>
                <TouchableOpacity style={styles.shopBestsellersButton}>
                  <Text style={styles.shopButtonText}>Shop Bestsellers  ➔</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exploreFlavoursButton}>
                  <Text style={styles.exploreButtonText}>Explore Flavours</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.valueMetricsRow}>
                <Text style={styles.metricItemText}>🛡️ 100% Natural</Text>
                <Text style={styles.metricItemText}>📦 Free Shipping</Text>
                <Text style={styles.metricItemText}>⭐ 4.8 Rated</Text>
              </View>
            </View>
            <View style={styles.rightVisualColumn} />
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#faf8f5', // Updated custom background color scheme
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 16, 
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#E8E5E0',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    minHeight: 64,
  },
  hamburgerTouchArea: {
    position: 'absolute', 
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  brandingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLogoAsset: {
    width: 26,
    height: 26,
    marginRight: 8, 
  },
  brandTitleText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#8b6f47',
    letterSpacing: 0.5,
  },
  scrollContainer: {
    padding: 16,
  },
  bannerCardWrapper: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FAF6F0',
    shadowColor: '#5C4E43',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  bannerImageBackground: {
    width: '100%',
    flexDirection: 'row',
  },
  leftContentColumn: {
    flex: 1.2, 
    paddingLeft: 20,
    paddingVertical: 24,
    paddingRight: 4,
    justifyContent: 'center',
  },
  rightVisualColumn: {
    flex: 0.8, 
  },
  taglineText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9C7A53',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  heroTitleText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#261F1A',
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  heroTitleAccent: {
    color: '#705335',
  },
  heroBodyText: {
    fontSize: 11,
    color: '#5C554E',
    lineHeight: 16,
    marginTop: 10,
    fontWeight: '400',
  },
  actionButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  shopBestsellersButton: {
    backgroundColor: '#7A6248',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  exploreFlavoursButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3DFD8',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreButtonText: {
    color: '#261F1A',
    fontSize: 11,
    fontWeight: '600',
  },
  valueMetricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 16,
    gap: 10,
  },
  metricItemText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#423B34',
  },
});