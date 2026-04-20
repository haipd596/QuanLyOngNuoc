import Actions from '@packages/components/Actions';
import { BuilderBar } from '@packages/components/BuilderBar';
import SearchBox from '@packages/components/BuilderBar/SearchBox';

// import ChangeSchemas from '@packages/components/ChangeSchemas';
import SideBarRight from '@packages/components/ConfigFieldSideBar/SideBarRight';
import FullViewForm from '@packages/components/FullViewForm';
import { useLanguage } from '@packages/components/LanguageContext';
// import ModalSelectSchema from '@packages/components/ModalSelectSchema';
import ModalSelectTthc from '@packages/components/ModalSelectTthc';
import Toolbar from '@packages/components/Toolbar';
import { MODE_VIEW } from '@packages/constants/modeView';
import { TEMPLATE_NAME } from '@packages/constants/template';
import BuilderBlock from '@packages/main/BuilderBlock';
import {
  FormBuilder, FormViewerStandalone, Schema,
} from '@packages/main/Forms';
import { insertJsonBaseSchema } from '@packages/utils/insertJsonBaseSchema';
import { insertJsonToSchema } from '@packages/utils/insertJsonToSchema';
import { Layout, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { useEffect } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
// import { useLazyGetSchemaDetailQuery } from '~/redux/services/schemaApi';
import {
  addNewField, replaceFields, selectActiveSchema, selectTthc, setSchema,
} from '~/redux/slices';
import { EnumDragDrop } from '~/types';
// import packageJson from '../../package.json';

export const Home = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const tthch = useAppSelector(selectTthc);
  const { translate } = useLanguage();
  const schema = useAppSelector(selectActiveSchema);
  const dispatch = useAppDispatch();
  useEffect(() => {
    try {
      const schemaJson = JSON.parse(tthch.SchemaEform);
      if (schemaJson) {
        dispatch(setSchema(Schema.reconcile(schemaJson) as any));
      }
    } catch (error) {
      console.error(error);
    }
  }, [tthch]);

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
    drop: (item: { id: string }) => {
      addJsonElement(item);
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout style={{ height: '100vh' }}>
        <Sider
          className="form-builder-sider-left"
          collapsedWidth="0"
          width={270}
        >
          <div className="fixed-to-top">
            <SearchBox />
          </div>
          <BuilderBar />
        </Sider>
        {/**/}

        <Layout>
          <Content>
            <div
              className="form-builder-content"
              ref={drop as any}
            >
              <BuilderBlock
                title={translate('builder_title')}
                toolBar={(
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Toolbar />
                    <FullViewForm schema={schema} />
                  </div>
                  )}
                isHavingRef
              >
                <div style={{
                  padding: 8,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  height: '100%',
                }}
                >
                  {schema
                    ? (
                      <>
                        <FormBuilder
                          schema={schema}
                          modeView={MODE_VIEW.EDIT}
                        />
                        <div style={{ display: 'none' }}>
                          <FormViewerStandalone
                            schema={schema}
                            modeView={MODE_VIEW.VIEW}
                          />
                        </div>
                      </>
                    )
                    : null}
                </div>
              </BuilderBlock>
            </div>
          </Content>
        </Layout>
        <Sider
          className="form-builder-sider-right"
          breakpoint="lg"
          collapsedWidth="0"
          width={350}
          style={{ background: colorBgContainer }}
        >
          <SideBarRight />
        </Sider>
        {schema ? <Actions activeSchema={schema} /> : null}
        <ModalSelectTthc />
        {/* <ModalSelectSchema /> */}
      </Layout>
    </DndProvider>
  );
};
