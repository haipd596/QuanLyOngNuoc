import { JsonSchema } from '@packages/schema/schemaModel';
import React from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { selectActiveSchema, setSchema } from '~/redux/slices/FormSlice';
import ViewSchema from '../ViewSchema';
import './styles.scss';

function Toolbar() {
  const schema = useAppSelector(selectActiveSchema);
  const dispatch = useAppDispatch();

  const handleSave = (_schema: JsonSchema) => {
    dispatch(setSchema(_schema));
  };

  return (
    <div className="toolbar">
      <ViewSchema schema={schema} onSave={handleSave} />
    </div>
  );
}

export default Toolbar;
