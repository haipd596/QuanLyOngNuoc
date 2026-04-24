import { UniqId } from './uniqId';

export const generateSchemaKey = () => (new UniqId('form_key')).key;
