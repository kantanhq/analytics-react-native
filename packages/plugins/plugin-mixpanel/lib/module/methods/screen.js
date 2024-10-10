import track from './track';
export default ((event, mixpanel, settings) => {
  const callTrack = (eventName, properties) => {
    track(eventName, properties, settings, mixpanel);
  };
  const properties = event.properties;
  if (settings.consolidatedPageCalls === true) {
    const eventName = 'Loaded a Screen';
    const screenName = event.name;
    if (screenName !== undefined) {
      properties.name = screenName;
    }
    callTrack(eventName, properties);
  } else if (settings.trackAllPages === true) {
    const eventName = `Viewed ${event.name} Screen`;
    callTrack(eventName, properties);
  } else if (settings.trackNamedPages === true && event.name !== undefined) {
    const eventName = `Viewed ${event.name} Screen`;
    callTrack(eventName, properties);
  } else if (settings.trackCategorizedPages === true && event.properties?.category !== undefined) {
    const category = event.properties.category;
    const eventName = `Viewed ${category?.toString() ?? ''} Screen`;
    callTrack(eventName, properties);
  }
});
//# sourceMappingURL=screen.js.map