import { BranchEvent } from 'react-native-branch';
import { isNumber, isObject } from '@segment/analytics-react-native';
export const mapEventNames = {
  'Product Clicked': BranchEvent.ViewItem,
  'Product Viewed': BranchEvent.ViewItem,
  'Product Added': BranchEvent.AddToCart,
  'Product Reviewed': BranchEvent.Rate,
  'Checkout Started': BranchEvent.InitiatePurchase,
  'Promotion Viewed': BranchEvent.ViewAd,
  'Payment Info Entered': BranchEvent.AddPaymentInfo,
  'Order Completed': BranchEvent.Purchase,
  'Product List Viewed': BranchEvent.ViewItems,
  'Product Added to Wishlist': BranchEvent.AddToWishlist,
  'Product Shared': BranchEvent.Share,
  'Cart Shared': BranchEvent.Share,
  'Products Searched': BranchEvent.Search
};
export const mapEventProps = {
  order_id: 'transactionID',
  affilation: 'affiliation',
  currency: 'currency',
  revenue: 'revenue',
  coupon: 'coupon',
  shipping: 'shipping',
  tax: 'tax',
  query: 'searchQuery'
};
export const mapProductProps = {
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
  if (isNumber(value)) {
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
export const transformMap = {
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
        if (!isObject(item)) {
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