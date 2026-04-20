import { useEffect, useState } from 'react';

import JsonPreview from '@packages/components/JsonPreview';
import { MODE_VIEW } from '@packages/constants/modeView';
import { JsonSchema } from '@packages/schema/schemaModel';
import '../ViewPage/styles.scss';
// import { eq } from 'lodash';
import { apiGetSchemaByTthcId } from '@packages/dvc-service';
import { apiGetDraftFormDataByHsId } from '@packages/dvc-service/apiGetDraftFormDataByHsId';
import { apiGetFormDataByHsId } from '@packages/dvc-service/apiGetFormDataByHsId';
import { FormViewerStandalone, Schema } from '@packages/main/Forms';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { selectActiveSchema, setSchema } from '~/redux/slices';

export const ViewerPageDvc = () => {
  const [data, setData] = useState();
  const [formData, setFormData] = useState({});
  const dispatch = useAppDispatch();
  const schema = useAppSelector(selectActiveSchema);
  const [isLoading, setIsLoading] = useState(true);
  const params = new URLSearchParams(window.location.href);

  useEffect(() => {
    const isDraft = params.get('d') === 'true';
    const serviceGetFormData = isDraft ? apiGetDraftFormDataByHsId : apiGetFormDataByHsId;

    (async () => {
      try {
        const [_data, _schema] = await Promise.all([
          serviceGetFormData(),
          apiGetSchemaByTthcId(),
        ]);

        setFormData(_data);
        dispatch(setSchema(Schema.reconcile(_schema as any)));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [JSON.stringify(params)]);

  if (isLoading) return null;

  return (
    <div className="viewer-page" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      <div className="form-inner">
        <FormViewerStandalone
          schema={schema as unknown as JsonSchema}
          modeView={MODE_VIEW.VIEW}
          onFinish={setData}
          formData={formData}
        />
      </div>
      {data && (
        <div style={{
          backgroundColor: 'rgb(1 22 78 / 80%)',
          color: 'white',
          padding: 8,
          fontSize: 16,
          display: 'none',
        }}
        >
          Output
          <JsonPreview data={data} />
        </div>
      )}
    </div>
  );
};
