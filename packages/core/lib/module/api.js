export const uploadEvents = async ({
  writeKey,
  url,
  events
}) => {
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      batch: events,
      sentAt: new Date().toISOString(),
      writeKey: writeKey
    }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
//# sourceMappingURL=api.js.map