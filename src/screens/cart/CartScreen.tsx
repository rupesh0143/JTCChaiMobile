import React from 'react';

import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';

import {useAppDispatch} from '../../hooks/useAppDispatch';

import {useAppSelector} from '../../hooks/useAppSelector';

import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from '../../store/cartSlice';

import colors from '../../constants/colors';

const CartScreen = () => {
  const navigation = useNavigation();

  const dispatch =
    useAppDispatch();

  const {
    items,
    totalPrice,
  } = useAppSelector(
    state => state.cart,
  );

  const renderItem = ({
    item,
  }: any) => {
    return (
      <View
        style={
          styles.cartCard
        }>
        {/* PRODUCT IMAGE */}

        <Image
          source={{
            uri: item.image,
          }}
          style={
            styles.productImage
          }
        />

        {/* PRODUCT INFO */}

        <View
          style={
            styles.productDetails
          }>
          <Text
            numberOfLines={2}
            style={
              styles.productTitle
            }>
            {item.title}
          </Text>

          <Text
            style={
              styles.variantText
            }>
            Variant:
            {' '}
            {item.weight}g
          </Text>

          <Text
            style={
              styles.productPrice
            }>
            ₹{item.price}
          </Text>

          {/* QUANTITY */}

          <View
            style={
              styles.quantityContainer
            }>
            <TouchableOpacity
              style={
                styles.qtyButton
              }
              onPress={() =>
                dispatch(
                  decreaseQuantity(
                    item.cartId,
                  ),
                )
              }>
              <Ionicons
                name="remove"
                size={18}
                color="#fff"
              />
            </TouchableOpacity>

            <Text
              style={
                styles.quantityText
              }>
              {item.quantity}
            </Text>

            <TouchableOpacity
              style={
                styles.qtyButton
              }
              onPress={() =>
                dispatch(
                  addToCart(
                    item,
                  ),
                )
              }>
              <Ionicons
                name="add"
                size={18}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* TOTAL + DELETE */}

        <View
          style={
            styles.rightSection
          }>
          <TouchableOpacity
            onPress={() =>
              dispatch(
                removeFromCart(
                  item.cartId,
                ),
              )
            }>
            <Ionicons
              name="trash-outline"
              size={22}
              color="#D32F2F"
            />
          </TouchableOpacity>

          <Text
            style={
              styles.totalPrice
            }>
            ₹
            {item.price *
              item.quantity}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={styles.container}>
      {/* HEADER */}

      <View
        style={styles.header}>
        <Text
          style={
            styles.headerTitle
          }>
          My Cart
        </Text>

        <Text
          style={
            styles.itemCount
          }>
          {items.length}
          {' '}
          Items
        </Text>
      </View>

      {/* EMPTY CART */}

      {items.length ===
      0 ? (
        <View
          style={
            styles.emptyContainer
          }>
          <Ionicons
            name="cart-outline"
            size={90}
            color="#D7D0C7"
          />

          <Text
            style={
              styles.emptyTitle
            }>
            Your cart is empty
          </Text>

          <Text
            style={
              styles.emptySubtitle
            }>
            Add products to
            continue shopping
          </Text>
        </View>
      ) : (
        <>
          {/* CART ITEMS */}

          <FlatList
            data={items}
            keyExtractor={item =>
              item.cartId
            }
            renderItem={
              renderItem
            }
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={
              styles.listContent
            }
          />

          {/* FOOTER */}

          <View
            style={
              styles.footer
            }>
            <View>
              <Text
                style={
                  styles.totalLabel
                }>
                Total Amount
              </Text>

              <Text
                style={
                  styles.totalAmount
                }>
                ₹{totalPrice}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={
                0.9
              }
              style={
                styles.checkoutButton
              }
              onPress={() =>
                navigation.navigate(
                  'Checkout' as never,
                )
              }>
              <Text
                style={
                  styles.checkoutText
                }>
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#F7F5F2',
    },

    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,

      backgroundColor:
        '#fff',

      borderBottomWidth: 1,

      borderBottomColor:
        '#ECE7DF',
    },

    headerTitle: {
      fontSize: 28,
      fontWeight: '800',
      color: '#261F1A',
    },

    itemCount: {
      marginTop: 4,

      fontSize: 14,

      color: '#7A736B',
    },

    listContent: {
      padding: 16,
      paddingBottom: 140,
    },

    cartCard: {
      flexDirection: 'row',

      alignItems: 'center',

      backgroundColor:
        '#fff',

      borderRadius: 20,

      borderWidth: 1.5,

      borderColor:
        colors.primary,

      padding: 14,

      marginBottom: 16,

      shadowColor: '#000',

      shadowOpacity: 0.05,

      shadowRadius: 8,

      shadowOffset: {
        width: 0,
        height: 3,
      },

      elevation: 3,
    },

    productImage: {
      width: 82,
      height: 82,

      borderRadius: 16,

      backgroundColor:
        '#F4ECE3',
    },

    productDetails: {
      flex: 1,

      marginLeft: 14,

      justifyContent:
        'center',
    },

    productTitle: {
      fontSize: 15,

      fontWeight: '700',

      color: '#261F1A',
    },

    variantText: {
      marginTop: 4,

      fontSize: 13,

      color: '#7A736B',
    },

    productPrice: {
      marginTop: 8,

      fontSize: 18,

      fontWeight: '800',

      color: colors.primary,
    },

    quantityContainer: {
      flexDirection: 'row',

      alignItems: 'center',

      marginTop: 14,
    },

    qtyButton: {
      width: 34,
      height: 34,

      borderRadius: 17,

      backgroundColor:
        colors.primary,

      justifyContent:
        'center',

      alignItems: 'center',
    },

    quantityText: {
      marginHorizontal: 16,

      fontSize: 16,

      fontWeight: '700',

      color: '#261F1A',
    },

    rightSection: {
      justifyContent:
        'space-between',

      alignItems: 'flex-end',

      minHeight: 82,
    },

    totalPrice: {
      fontSize: 18,

      fontWeight: '900',

      color: colors.primary,
    },

    footer: {
      position: 'absolute',

      bottom: 0,
      left: 0,
      right: 0,

      flexDirection: 'row',

      justifyContent:
        'space-between',

      alignItems: 'center',

      paddingHorizontal: 20,

      paddingVertical: 18,

      backgroundColor:
        '#fff',

      borderTopWidth: 1,

      borderTopColor:
        '#ECE7DF',
    },

    totalLabel: {
      fontSize: 13,

      color: '#7A736B',
    },

    totalAmount: {
      marginTop: 2,

      fontSize: 24,

      fontWeight: '900',

      color: '#261F1A',
    },

    checkoutButton: {
      backgroundColor:
        colors.primary,

      paddingHorizontal: 28,

      paddingVertical: 16,

      borderRadius: 18,
    },

    checkoutText: {
      color: '#fff',

      fontSize: 16,

      fontWeight: '800',
    },

    emptyContainer: {
      flex: 1,

      justifyContent:
        'center',

      alignItems: 'center',

      paddingHorizontal: 40,
    },

    emptyTitle: {
      marginTop: 18,

      fontSize: 24,

      fontWeight: '800',

      color: '#261F1A',
    },

    emptySubtitle: {
      marginTop: 8,

      fontSize: 15,

      color: '#7A736B',

      textAlign: 'center',

      lineHeight: 22,
    },
  });