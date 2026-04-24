import { UniqId } from './uniqId';

export const generateUniqIdConfigArray = () => (new UniqId(`column_${Date.now()}`)).key;
