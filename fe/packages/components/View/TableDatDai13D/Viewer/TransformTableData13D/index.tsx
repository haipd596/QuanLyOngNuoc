import { buildResponseForServer } from '@packages/components/View/TableGroup/Viewer/constant';
import { useLanguageForIndividual } from '@packages/components/View/TableGroup/Viewer/LanguageSwitcherForIndividuals';
import { defineComponent } from '@packages/utils/common';
import FormItem from 'antd/es/form/FormItem';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { vangTransformer } from './utils';

const TransformTableData13D = ({ children, onChange, ...rest }: any) => {
  const { translations } = useLanguageForIndividual();

  const form = useFormInstance();
  const name = `${rest.id}SpecialHidden`;

  const handleChange = (_value: any) => {
    onChange(_value);

    const translatedDataTableGroup = _value.data.map((item: any) => {
      return {
        ...item,
        name: translations[item.name] || item.name,
      };
    });

    const response = vangTransformer(translatedDataTableGroup);

    form.setFieldValue(
      name,
      {
        response: buildResponseForServer(2, _value.years, translatedDataTableGroup),
        vangResponse: response,
      },
    );
  };

  return (
    <>
      {defineComponent(children, { onChange: handleChange, ...rest })}
      <FormItem name={name} hidden />
    </>
  );
};

export default TransformTableData13D;
