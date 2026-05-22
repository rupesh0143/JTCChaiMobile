import React, {
  useMemo,
  useState,
} from 'react';

import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {useAppSelector} from '../../hooks/useAppSelector';

import colors from '../../constants/colors';

const paymentMethods = [
  {
    id: 'gpay',
    title: 'Google Pay',
    image: require('../../assets/images/GPAY.png'),
  },

  {
    id: 'paytm',
    title: 'Paytm',
    image: require('../../assets/images/PAYTM.jpg'),
  },

  {
    id: 'phonepe',
    title: 'PhonePe',
    image: require('../../assets/images/PhonePe.png'),
  },

  {
    id: 'card',
    title: 'Credit / Debit Card',
    icon: 'card-outline',
  },

  {
    id: 'netbanking',
    title: 'Net Banking',
    icon: 'business-outline',
  },

  {
    id: 'cod',
    title: 'Cash on Delivery',
    icon: 'cash-outline',
  },
];

const CheckoutScreen = () => {
  const {items, totalPrice} =
    useAppSelector(
      state => state.cart,
    );

  const [selectedPayment, setSelectedPayment] =
    useState('gpay');

  const deliveryFee = 40;

  const gst = useMemo(() => {
    return Math.round(
      totalPrice * 0.05,
    );
  }, [totalPrice]);

  const finalTotal = useMemo(() => {
    return (
      totalPrice +
      deliveryFee +
      gst
    );
  }, [
    totalPrice,
    deliveryFee,
    gst,
  ]);

  return (
    <View style={styles.root}>
      <StatusBar
        backgroundColor={
          colors.primary
        }
        barStyle="light-content"
      />

      <SafeAreaView
        style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.contentContainer
          }>
          {/* HEADER */}

          <View style={styles.header}>
            <Text
              style={
                styles.logoText
              }>
              JTC
            </Text>

            <Text
              style={
                styles.checkoutTitle
              }>
              Secure Checkout
            </Text>
          </View>

          {/* PRODUCT SUMMARY */}

          <View style={styles.section}>
            <Text
              style={
                styles.sectionTitle
              }>
              Order Summary
            </Text>

            {items.map(item => (
              <View
                key={item.cartId}
                style={
                  styles.productCard
                }>
                <View
                  style={
                    styles.productLeft
                  }>
                  <Text
                    style={
                      styles.productName
                    }>
                    {item.title}
                  </Text>

                  <Text
                    style={
                      styles.variantText
                    }>
                    {item.weight}g
                    Variant
                  </Text>

                  <Text
                    style={
                      styles.quantityText
                    }>
                    Qty:
                    {' '}
                    {
                      item.quantity
                    }
                  </Text>
                </View>

                <Text
                  style={
                    styles.productPrice
                  }>
                  ₹
                  {item.price *
                    item.quantity}
                </Text>
              </View>
            ))}
          </View>

          {/* PAYMENT METHODS */}

          <View style={styles.section}>
            <Text
              style={
                styles.sectionTitle
              }>
              Payment Method
            </Text>

            {paymentMethods.map(
              method => {
                const selected =
                  selectedPayment ===
                  method.id;

                return (
                  <TouchableOpacity
                    key={
                      method.id
                    }
                    activeOpacity={
                      0.8
                    }
                    onPress={() =>
                      setSelectedPayment(
                        method.id,
                      )
                    }
                    style={[
                      styles.paymentCard,

                      selected &&
                        styles.selectedPaymentCard,
                    ]}>
                    <View
                      style={
                        styles.paymentLeft
                      }>
                      {'image' in
                      method ? (
                        <Image
                          source={
                            method.image
                          }
                          style={
                            styles.paymentImage
                          }
                          resizeMode="contain"
                        />
                      ) : (
                        <View
                          style={
                            styles.iconContainer
                          }>
                          <Icon
                            name={
                              method.icon
                            }
                            size={
                              22
                            }
                            color={
                              colors.primary
                            }
                          />
                        </View>
                      )}

                      <Text
                        style={
                          styles.paymentTitle
                        }>
                        {
                          method.title
                        }
                      </Text>
                    </View>

                    <Icon
                      name={
                        selected
                          ? 'radio-button-on'
                          : 'radio-button-off'
                      }
                      size={24}
                      color={
                        colors.primary
                      }
                    />
                  </TouchableOpacity>
                );
              },
            )}
          </View>

          {/* BILLING */}

          <View style={styles.section}>
            <Text
              style={
                styles.sectionTitle
              }>
              Payment Details
            </Text>

            <View
              style={
                styles.billRow
              }>
              <Text
                style={
                  styles.billLabel
                }>
                Subtotal
              </Text>

              <Text
                style={
                  styles.billValue
                }>
                ₹{totalPrice}
              </Text>
            </View>

            <View
              style={
                styles.billRow
              }>
              <Text
                style={
                  styles.billLabel
                }>
                Delivery Fee
              </Text>

              <Text
                style={
                  styles.billValue
                }>
                ₹{deliveryFee}
              </Text>
            </View>

            <View
              style={
                styles.billRow
              }>
              <Text
                style={
                  styles.billLabel
                }>
                GST
              </Text>

              <Text
                style={
                  styles.billValue
                }>
                ₹{gst}
              </Text>
            </View>

            <View
              style={
                styles.totalDivider
              }
            />

            <View
              style={
                styles.billRow
              }>
              <Text
                style={
                  styles.totalLabel
                }>
                Total
              </Text>

              <Text
                style={
                  styles.totalValue
                }>
                ₹{finalTotal}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* PAY BUTTON */}

        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={
              styles.payButton
            }>
            <Text
              style={
                styles.payButtonText
              }>
              Pay ₹{finalTotal}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:
      colors.primary,
  },

  container: {
    flex: 1,
    backgroundColor:
      '#faf8f5',
  },

  contentContainer: {
    paddingBottom: 140,
  },

  header: {
    backgroundColor:
      colors.primary,

    paddingTop: 24,
    paddingBottom: 40,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    alignItems: 'center',
  },

  logoText: {
    fontSize: 34,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
  },

  checkoutTitle: {
    marginTop: 8,
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },

  section: {
    backgroundColor: '#fff',

    marginHorizontal: 16,
    marginTop: 18,

    padding: 18,

    borderRadius: 20,

    shadowColor: '#000',

    shadowOpacity: 0.06,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#261F1A',

    marginBottom: 18,
  },

  productCard: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    marginBottom: 16,
  },

  productLeft: {
    flex: 1,
    paddingRight: 10,
  },

  productName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#261F1A',
  },

  variantText: {
    marginTop: 4,
    color: '#777',
    fontSize: 13,
  },

  quantityText: {
    marginTop: 6,
    fontWeight: '600',
    color: colors.primary,
  },

  productPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },

  paymentCard: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',

    padding: 16,

    borderRadius: 16,

    borderWidth: 1.5,

    borderColor: '#eee',

    marginBottom: 14,
  },

  selectedPaymentCard: {
    borderColor:
      colors.primary,

    backgroundColor:
      '#F8F3ED',
  },

  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  paymentImage: {
    width: 42,
    height: 42,
  },

  iconContainer: {
    width: 42,
    height: 42,

    borderRadius: 21,

    justifyContent:
      'center',

    alignItems: 'center',

    backgroundColor:
      '#F4ECE3',
  },

  paymentTitle: {
    marginLeft: 14,

    fontSize: 15,

    fontWeight: '600',

    color: '#261F1A',
  },

  billRow: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    marginBottom: 16,
  },

  billLabel: {
    fontSize: 15,
    color: '#666',
  },

  billValue: {
    fontSize: 15,
    fontWeight: '700',
  },

  totalDivider: {
    height: 1,

    backgroundColor: '#eee',

    marginBottom: 16,
  },

  totalLabel: {
    fontSize: 20,
    fontWeight: '800',
  },

  totalValue: {
    fontSize: 24,
    fontWeight: '900',

    color: colors.primary,
  },

  footer: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: '#fff',

    padding: 20,

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: -3,
    },

    elevation: 12,
  },

  payButton: {
    backgroundColor:
      colors.primary,

    paddingVertical: 18,

    borderRadius: 18,

    alignItems: 'center',
  },

  payButtonText: {
    color: '#fff',

    fontSize: 18,

    fontWeight: '800',
  },
});