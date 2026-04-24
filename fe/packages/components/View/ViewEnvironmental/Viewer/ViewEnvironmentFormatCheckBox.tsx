import { useWatch } from 'antd/es/form/Form';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { useEffect } from 'react';

type TViewDateProps = any;

const ViewEnvironmentFormatCheckBox = (props: TViewDateProps) => {
  const {
    onChange, parentName,
  } = props;

  const form = useFormInstance();
  const valueRealValue = useWatch(parentName, form);

  const transformDateValue = (_value: any) => {
    if (!onChange) return;

    if (!_value) {
      onChange([]);
      return;
    }

    const checkBoxObj = {
      'nuocmat.#cb#': false,
      'nuocduoidat.#cb#': false,
      'nuocmua.#cb#': false,
      'nuocbien.#cb#': false,
      'nuocthai.#cb#': false,
      'khongkhixungquanh.#cb#': false,
      'khithai.#cb#': false,
      'khithaiphuongtiengiaothong.#cb#': false,
      'dat.#cb#': false,
      'tramtich.#cb#': false,
      'chatthai.#cb#': false,
      'bun.#cb#': false,
      'chatonhiemhuucokhophanhuy.#cb#': false,
      nuockhac: '',
      khithaikhac: '',
    };

    const result: any = [];

    Object.entries(_value).forEach(([, values1]: any) => {
      values1.forEach((value1: any, index: any) => {
        const refer = [{ Table: 'mc_HoSo', FK_ID: 'HoSoId', feKey: '' }];
        const parsedValue = JSON.parse(value1);
        parsedValue.feKey = `mt_GCNQTMT_PhamViChungNhanDeNghi1_${index}`;
        parsedValue.Reference = JSON.stringify(refer);

        const PhamViTen = parsedValue?.PhamViTen;
        if (PhamViTen.includes('Nước mặt')) checkBoxObj['nuocmat.#cb#'] = true;
        if (PhamViTen.includes('Nước dưới đất')) checkBoxObj['nuocduoidat.#cb#'] = true;
        if (PhamViTen.includes('Nước mưa')) checkBoxObj['nuocmua.#cb#'] = true;
        if (PhamViTen.includes('Nước biển')) checkBoxObj['nuocbien.#cb#'] = true;
        if (PhamViTen.includes('Nước thải')) checkBoxObj['nuocthai.#cb#'] = true;
        if (PhamViTen.includes('Không khí xung quanh')) checkBoxObj['khongkhixungquanh.#cb#'] = true;
        if (
          PhamViTen.includes('Khí thải')
        ) checkBoxObj['khithai.#cb#'] = true;
        if (
          PhamViTen.includes('Khí thải phương tiện giao thông cơ giới đường bộ')
          || PhamViTen.includes('Không khí phương tiện giao thông cơ giới đường bộ')
        ) checkBoxObj['khithaiphuongtiengiaothong.#cb#'] = true;
        if (PhamViTen.includes('Đất')) checkBoxObj['dat.#cb#'] = true;
        if (PhamViTen.includes('Trầm tích')) checkBoxObj['tramtich.#cb#'] = true;
        if (PhamViTen.includes('Chất thải')) checkBoxObj['chatthai.#cb#'] = true;
        if (PhamViTen.includes('Bùn')) checkBoxObj['bun.#cb#'] = true;
        if (
          PhamViTen.includes('Nguyên liệu, nhiên liệu, vật liệu, sản phẩm, hàng hóa, thiết bị có chứa chất ô nhiễm hữu cơ khó phân hủy')
        ) checkBoxObj['chatonhiemhuucokhophanhuy.#cb#'] = true;

        if (PhamViTen.includes('Nước khác')) checkBoxObj.nuockhac = parsedValue?.PhamViTenKhac || '';
        if (PhamViTen.includes('Khí thải khác') || PhamViTen.includes('Không khí khác')) checkBoxObj.khithaikhac = parsedValue?.PhamViTenKhac || '';

        result.push(parsedValue);
      });
    });

    onChange(result);

    if (parentName.includes('mt_GCNQTMT_PhamViChungNhanDeNghi1')) {
      form.setFieldValue('checkBoxObj', [checkBoxObj]);
    }

    if (parentName.includes('mt_GCNQTMT_PhamViChungNhanDeNghi2')) {
      form.setFieldValue('checkBoxObj2', [checkBoxObj]);
    }
  };

  useEffect(() => {
    transformDateValue(valueRealValue);
  }, [valueRealValue]);

  return null;
};

export default ViewEnvironmentFormatCheckBox;
