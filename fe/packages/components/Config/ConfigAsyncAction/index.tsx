import { Button, Input, InputProps } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useFetchBase } from '@packages/hooks/useFetchBase';
import { IField } from '@packages/schema/fields/fieldModel';
import _isEmpty from 'lodash/isEmpty';
import { buildPathDefaultValue } from '@packages/utils/common';
import _get from 'lodash/get';
import { AnyObject } from 'antd/es/_util/type';
import clsx from 'clsx';
import JsonPreview from '@packages/components/JsonPreview';

export type ConfigAsyncActionProps = Omit<InputProps, 'onChange'> & {
  onSave: (value: string) => void;
  fieldSchema: IField
};

function ConfigAsyncAction(props: ConfigAsyncActionProps) {
  const { onSave, fieldSchema } = props;

  const [text, seText] = useState('');
  const [schema, setSchema] = useState({});
  const [isParsing, setIsParsing] = useState(true);
  const [data, setData] = useState<AnyObject>({});

  const params = useMemo(() => ({
    ...schema,
    onSuccess: setData,
  }), [schema]);

  const { fetchBase, isLoading } = useFetchBase(params as any);

  // listen when schema change, re-parse to call api again
  useEffect(() => {
    if (fieldSchema) {
      const { componentPropsAllowConfig } = fieldSchema;
      if (!_isEmpty(componentPropsAllowConfig)) {
        setIsParsing(true);
        const results = Object.keys(componentPropsAllowConfig).reduce((acc, cur) => {
          acc[cur] = _get(componentPropsAllowConfig[cur], buildPathDefaultValue(), {});
          return acc;
        }, {} as any);
        setSchema(results);
        setIsParsing(false);
      }
    }
  }, [fieldSchema]);

  useEffect(() => {
    if (!isParsing) {
      fetchBase();
    }
  }, [fetchBase, isParsing]);

  const handleSave = () => {
    onSave(text.trim());
  };

  const handleChange: InputProps['onChange'] = (e) => {
    seText(e.target.value);
  };

  return (
    <div className={clsx('async-action', { loading: isLoading })}>
      <Input {...props} onChange={handleChange} />
      <Button onClick={handleSave} disabled={isParsing} style={{ marginTop: 8 }}>
        SAVE
      </Button>
      <p>Preview data</p>
      <JsonPreview data={data} />
    </div>
  );
}

export default ConfigAsyncAction;
