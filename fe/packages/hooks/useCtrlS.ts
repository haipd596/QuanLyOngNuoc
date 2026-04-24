import { callbackSaveJson } from '@packages/components/ButtonUpdateSchema/callbackSaveJson';
import { Schema } from '@packages/main/Forms';
import { message } from 'antd';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { useUpdateSchemaMutation } from '~/redux/services/schemaApi';
import { selectActiveSchema } from '~/redux/slices';

export const useCtrlS = () => {
  const isFirstRender = useRef(true);
  const [update] = useUpdateSchemaMutation();
  const schema = useAppSelector(selectActiveSchema);

  useEffect(() => {
    const handlers = (e: any) => {
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 83 && e.shiftKey) {
        update({ body: Schema.output(schema), schemaKey: schema?.schemaKey });
        callbackSaveJson(schema);
        message.success('Saved!');
      }
    };

    document?.addEventListener('keydown', handlers);

    return () => {
      document.removeEventListener('keydown', handlers);
      isFirstRender.current = true;
    };
  }, [schema]);
};
