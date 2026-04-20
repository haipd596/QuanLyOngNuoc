import { useEffect, useState } from 'react';
import { useParams } from '@tanstack/react-router';

import JsonPreview from '@packages/components/JsonPreview';
import ViewSchema from '@packages/components/ViewSchema';
import { MODE_VIEW } from '@packages/constants/modeView';
import { JsonSchema, Schema } from '@packages/schema/schemaModel';

import { FormViewerStandalone } from '@packages/main/Forms';
import { ApiConfig } from '~/configs';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { selectActiveSchema, setSchema } from '~/redux/slices';
import './styles.scss';

export const ViewerPage = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const schema = useAppSelector(selectActiveSchema);

  const params = useParams({from: {}});

  const handleSave = (value: any) => {
    dispatch(setSchema(value));
  };

  useEffect(() => {
    if (params.schemaKey) {
      setIsLoading(true);
      fetch(`${ApiConfig.apiBaseUrl}/${params.schemaKey}`)
        .then((res) => res.json())
        .then((_schema) => dispatch(setSchema(Schema.reconcile(_schema))))
        .finally(() => setIsLoading(false));
    }
  }, [params.schemaKey]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="viewer-page" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      <div className="form-inner">
        <div className="form-inner-heading">
          <h2>Viewer</h2>
          <ViewSchema schema={schema} onSave={handleSave} />
        </div>
        <div style={{ border: '1px solid teal', padding: 8 }}>
          <FormViewerStandalone
            schema={schema as unknown as JsonSchema}
            modeView={MODE_VIEW.VIEW}
            onFinish={setData}
          />
        </div>
      </div>
      {data && (
        <div style={{
          backgroundColor: 'rgb(1 22 78 / 80%)', color: 'white', padding: 8, fontSize: 16,
        }}
        >
          Output
          <JsonPreview data={data} />
        </div>
      )}
    </div>
  );
};
