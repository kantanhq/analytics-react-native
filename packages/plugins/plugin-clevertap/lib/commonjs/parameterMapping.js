"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformMap = exports.mapTraits = void 0;
const mapTraits = exports.mapTraits = {
  name: 'Name',
  birthday: 'DOB',
  avatar: 'Photo',
  gender: 'Gender',
  phone: 'Phone',
  email: 'Email'
};
const transformMap = exports.transformMap = {
  event: value => {
    if (typeof value === 'string') {
      if (value in mapTraits) {
        return mapTraits[value];
      }
    }
    return value;
  }
};
//# sourceMappingURL=parameterMapping.js.map