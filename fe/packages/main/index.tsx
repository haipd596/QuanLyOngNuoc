import { ExportOutlined, EyeOutlined } from '@ant-design/icons';
import Actions from '@packages/components/Actions';
import FullViewForm from '@packages/components/FullViewForm';
import { useLanguage } from '@packages/components/LanguageContext';
import Toolbar from '@packages/components/Toolbar';
import { MODE_VIEW } from '@packages/constants/modeView';
import { TEMPLATE_NAME } from '@packages/constants/template';
import { insertJsonBaseSchema } from '@packages/utils/insertJsonBaseSchema';
import { insertJsonToSchema } from '@packages/utils/insertJsonToSchema';
import { Button, message, Spin } from 'antd';
// import { JsonEditor } from 'json-edit-react';
import {
  useCallback, useEffect, useRef,
} from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { useGetFormsQuery } from '~/redux/services/schemaApi';
import {
  addNewField, replaceFields, selectActiveSchema,
} from '~/redux/slices/FormSlice';
import { EnumDragDrop } from '~/types';
import BuilderBlock from './BuilderBlock';
import { FormBuilder, FormViewerEmbedWithBuilder } from './Forms';
import './styles.scss';

export function Form() {
  const { isLoading, isError } = useGetFormsQuery();
  // const [formData, setFormData] = useState({});
  const refOutputData = useRef<HTMLPreElement>(null);
  const schema = useAppSelector(selectActiveSchema);
  const loadingBuilderSchema = useAppSelector((state) => state.CMDK.isLoadingBuilderSchema);
  const { translate } = useLanguage();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      message.info('Connection is error');
    }
  }, [isError]);

  const addJsonElement = ({ id }: { id: string }) => {
    if (TEMPLATE_NAME[id]) {
      const baseSchema = insertJsonBaseSchema(id);
      dispatch(replaceFields(baseSchema.fields));
      return;
    }
    const fieldJson = insertJsonToSchema(id);
    dispatch(addNewField(fieldJson));
  };

  const [, drop] = useDrop(() => ({
    accept: EnumDragDrop.SIDE_MENU,
    drop: (item: { id: string }) => addJsonElement(item),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  const renderOutputView = useCallback((outputData: any) => {
    if (!refOutputData.current) return;
    try {
      refOutputData.current.innerHTML = JSON.stringify(outputData, null, 2);
    } catch (error: any) {
      return (
        <p>
          [Error]:
          {error.message}
        </p>
      );
    }
  }, []);

  if (isLoading) return 'loading....';

  return (
    <div className="form-builder-demo-wrapper">
      <div className="row">
        <div ref={drop as any} className="builder-block">
          <BuilderBlock
            title={translate('builder_title')}
            toolBar={<Toolbar />}
            isHavingRef
          >
            <Spin spinning={loadingBuilderSchema}>
              <FormBuilder schema={schema} modeView={MODE_VIEW.EDIT} />
            </Spin>
          </BuilderBlock>
        </div>
        <BuilderBlock
          title={translate('viewer_title')}
          toolBar={(
            <div>
              <a href={`/viewer/${schema.schemaKey}?tthcId=${(new URLSearchParams(document.location.search)).get('tthcId')}`} target="_blank" rel="noreferrer">
                <Button icon={<ExportOutlined />} style={{ marginRight: 6 }} type="primary" />
              </a>
              <a href={`/details/${schema.schemaKey}`} target="_blank" rel="noreferrer">
                <Button icon={<EyeOutlined />} style={{ marginRight: 6 }} type="primary" />
              </a>
              <FullViewForm schema={schema} />
            </div>
          )}
        >
          <FormViewerEmbedWithBuilder
            schema={schema}
            modeView={MODE_VIEW.VIEW}
            onFieldsRender={renderOutputView}
          />
        </BuilderBlock>
      </div>
      {/* <div className="row">
        <BuilderBlock title={translate('input_json')}>
          <JsonEditor
            maxWidth="100%"
            data={{ jsonData: formData }}
            theme={[
              'monoLight',
              {
                fragments: { iconAdjust: { color: 'black' } },
                styles: {
                  container: {
                    fontSize: '14px',
                    maxWidth: 0,
                    minWidth: '100%',
                  },
                },
              },
            ]}
            onUpdate={({ newData }) => {
              const data = (newData as any)?.jsonData;
              if (data) {
                setFormData(data);
              }
            }}
          />
        </BuilderBlock>
        <BuilderBlock title={translate('output_json')}>
          <div className="output builder-block--inner">
            <pre ref={refOutputData} style={{ overflow: 'auto' }} />
          </div>
        </BuilderBlock>
      </div> */}
      <Actions activeSchema={schema} />
    </div>
  );
}
