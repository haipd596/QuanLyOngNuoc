import _ from 'lodash';

import schemaTabKhoangSan from '../../../../../schemaTemplates/base.schema.table.khoangsan.json';

export const isTabKhoangSanKeys = (key: string) => _.some(schemaTabKhoangSan.fields, { key });
