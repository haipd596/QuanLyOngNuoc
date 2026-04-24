import _ from 'lodash';
import schemaTabKhoangSan2 from '../../../../../schemaTemplates/base.schema.table.khoangsan2.json';

export const isTabKhoangSanKeys2 = (key: string) => _.some(schemaTabKhoangSan2.fields, { key });
