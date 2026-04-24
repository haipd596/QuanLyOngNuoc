import {
  useEffect, useState,
} from 'react';

import { MODE_VIEW } from '@packages/constants/modeView';
import { apiGetFormDataByHsIdAndIdForm } from '@packages/dvc-service/apiGetFormDataByHsIdAndIdForm';
import { apiGetThuTucHanhIdByIdForm } from '@packages/dvc-service/apiGetThuTucHanhIdByIdForm';
import { Schema } from '@packages/main/Forms';
import { message } from 'antd';
import { DEMO_VIEWER } from '~/pages/ViewPage/demo';
import { useAppDispatch } from '~/redux/hooks';
import { setSchema } from '~/redux/slices';
import ModalDigitalPaper from '../DigitalPaper/Viewer/ModalDigitalPaper';
import './styles.scss';

function FormViewDvcCallback() {
  const [isOpen, setIsOpen] = useState(false);
  const [schemaFromObservable, setSchemaFromObservable] = useState(DEMO_VIEWER);
  const [formData, setFormData] = useState({});
  const [formId, setFormId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const handler = async ({ FormId, hsId }: any) => {
        setIsOpen(true);
        setIsLoading(true);
        message.info('Đang lấy thông tin...');
        const [tthc, _formData] = await Promise.all([
          apiGetThuTucHanhIdByIdForm(FormId),
          apiGetFormDataByHsIdAndIdForm(hsId, FormId),
        ]);
        console.log("FORMVIEW DVC CALLBACK::", tthc, _formData)
        setFormId(FormId);
        const schema = JSON.parse(tthc?.SchemaEform);
        setSchemaFromObservable(schema);
        setFormData(_formData || {});
        dispatch(setSchema(Schema.reconcile(schema) || DEMO_VIEWER));
        setIsLoading(false);
      };

      // @ts-expect-error: should work
      observableSchemaDuThao.subscribe(handler);

      return () => {
        // @ts-expect-error: should work
        observableSchemaDuThao.unsubscribe(handler);
      };
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return null;

  return isOpen && (
    <ModalDigitalPaper
      isOpen={isOpen}
      isDuThao
      giayToId={formId || ''}
      setIsOpen={setIsOpen}
      subForm={schemaFromObservable as any}
      modeView={MODE_VIEW.VIEW}
      value={{
        file: {
          originalData: formData,
        },
      }}
      loading={isLoading}
    />
  );
}

export default FormViewDvcCallback;
