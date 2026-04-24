import { defineComponent } from '@packages/utils/common';
import FormItem from 'antd/es/form/FormItem';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { buildResponseForServer } from '../constant';

const TransformTableData = ({ children, onChange, name, ...rest }: any) => {

  const form = useFormInstance();

  const handleChange = (_value: any) => {
    onChange(_value);

    const translatedDataTableGroup = _value.data.map((item: any) => {
      return {
        ...item,
        name: item.name,
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
