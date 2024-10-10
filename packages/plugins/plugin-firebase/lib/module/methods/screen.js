import firebaseAnalytics from '@react-native-firebase/analytics';
export default (async event => {
  const screenProps = {
    screen_name: event.name,
    screen_class: event.name,
    ...event.properties
  };
  await firebaseAnalytics().logScreenView(screenProps);
});
//# sourceMappingURL=screen.js.map