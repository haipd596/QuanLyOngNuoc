import { buildResponseForServer } from '@packages/components/View/TableGroup/Viewer/constant';
import { defineComponent } from '@packages/utils/common';
import FormItem from 'antd/es/form/FormItem';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';

const TransformTable13C = ({ children, onChange, ...rest }: any) => {
  const form = useFormInstance();
  const name = `${rest.id}SpecialHidden`;

  // const { translations } = useLanguageForIndividual();

  const handleChange = (_value: any) => {
    onChange(_value);

    const keysToReplace = ['cungCap', 'caNuoc'];

    const initDataTable13C = _value.data.map((item: any) => {
      const newItem = { ...item };

      if (item.name === 'Thông tin khác') {
        delete newItem.name;
      }

      keysToReplace.forEach((key: string) => {
        if (Object.prototype.hasOwnProperty.call(newItem, key)) {
          newItem[`${key}.#cb#`] = newItem[key];
          delete newItem[key];
        }
      });

      return newItem;
    });

    form.setFieldValue(
      name,
      buildResponseForServer(2, null, initDataTable13C),
    );
  };

  return (
    <>
      {defineComponent(children, { onChange: handleChange, ...rest })}
      <FormItem name={name} hidden />
    </>
  );
};

export default TransformTable13C;
