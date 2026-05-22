import React, {
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import FastImage from 'react-native-fast-image';

import Icon from 'react-native-vector-icons/Ionicons';

import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';

import {fetchProducts} from '../../store/productsSlice';

import {addToCart} from '../../store/cartSlice';

import {ProductApiItem} from '../../types/productApi.types';

import colors from '../../constants/colors';

const IMAGE_BASE_URL =
  'https://api.jtcchai.com/images/';

interface ProductCardProps {
  item: ProductApiItem;
  onAddToCart: (
    item: ProductApiItem,
  ) => void;
}

const ProductCard = React.memo(
  ({
    item,
    onAddToCart,
  }: ProductCardProps) => {
    const discountPercentage =
      useMemo(() => {
        if (
          !item.Original_Price ||
          item.Original_Price <=
            item.Prize
        ) {
          return 0;
        }

        return Math.round(
          ((item.Original_Price -
            item.Prize) /
            item.Original_Price) *
            100,
        );
      }, [item]);

    return (
      <View style={styles.card}>
        <View
          style={
            styles.imageContainer
          }>
          <FastImage
            source={{
              uri: `${IMAGE_BASE_URL}${item.ItemImage}`,
            }}
            style={styles.image}
            resizeMode={
              FastImage.resizeMode
                .cover
            }
          />

          {discountPercentage >
            0 && (
            <View
              style={
                styles.discountBadge
              }>
              <Text
                style={
                  styles.discountText
                }>
                {
                  discountPercentage
                }
                % OFF
              </Text>
            </View>
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            style={
              styles.favoriteButton
            }>
            <Icon
              name="heart-outline"
              size={20}
              color={
                colors.primary
              }
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text
            numberOfLines={2}
            style={styles.title}>
            {item.Item_desc}
          </Text>

          <Text
            style={
              styles.variantText
            }>
            {item.Item_Weight}g
            Variant
          </Text>

          <Text
            style={styles.category}>
            {item.Category}
          </Text>

          <View
            style={
              styles.ratingRow
            }>
            <Icon
              name="star"
              size={14}
              color={
                colors.rating
              }
            />

            <Text
              style={
                styles.ratingText
              }>
              {item.stars}
            </Text>
          </View>

          <View
            style={
              styles.priceRow
            }>
            <Text
              style={styles.price}>
              ₹{item.Prize}
            </Text>

            {item.Original_Price >
              item.Prize && (
              <Text
                style={
                  styles.originalPrice
                }>
                ₹
                {
                  item.Original_Price
                }
              </Text>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={
              styles.cartButton
            }
            onPress={() =>
              onAddToCart(item)
            }>
            <Icon
              name="cart-outline"
              size={18}
              color="#fff"
            />

            <Text
              style={
                styles.cartButtonText
              }>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

const ProductsScreen = () => {
  const dispatch =
    useAppDispatch();

  const {
    items,
    loading,
    error,
  } = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts(1));
  }, [dispatch]);

  const handleRefresh =
    useCallback(() => {
      dispatch(fetchProducts(1));
    }, [dispatch]);

  const handleAddToCart =
    useCallback(
      (
        item: ProductApiItem,
      ) => {
        dispatch(
          addToCart({
            cartId: `${item.Item_code}-${item.Prize}-${item.Item_Weight}`,

            id: item.ID,

            itemcode:
              item.Item_code,

            title:
              item.Item_desc,

            image:
              item.ItemImage,

            quantity: 1,

            price: item.Prize,

            weight:
              item.Item_Weight,
          }),
        );
      },
      [dispatch],
    );

  const renderItem =
    useCallback(
      ({
        item,
      }: {
        item: ProductApiItem;
      }) => {
        return (
          <ProductCard
            item={item}
            onAddToCart={
              handleAddToCart
            }
          />
        );
      },
      [handleAddToCart],
    );

  const keyExtractor =
    useCallback(
      (
        item: ProductApiItem,
      ) =>
        `${item.ID}-${item.Prize}-${item.Item_Weight}`,
      [],
    );

  if (
    loading &&
    items.length === 0
  ) {
    return (
      <SafeAreaView
        style={
          styles.loaderContainer
        }>
        <ActivityIndicator size="large" />

        <Text
          style={
            styles.loadingText
          }>
          Loading
          products...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}>
      {error && (
        <View
          style={
            styles.errorContainer
          }>
          <Text
            style={
              styles.errorText
            }>
            {error}
          </Text>
        </View>
      )}

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={
          keyExtractor
        }
        numColumns={2}
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.listContent
        }
        columnWrapperStyle={
          styles.columnWrapper
        }
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={
              handleRefresh
            }
          />
        }
        removeClippedSubviews
        maxToRenderPerBatch={
          8
        }
        windowSize={5}
        initialNumToRender={6}
        updateCellsBatchingPeriod={
          50
        }
      />
    </SafeAreaView>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      '#faf8f5',
  },

  listContent: {
    padding: 16,
    paddingBottom: 120,
  },

  columnWrapper: {
    justifyContent:
      'space-between',
  },

  card: {
    width: '48%',

    backgroundColor: '#fff',

    borderRadius: 20,

    marginBottom: 18,

    overflow: 'hidden',

    borderWidth: 1.5,

    borderColor:
      '#E8DCCF',

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  imageContainer: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 180,
  },

  favoriteButton: {
    position: 'absolute',

    top: 10,
    right: 10,

    backgroundColor:
      '#fff',

    width: 36,
    height: 36,

    borderRadius: 18,

    justifyContent:
      'center',

    alignItems: 'center',

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 4,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  discountBadge: {
    position: 'absolute',

    top: 10,
    left: 10,

    backgroundColor:
      colors.error,

    paddingHorizontal: 10,

    paddingVertical: 5,

    borderRadius: 10,
  },

  discountText: {
    color: '#fff',

    fontSize: 11,

    fontWeight: '700',
  },

  content: {
    padding: 14,
  },

  title: {
    fontSize: 15,

    fontWeight: '700',

    color: '#261F1A',

    minHeight: 42,
  },

  variantText: {
    marginTop: 6,

    fontSize: 12,

    fontWeight: '600',

    color: colors.primary,
  },

  category: {
    marginTop: 4,

    fontSize: 12,

    color: '#706861',
  },

  ratingRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 8,
  },

  ratingText: {
    marginLeft: 4,

    fontSize: 12,

    color: '#706861',
  },

  priceRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 12,
  },

  price: {
    fontSize: 20,

    fontWeight: '800',

    color: colors.primary,
  },

  originalPrice: {
    marginLeft: 8,

    fontSize: 13,

    textDecorationLine:
      'line-through',

    color: '#999',
  },

  cartButton: {
    marginTop: 14,

    flexDirection: 'row',

    justifyContent:
      'center',

    alignItems: 'center',

    backgroundColor:
      colors.primary,

    paddingVertical: 12,

    borderRadius: 14,
  },

  cartButtonText: {
    color: '#fff',

    fontWeight: '700',

    marginLeft: 6,
  },

  loaderContainer: {
    flex: 1,

    justifyContent:
      'center',

    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,

    fontSize: 14,

    color: '#706861',
  },

  errorContainer: {
    padding: 12,

    backgroundColor:
      '#ffe5e5',
  },

  errorText: {
    color: '#D32F2F',

    textAlign: 'center',

    fontWeight: '600',
  },
});