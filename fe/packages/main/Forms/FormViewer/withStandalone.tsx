import { TJsonProperties } from '@packages/@types';
import { JsonSchema, Schema } from '@packages/schema/schemaModel';
import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';
import React, { useEffect, useState } from 'react';
import { FormViewerCoreProps } from './FormViewerCore';

/**
 * When need to use the form viewer with NO REDUX
 * @param Component
 * @returns
 */
export const withStandalone = (
  Component: React.FC<FormViewerCoreProps>,
) => React.forwardRef((props: FormViewerCoreProps, ref) => {
  const [schema, setSchema] = useState<JsonSchema>();

  useEffect(() => {
    // DESC: because props.schema is redux data passed down
    if (props.schema) {
      const _schema = _cloneDeep(props.schema);

      const schema1 = Schema.reconcile(_schema);
      setSchema(schema1);
      if (props.onSchemaChange) {
        props.onSchemaChange(schema1);
      }
    }
  }, [JSON.stringify(props.schema)]);

  const handleChange = (changed: TJsonProperties[]) => {
    setSchema((prevSchema) => {
      if (changed.length > 0 && prevSchema) {
        const newSchema = {
          ...prevSchema,
          fields: prevSchema.fields.map((field) => {
            const allChanged = changed.filter(({ fieldKey }) => field.key === fieldKey);

            if (allChanged.length > 0) {
              allChanged.forEach(({ path, value }) => {
                _set(field, path, value);
              });
              return _cloneDeep(field);
            }

            return field;
          }),
        };

        if (props.onSchemaChange) {
          props.onSchemaChange(newSchema);
        }

        return newSchema;
      }

      return prevSchema;
    });
  };

  if (!schema) return;

  return (
    <Component {...props} schema={schema} onAutoRun={handleChange} ref={ref as any} />
  );
});
