import { DestinationPlugin } from '../plugin';
export const getMockDestinationPlugin = () => {
  const destinationPlugin = new DestinationPlugin();
  destinationPlugin.flush = jest.fn();
  return destinationPlugin;
};
//# sourceMappingURL=mockDestinationPlugin.js.map