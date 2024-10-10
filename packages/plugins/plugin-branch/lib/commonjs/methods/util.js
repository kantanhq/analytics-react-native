"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBranchEventWithProps = createBranchEventWithProps;
var _analyticsReactNative = require("@segment/analytics-react-native");
var _reactNativeBranch = _interopRequireWildcard(require("react-native-branch"));
var _parameterMapping = require("./parameterMapping");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function toJSONString(value) {
  if (typeof value === 'string') {
    return value;
  }
  return JSON.stringify(value);
}
async function createBranchEventWithProps(eventName, eventProps, isStandardBranchEvent) {
  const products = eventProps.product_id !== undefined ? _parameterMapping.transformMap.products([eventProps]) : eventProps.products;
  const branchUniversalObjects = [];

  // for each product item, create a Branch Universal Object
  if (Array.isArray(products)) {
    for (const item of products) {
      const product_id = item.contentMetadata.customMetadata.product_id;
      if (product_id !== undefined) {
        if (isStandardBranchEvent) {
          const buo = await _reactNativeBranch.default.createBranchUniversalObject(product_id, item);
          branchUniversalObjects.push(buo);
        } else {
          eventProps.customData = {
            ...((0, _analyticsReactNative.isObject)(eventProps.customData) ? eventProps.customData : {}),
            [product_id]: toJSONString(item)
          };
        }
      }
    }
  } else {
    // separate custom non-Branch entries before forwarding
    const customData = {};
    const branchData = {};
    for (const key in eventProps) {
      if (key in _parameterMapping.mapEventProps) {
        branchData[key] = eventProps[key];
      }
      customData[key] = toJSONString(eventProps[key]);
    }
    eventProps = {
      ...branchData,
      customData
    };
  }
  return new _reactNativeBranch.BranchEvent(eventName,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore: Branch does not export the proper types for BranchUniversalObject so we can only use unknown
  isStandardBranchEvent ? branchUniversalObjects : undefined, eventProps);
}
//# sourceMappingURL=util.js.map