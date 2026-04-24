import _ from 'lodash';
import { useEffect, useState } from 'react';

import { JsonSchema } from '@packages/schema/schemaModel';
import { _generateDataOptions } from '@packages/utils';

export const getOptionConfigs = (columns: any, subFormSchema?: JsonSchema): any => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [listOptions, setListOptions] = useState<any[]>([]);

  const fetchDetailSchema = async () => {
    try {
      if (subFormSchema) {
        const dataOptions = await _generateDataOptions(subFormSchema);
        if (_.isArray(dataOptions)) setListOptions(dataOptions);
      }
    } catch (error) {
      throw new Error('Error fetching schema detail');
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchDetailSchema();
  }, [columns, subFormSchema]);

  return { listOptions };
};
