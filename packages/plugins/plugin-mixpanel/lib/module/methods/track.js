export default ((eventName, properties, settings, mixpanel) => {
  //track raw event
  mixpanel.track(eventName, properties);

  //everything else is for people setting
  if (settings.people !== true) {
    return;
  }
  if (settings.propIncrements !== undefined && settings.propIncrements?.length > 0) {
    const propIncrements = settings.propIncrements;
    for (const propString of propIncrements) {
      for (const property in properties) {
        if (propString.toLowerCase() === property.toLowerCase()) {
          const incrementValue = properties[property];
          if (typeof incrementValue === 'number') {
            mixpanel.getPeople().increment(property, incrementValue);
          }
        }
      }
    }
  }
  if (settings.eventIncrements !== undefined && settings.eventIncrements.length > 0) {
    const eventIncrements = settings.eventIncrements;
    for (const eventString of eventIncrements) {
      if (eventString.toLowerCase() === eventName.toLowerCase()) {
        const property = eventName;
        mixpanel.getPeople().increment(property, 1);
        const lastEvent = `Last ${property}`;
        const lastDate = Date();
        mixpanel.getPeople().set(lastEvent, lastDate);
      }
    }
  }
  if (properties.revenue !== undefined) {
    const revenue = properties.revenue;
    mixpanel.getPeople().trackCharge(revenue, properties);
  }
});
//# sourceMappingURL=track.js.map