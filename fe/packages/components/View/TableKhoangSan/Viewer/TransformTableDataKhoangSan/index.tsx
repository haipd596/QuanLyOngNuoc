import { buildResponseForServerKhoangSan } from '@packages/components/View/TableGroup/Viewer/constant';
import { defineComponent } from '@packages/utils/common';
import FormItem from 'antd/es/form/FormItem';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';

const TransformTableDataKhoangSan = ({ children, onChange, ...rest }: any) => {
  const form = useFormInstance();
  const name = `${rest.id}SpecialHidden`;

  const handleChange = (_value: any) => {
    onChange(_value);

    const translatedDataTableHanNgach = _value.data.map((item: any) => {
      return {
        ...item,
        name: item.name,
      };
    });

    form.setFieldValue(
      name,
      buildResponseForServerKhoangSan(1, _value.years, translatedDataTableHanNgach),
    );
  };

  return (
    <>
      {defineComponent(children, { onChange: handleChange, ...rest })}
      <FormItem name={name} hidden />
    </>
  );
};

export default TransformTableDataKhoangSan;
