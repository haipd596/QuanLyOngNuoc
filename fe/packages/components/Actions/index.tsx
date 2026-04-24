import {
  DeleteOutlined, EditOutlined, PlusOutlined, SaveOutlined, SettingOutlined,
} from '@ant-design/icons';
import { JsonSchema } from '@packages/schema/schemaModel';
import { Flex, FloatButton, Popover } from 'antd';
import ButtonCreateSchema from '../ButtonCreateSchema';
import ButtonDeleteSchema from '../ButtonDeleteSchema';
import ButtonEditSchema from '../ButtonEditSchema';
import ButtonSelectTthc from '../ButtonSelectTthc';
import ButtonSaveSchema from '../ButtonUpdateSchema';
import LanguageSwitcher from '../LanguageSwitcher';
import SwitchTheme from '../SwitchTheme';
import './styles.scss';

interface IAction {
  activeSchema: JsonSchema,
}

const Actions: React.FC<IAction> = ({ activeSchema }) => (
  <Popover
    placement="leftTop"
    content={(
      <div className="actions-wrapper">
        <Flex vertical>
          <LanguageSwitcher />
          <SwitchTheme />
          <ButtonDeleteSchema
            schemaActive={activeSchema}
            icon={<DeleteOutlined />}
          />
          <ButtonSaveSchema type="text" icon={<SaveOutlined />} />
          <ButtonEditSchema type="text" icon={<EditOutlined />} />
          <ButtonCreateSchema icon={<PlusOutlined />} />
          <ButtonSelectTthc icon={<PlusOutlined />}/>
        </Flex>
      </div>
    )}
    className="custom_btn_action_group"
  >
    <FloatButton
      icon={<SettingOutlined style={{ fontSize: 20 }} />}
      style={{
        width: 50,
        height: 50,
      }}
      rootClassName="float-actions"
    />
  </Popover>
);

export default Actions;
