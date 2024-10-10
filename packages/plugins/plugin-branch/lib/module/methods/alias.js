import Branch from 'react-native-branch';
export default (event => {
  const userId = event.userId;
  if (userId !== undefined) {
    Branch.setIdentity(userId);
  }
});
//# sourceMappingURL=alias.js.map