import { defineComponent } from '@packages/utils/common';
import FormItem from 'antd/es/form/FormItem';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { buildResponseForServer } from '../constant';
import { useLanguageForIndividual } from '../LanguageSwitcherForIndividuals';

const TransformTableData = ({ children, onChange, ...rest }: any) => {
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
    // console.log(_value.profit);
    
    form.setFieldValue(
      name,
      buildResponseForServer(2, _value.profit, translatedDataTableGroup),
    );
  };

  return (
    <>
      {defineComponent(children, { onChange: handleChange, ...rest })}
      <FormItem name={name} hidden />
    </>
  );
};

export default TransformTableData;
