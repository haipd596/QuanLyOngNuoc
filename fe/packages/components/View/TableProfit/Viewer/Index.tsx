import FormItem from 'antd/es/form/FormItem';
import _get from 'lodash/get';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveSchema } from '~/redux/slices/FormSlice';
import en from '../locales/en/table-en.json';
import vi from '../locales/vi/table-vi.json';
import { LanguageProviderForIndividual } from './LanguageSwitcherForIndividuals';
import Table1 from './Table1';
import TransformTableData from './TransformTableData';

export const TableProfitViewer = (props:any) => {
  const {
    fieldKey,
    // onChange,
    // value
  } = props;

  const schema = useAppSelector(selectActiveSchema);

  const curField = schema?.fields?.find((item:any) => item?.key === fieldKey);
    const _curServerKey = _get(curField, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue', '');

  return (
    <FormItem name={_curServerKey}>
      <TransformTableData>
        <Table1 />
      </TransformTableData>
    </FormItem>
  )
}

export default ({ languages, ...props }: any) => (
  <LanguageProviderForIndividual lng={languages} translationsVi={vi} translationsEn={en}>
    <TableProfitViewer {...props} />
  </LanguageProviderForIndividual>
);