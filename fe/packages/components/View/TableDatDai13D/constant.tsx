import {
  Checkbox, Input, Space, Typography,
} from 'antd';
import _ from 'lodash';

const { Text } = Typography;

// 1. Định nghĩa các constant cho Text dưới dạng mảng dữ liệu
const textConstants = [
  { key: '1', text: 'Lớp thông tin lưu trữ dữ liệu điều tra' },
  { key: '2', text: 'Bản đồ kết quả đánh giá chất lượng đất:' },
  { key: '3', text: 'Bản đồ kết quả đánh giá tiềm năng đất đai:' },
  { key: '4', text: 'Bản đồ vị trí điểm lấy mẫu đất:' },
  { key: '5', text: 'Bản đồ nguồn, tác nhân gây ô nhiễm, ranh giới vùng đất:' },
  { key: '6', text: 'Bản đồ kết quả phân tích trong đánh giá ô nhiễm đất:' },
  { key: '7', text: 'Bản đồ kết quả đánh giá ô nhiễm đất:' },
  { key: '8', text: 'Bản đồ thoái hóa đất:' },
  { key: '9', text: 'Bản đồ khu vực đất đã thực hiện bảo vệ, cải tạo phục hồi đất:' },
  { key: '10', text: 'Thông tin phẫu diện đất' },
  { key: '11', text: 'Thông tin mẫu nước theo Phiếu lấy mẫu nước' },
  { key: '12', text: 'Phiếu điều tra tình hình sử dụng đất và tiềm năng đất nông nghiệp:' },
  { key: '13', text: 'Phiếu điều tra tiềm năng đất phi nông nghiệp' },
  { key: '14', text: 'Báo cáo điều tra, đánh giá đất đai' },
  { key: '15', text: 'Báo cáo tổng hợp kết quả điều tra, đánh giá về chất lượng đất, tiềm năng đất đai' },
  { key: '16', text: 'Báo cáo tổng hợp kết quả điều tra, đánh giá về đánh giá thoái hóa đất, ô nhiễm đất' },
  { key: '17', text: 'Báo cáo tổng hợp kết quả khu vực đất đã thực hiện bảo vệ, cải tạo phục hồi đất' },
  { key: '18', text: 'Báo cáo tổng hợp kết quả điều tra, đánh giá về kết quả quan trắc giám sát tài nguyên đất' },
];

// 2. Tạo các hàm chung để sử dụng cho các component lặp lại
export const createCheckboxOptions = (value: any, onChange: any) => {
  const { label, checkBoxValue } = value;

  const handleChange = (newCheckedValues: string[]) => {
    onChange({
      ...value,
      checkBoxValue: Object.keys(checkBoxValue).reduce((acc, cur) => {
        acc[cur] = newCheckedValues.includes(cur);

        return acc;
      }, {} as any),
    });
  };

  return (
    <>
      <p>
        <Text>{label}</Text>
      </p>
      <Checkbox.Group
        onChange={handleChange}
        value={Object.keys(checkBoxValue).filter((key) => checkBoxValue[key]).map((key) => key)}
      >
        <Space direction="horizontal">
          {Object.keys(checkBoxValue).map((key) => (
            <Checkbox key={key} value={key}>{key}</Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    </>
  );
};

export const createVerticalInputs = (fields: any, onChange: any) => {
  const handleChange = (index: number, value: string) => {
    const cloned = _.cloneDeep(fields);
    cloned[index].value = value;
    onChange(cloned);
  };

  return (
    <Space direction="vertical">
      {fields.map(({ label, value }: any, index: number) => (
        <div key={index}>
          <Text>{label}</Text>
          <Input
            value={value}
            onChange={(e) => {
              handleChange(index, e.target.value);
            }}
          />
        </div>
      ))}
    </Space>

  );
};

export const createReportCheckboxOptions = (value: any, onChange: any) => {
  const { label, checkBoxValue, chuyenDeValue } = value;

  const handleChange = (fieldName: string, _value: any) => {
    onChange({
      ...value,
      [fieldName]: _value,
    });
  };

  const handleCheckboxChange = (newCheckedValues: string[]) => {
    onChange({
      ...value,
      checkBoxValue: Object.keys(checkBoxValue).reduce((acc, cur) => {
        acc[cur] = newCheckedValues.includes(cur);

        return acc;
      }, {} as any),
    });
  };

  return (
    <>
      <p>
        <Text>{label}</Text>
      </p>
      <Checkbox.Group
        value={Object.keys(checkBoxValue).filter((key) => checkBoxValue[key]).map((key) => key)}
        onChange={handleCheckboxChange}
      >
        <Space direction="vertical">
          <Space direction="horizontal">
            {Object.keys(checkBoxValue).map((key) => (
              <Checkbox key={key} value={key}>{key}</Checkbox>
            ))}
          </Space>
        </Space>
      </Checkbox.Group>
      <div>
        <Text>Chuyên đề:</Text>
        <Input value={chuyenDeValue} onChange={(e) => handleChange('chuyenDeValue', e.target.value ? e.target.value : null)} />
      </div>
    </>

  );
};

export const DOC_TYPE_IS_CHECKBOX = [
  2, 3, 4, 5, 7, 8, 9,
];

export const DOC_TYPE_MAU_DAT = [
  6,
];

export const DOC_TYPE_MAU_REPORT_DAT = [
  14, 15, 16, 17, 18,
];

const MAU_INPUTS = [
  {
    label: 'Ký hiệu phẫu diện:',
    value: '',
    key: 'khPhauDien',
  }, {
    label: 'Địa chỉ lấy mẫu:',
    value: '',
    key: 'DcLayMau',
  },
];

export const LEVEL_VERTICAL_INPUT = {
  10: MAU_INPUTS,
  11: MAU_INPUTS,
  12: MAU_INPUTS,
  13: [
    {
      label: 'Mã phiếu:',
      value: '',
      key: 'maPhieu',
    },
    {
      label: 'Địa chỉ lấy mẫu:',
      value: '',
      key: 'DcLayMau',
    },
  ],
} as any;

// 3. Map từ textConstants để tạo ra data
export const TABLE13D_DATASOURCE = textConstants.map((item) => {
  const { key, text } = item;
  let defaultCheckboxValue = {};

  const CHECKBOX_LIST_1 = {
    'Dữ liệu': false,
    'Bản đồ số': false,
    'Bản đồ quét': false,
  };

  const CHECKBOX_LIST_2 = {
    'Cấp cả nước': false,
    'Cấp vùng': false,
    'Cấp tỉnh': false,
  };

  // Kiểm tra key để xác định cấu trúc doc_type và level phù hợp
  if (DOC_TYPE_IS_CHECKBOX.includes(Number(key))) {
    defaultCheckboxValue = CHECKBOX_LIST_1;
  }

  if (DOC_TYPE_MAU_REPORT_DAT.includes(Number(key))) {
    defaultCheckboxValue = CHECKBOX_LIST_2;
  }

  if (DOC_TYPE_MAU_DAT.includes(Number(key))) {
    defaultCheckboxValue = {
      checkbox1: CHECKBOX_LIST_1,
      checkbox2: CHECKBOX_LIST_1,
    };
  }

  let level: any = '';
  if (LEVEL_VERTICAL_INPUT[key]) {
    level = LEVEL_VERTICAL_INPUT[key];
  }

  return {
    key,
    doc_type: {
      label: text,
      checkBoxValue: defaultCheckboxValue,
      chuyenDeValue: DOC_TYPE_MAU_REPORT_DAT.includes(Number(key)) ? '' : null,
    },
    supply: false,
    year: null,
    level,
  };
});
