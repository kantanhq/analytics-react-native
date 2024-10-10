import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
  const UUID = uuidv4().toString();
  return UUID;
};
//# sourceMappingURL=uuid.js.map