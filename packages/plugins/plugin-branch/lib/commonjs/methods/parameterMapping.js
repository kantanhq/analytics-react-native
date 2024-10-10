"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformMap = exports.mapProductProps = exports.mapEventProps = exports.mapEventNames = void 0;
var _reactNativeBranch = require("react-native-branch");
var _analyticsReactNative = require("@segment/analytics-react-native");
const mapEventNames = exports.mapEventNames = {
  'Product Clicked': _reactNativeBranch.BranchEvent.ViewItem,
  'Product Viewed': _reactNativeBranch.BranchEvent.ViewItem,
  'Product Added': _reactNativeBranch.BranchEvent.AddToCart,
  'Product Reviewed': _reactNativeBranch.BranchEvent.Rate,
  'Checkout Started': _reactNativeBranch.BranchEvent.InitiatePurchase,
  'Promotion Viewed': _reactNativeBranch.BranchEvent.ViewAd,
  'Payment Info Entered': _reactNativeBranch.BranchEvent.AddPaymentInfo,
  'Order Completed': _reactNativeBranch.BranchEvent.Purchase,
  'Product List Viewed': _reactNativeBranch.BranchEvent.ViewItems,
  'Product Added to Wishlist': _reactNativeBranch.BranchEvent.AddToWishlist,
  'Product Shared': _reactNativeBranch.BranchEvent.Share,
  'Cart Shared': _reactNativeBranch.BranchEvent.Share,
  'Products Searched': _reactNativeBranch.BranchEvent.Search
};
const mapEventProps = exports.mapEventProps = {
  order_id: 'transactionID',
  affilation: 'affiliation',
  currency: 'currency',
  revenue: 'revenue',
  coupon: 'coupon',
  shipping: 'shipping',
  tax: 'tax',
  query: 'searchQuery'
};
const mapProductProps = exports.mapProductProps = {
  sku: 'sku',
  name: 'productName',
  brand: 'productBrand',
  category: 'productCategory',
  variant: 'productVariant',
  quantity: 'quantity',
  price: 'price',
  image_url: 'contentImageUrl',
  url: 'canonicalUrl'
};
const sanitizeValue = value => {
  if ((0, _analyticsReactNative.isNumber)(value)) {
    return value;
  } else {
    return `${value}`;
  }
};
const onlyStrings = value => {
  if (value === null || value === undefined) {
    return undefined;
  }
  return `${value.toString()}`;
};
const transformMap = exports.transformMap = {
  event: value => {
    if (typeof value === 'string' && value in mapEventNames) {
      return mapEventNames[value];
    }
    return value;
  },
  products: value => {
    const prods = [];
    if (Array.isArray(value)) {
      for (const item of value) {
        if (!(0, _analyticsReactNative.isObject)(item)) {
          continue;
        }
        const data = {};
        for (const key in mapProductProps) {
          const newKey = mapProductProps[key];
          if (key in item) {
            data[newKey] = sanitizeValue(item[key]);
          }
        }
        const {
          contentImageUrl,
          canonicalUrl,
          ...contentMetadata
        } = data;
        prods.push({
          canonicalUrl,
          contentImageUrl,
          contentMetadata: {
            ...contentMetadata,
            customMetadata: {
              product_id: onlyStrings(item.product_id)
            }
          }
        });
      }
      return prods;
    }
    return value;
  }
};
//# sourceMappingURL=parameterMapping.js.map