import ViewSchema from '@packages/components/ViewSchema';
import { MODE_VIEW } from '@packages/constants/modeView';
import { apiGetSchemaByTthcId } from '@packages/dvc-service';
import { apiGetFormDataByHsId } from '@packages/dvc-service/apiGetFormDataByHsId';
import { FormViewerStandalone, JsonSchema, Schema } from '@packages/main/Forms';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { selectActiveSchema, setSchema as setActiveSchema, setFormDataInit } from '~/redux/slices';

const Details = () => {
  const [isLoadingFormData, setIsLoadingFormData] = useState(false);
  const [isLoadingJsonSchema, setIsLoadingJsonSchema] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useAppDispatch();
  const activeSchema = useAppSelector(selectActiveSchema);

  const handleSave = (value: any) => {
    dispatch(setActiveSchema(value));
  };

  useEffect(() => {
    setIsLoadingJsonSchema(true);
    apiGetSchemaByTthcId().then((schemaJson: any) => {
      if (schemaJson) {
        dispatch(setActiveSchema(Schema.reconcile(schemaJson) as any));
      }
    }).finally(() => {
      setIsLoadingJsonSchema(false);
    });
  }, []);

  useEffect(() => {
    setIsLoadingFormData(true);
    apiGetFormDataByHsId().then((data: any) => {
      if (data) {
        dispatch(setFormDataInit(data));
        setFormData(data);
      }
    }).finally(() => {
      setIsLoadingFormData(false);
    });
  }, []);

  if (isLoadingFormData || isLoadingJsonSchema) return <p>Loading...</p>;

  return (
    <div className="viewer-page" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      <div className="form-inner">
        {import.meta.env.DEV && (
          <div className="form-inner-heading">
            <h2>Viewer</h2>
            <ViewSchema schema={activeSchema} onSave={handleSave} />
          </div>
        )}
        <FormViewerStandalone
          schema={activeSchema as unknown as JsonSchema}
          modeView={MODE_VIEW.DETAILS}
          formData={formData}
        />
      </div>
    </div>
  );
};

export default Details;
