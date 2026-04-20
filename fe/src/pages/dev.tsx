import { BuilderBar } from '@packages/components/BuilderBar';
import Header from '@packages/components/BuilderBar/Header';
import SearchBox from '@packages/components/BuilderBar/SearchBox';
import ChangeSchemas from '@packages/components/ChangeSchemas';
import SideBarRight from '@packages/components/ConfigFieldSideBar/SideBarRight';
import { useLanguage } from '@packages/components/LanguageContext';
// import ModalSelectSchema from '@packages/components/ModalSelectSchema';
import { apiGetSchemaByTthcId } from '@packages/dvc-service';
import { Form } from '@packages/main';
import { Schema } from '@packages/main/Forms';
import { Layout, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch } from '~/redux/hooks';
import { useCreateSchemaMutation } from '~/redux/services/schemaApi';
import { setSchema } from '~/redux/slices';
// import packageJson from '../../package.json';

export const Dev = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useAppDispatch();
  const [handleCreateSchema] = useCreateSchemaMutation(); // Mutation for creating a new schema

  useEffect(() => {
    (async () => {
      const [schema] = await Promise.all([
        apiGetSchemaByTthcId(),
      ]);

      await handleCreateSchema(
        JSON.parse(JSON.stringify(schema)),
      ); // Create the new schema

      if (schema) {
        dispatch(setSchema(Schema.reconcile(schema as any))); // Set the schema in the app state
      }
    })();
  }, []);

  // const { version: buildVersion } = packageJson;
  const { translate } = useLanguage();

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout style={{ height: '100vh' }}>
        <Sider
          className="form-builder-sider-left"
          collapsedWidth="0"
          width={270}
        >
          <div className="fixed-to-top">
            <Header
              title={translate('header_title')}
              description={translate('header_version')}
            />
            <SearchBox />
            <ChangeSchemas />
          </div>
          <BuilderBar />
        </Sider>
        {/**/}

        <Layout>
          <Content>
            <div
              className="form-builder-content"
            >
              <Form />
            </div>
          </Content>
        </Layout>
        <Sider
          className="form-builder-sider-right"
          breakpoint="lg"
          collapsedWidth="0"
          width={300}
          style={{ background: colorBgContainer }}
        >
          <SideBarRight />
        </Sider>
        {/* <ModalSelectSchema /> */}
      </Layout>
    </DndProvider>
  );
};
