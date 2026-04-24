import { DIVIDER } from '@packages/constants/commons';

export const generateFieldName = (name: string, type: string) => `${name}${DIVIDER}${type}`;
