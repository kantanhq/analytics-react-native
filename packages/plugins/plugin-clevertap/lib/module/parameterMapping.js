export const mapTraits = {
  name: 'Name',
  birthday: 'DOB',
  avatar: 'Photo',
  gender: 'Gender',
  phone: 'Phone',
  email: 'Email'
};
export const transformMap = {
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