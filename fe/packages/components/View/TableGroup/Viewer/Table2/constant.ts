import { randomString } from '@packages/utils/radomString';
import _ from 'lodash';

export const OPTIONS_SAN_PHAM = [
  {
    value:
      '1. Máy điều hòa không khí, gồm có một quạt chạy bằng mô tơ và các bộ phận làm thay đổi nhiệt độ và độ ẩm, kể cả loại máy không điều chỉnh độ ẩm một cách riêng biệt.',
    title:
      '1. Máy điều hòa không khí, gồm có một quạt chạy bằng mô tơ và các bộ phận làm thay đổi nhiệt độ và độ ẩm, kể cả loại máy không điều chỉnh độ ẩm một cách riêng biệt.',
    MA_HS: '84.15',
    children: [
      {
        value: '1.1- Loại sử dụng cho người, trong xe có động cơ:',
        title: '1.1- Loại sử dụng cho người, trong xe có động cơ:',
        MA_HS: '8415.2',
        children: [
          {
            value: '1.1.1- - Công suất làm mát không quá 26,38 kW',
            title: '1.1.1- - Công suất làm mát không quá 26,38 kW',
            MA_HS: '8415.20.10',
          },
          {
            value: '1.1.2- - Loại khác',
            title: '1.1.2- - Loại khác',
            MA_HS: '8415.20.90',
          },
        ],
      },
    ],
  },
  {
    value:
      '3. Máy điều hòa không khí, gồm có một quạt chạy bằng mô tơ và các bộ phận làm thay đổi nhiệt độ và độ ẩm, kể cả loại máy không điều chỉnh độ ẩm một cách riêng biệt.',
    title:
      '3. Máy điều hòa không khí, gồm có một quạt chạy bằng mô tơ và các bộ phận làm thay đổi nhiệt độ và độ ẩm, kể cả loại máy không điều chỉnh độ ẩm một cách riêng biệt.',
    MA_HS: '84.15',
    children: [
      {
        value:
          '3.1- Loại thiết kế để lắp vào cửa sổ, tường, trần hoặc sàn, kiểu một khối (lắp liền trong cùng một vỏ, một cục) hoặc "hệ thống nhiều khối chức năng" (cục nóng, cục lạnh tách biệt):',
        title:
          '3.1- Loại thiết kế để lắp vào cửa sổ, tường, trần hoặc sàn, kiểu một khối (lắp liền trong cùng một vỏ, một cục) hoặc "hệ thống nhiều khối chức năng" (cục nóng, cục lạnh tách biệt):',
        MA_HS: '8415.1',
        children: [
          {
            value: '3.1.1- - Công suất làm mát không quá 26,38 kW',
            title: '3.1.1- - Công suất làm mát không quá 26,38 kW',
            MA_HS: '8415.10.10',
          },
          {
            value: '3.1.2- - Loại khác',
            title: '3.1.2- - Loại khác',
            MA_HS: '8415.10.90',
          },
        ],
      },
    ],
  },
  {
    value:
      '4. Thiết bị cơ khí (hoạt động bằng tay hoặc không) để phun bắn, phun rải hoặc phun áp lực các chất lỏng hoặc chất bột; bình dập lửa, đã hoặc chưa nạp; súng phun và các thiết bị tương tự; máy phun bắn hơi nước hoặc cát và các loại máy phun bắn tia tương tự.',
    title:
      '4. Thiết bị cơ khí (hoạt động bằng tay hoặc không) để phun bắn, phun rải hoặc phun áp lực các chất lỏng hoặc chất bột; bình dập lửa, đã hoặc chưa nạp; súng phun và các thiết bị tương tự; máy phun bắn hơi nước hoặc cát và các loại máy phun bắn tia tương tự.',
    MA_HS: '84.24',
    children: [
      {
        value: '4.1- Bình dập lửa, đã hoặc chưa nạp:',
        title: '4.1- Bình dập lửa, đã hoặc chưa nạp:',
        MA_HS: '8424.1',
        children: [
          {
            value: '4.1.1- - Loại sử dụng cho phương tiện bay',
            title: '4.1.1- - Loại sử dụng cho phương tiện bay',
            MA_HS: '8424.10.10',
          },
          {
            value: '4.1.2- - Loại khác',
            title: '4.1.2- - Loại khác',
            MA_HS: '8424.10.90',
          },
        ],
      },
    ],
  },
  {
    value:
      '5. Các hỗn hợp chứa các dẫn xuất đã halogen hoá của metan, etan hoặc propan chưa được chi tiết hoặc ghi ở nơi khác',
    title:
      '5. Các hỗn hợp chứa các dẫn xuất đã halogen hoá của metan, etan hoặc propan chưa được chi tiết hoặc ghi ở nơi khác',
    MA_HS: '38.27',
    children: [
      {
        value:
          '5.1- Chứa chlorofluorocarbon (CFC), có hoặc không chứa hydrochlorofluorocarbon (HCFC), perfluorocarbon (PFC) hoặc hydrofluorocarbon (HFC); chứa hydrobromofluorocarbon (HBFC); chứa carbon tetrachloride; chứa 1,1,1- trichloroethane (methyl chloroform)',
        title:
          '5.1- Chứa chlorofluorocarbon (CFC), có hoặc không chứa hydrochlorofluorocarbon (HCFC), perfluorocarbon (PFC) hoặc hydrofluorocarbon (HFC); chứa hydrobromofluorocarbon (HBFC); chứa carbon tetrachloride; chứa 1,1,1- trichloroethane (methyl chloroform)',
        MA_HS: '0',
        children: [
          {
            value:
              '5.1.1- - Chứa chlorofluorocarbon (CFC), chứa hoặc không chứa hydrochlorofluorocarbon (HCFC), perfluorocarbon (PFC) hoặc hydrofluorocarbon (HFC)',
            title:
              '5.1.1- - Chứa chlorofluorocarbon (CFC), chứa hoặc không chứa hydrochlorofluorocarbon (HCFC), perfluorocarbon (PFC) hoặc hydrofluorocarbon (HFC)',
            MA_HS: '3827.11',
            children: [
              {
                value:
                  '5.1.1.1- - - Dầu dùng cho máy biến điện (máy biến áp và máy biến dòng) và bộ phận ngắt mạch, có hàm lượng nhỏ hơn 70% tính theo trọng lượng là dầu có nguồn gốc từ dầu mỏ hoặc các loại dầu thu được từ các khoáng bi-tum',
                title:
                  '5.1.1.1- - - Dầu dùng cho máy biến điện (máy biến áp và máy biến dòng) và bộ phận ngắt mạch, có hàm lượng nhỏ hơn 70% tính theo trọng lượng là dầu có nguồn gốc từ dầu mỏ hoặc các loại dầu thu được từ các khoáng bi-tum',
                MA_HS: '3827.11.10',
              },
            ],
          },
        ],
      },
      {
        value:
          '5.3- Chứa hydrochlorofluorocarbon (HCFC), chứa hoặc không chứa perfluorocarbon (PFC) hoặc hydrofluorocarbon (HFC), nhưng không chứa chlorofluorocarbon (CFC):',
        title:
          '5.3- Chứa hydrochlorofluorocarbon (HCFC), chứa hoặc không chứa perfluorocarbon (PFC) hoặc hydrofluorocarbon (HFC), nhưng không chứa chlorofluorocarbon (CFC):',
        MA_HS: '0',
        children: [
          {
            value: '5.3.1- - Chứa các chất thuộc phân nhóm 2903.41 đến 2903.48',
            title: '5.3.1- - Chứa các chất thuộc phân nhóm 2903.41 đến 2903.48',
            MA_HS: '3827.31.00',
          },
          {
            value:
              '5.3.2- - Loại khác, có chứa các chất thuộc các phân nhóm từ 2903.71 đến 2903.75',
            title:
              '5.3.2- - Loại khác, có chứa các chất thuộc các phân nhóm từ 2903.71 đến 2903.75',
            MA_HS: '3827.32.00',
          },
          {
            value: '5.3.3- - Loại khác',
            title: '5.3.3- - Loại khác',
            MA_HS: '3827.39',
            children: [
              {
                value:
                  '5.3.3.1- - - Dầu dùng cho máy biến điện (máy biến áp và máy biến dòng) và bộ phận ngắt mạch, có hàm lượng nhỏ hơn 70% tính theo trọng lượng là dầu có nguồn gốc từ dầu mỏ hoặc các loại dầu thu được từ các khoáng bi-tum',
                title:
                  '5.3.3.1- - - Dầu dùng cho máy biến điện (máy biến áp và máy biến dòng) và bộ phận ngắt mạch, có hàm lượng nhỏ hơn 70% tính theo trọng lượng là dầu có nguồn gốc từ dầu mỏ hoặc các loại dầu thu được từ các khoáng bi-tum',
                MA_HS: '3827.39.10',
              },
              {
                value: '5.3.3.2- - - Loại khác',
                title: '5.3.3.2- - - Loại khác',
                MA_HS: '3827.39.90',
              },
            ],
          },
        ],
      },
      {
        value:
          '5.4- Chứa metyl bromide (bromomethane) hoặc bromochloromethane',
        title:
          '5.4- Chứa metyl bromide (bromomethane) hoặc bromochloromethane',
        MA_HS: '3827.40.00',
      },
      {
        value:
          '5.5- Chứa trifluoromethane (HFC-23) hoặc perfluorocarbon (PFC) nhưng không chứa chlorofluorocarbon (CFC) hoặc hydrochlorofluorocarbon (HCFC)',
        title:
          '5.5- Chứa trifluoromethane (HFC-23) hoặc perfluorocarbon (PFC) nhưng không chứa chlorofluorocarbon (CFC) hoặc hydrochlorofluorocarbon (HCFC)',
        MA_HS: '0',
        children: [
          {
            value: '5.5.1- - Chứa trifluoromethane (HFC-23)',
            title: '5.5.1- - Chứa trifluoromethane (HFC-23)',
            MA_HS: '3827.51.00',
          },
          {
            value: '5.5.2- - Loại khác',
            title: '5.5.2- - Loại khác',
            MA_HS: '3827.59.00',
          },
        ],
      },
      {
        value:
          '5.6- Chứa các hydrofluorocarbon (HFC) khác nhưng không chứa chlorofluorocarbon (CFC) hoặc hydrochlorofluorocarbon (HCFC):',
        title:
          '5.6- Chứa các hydrofluorocarbon (HFC) khác nhưng không chứa chlorofluorocarbon (CFC) hoặc hydrochlorofluorocarbon (HCFC):',
        MA_HS: '0',
        children: [
          {
            value:
              '5.6.1- - Chứa từ 15 % trở lên tính theo khối lượng là 1,1,1-trifluoroethane (HFC-143a)',
            title:
              '5.6.1- - Chứa từ 15 % trở lên tính theo khối lượng là 1,1,1-trifluoroethane (HFC-143a)',
            MA_HS: '3827.61.00',
            children: [
              {
                value:
                  '5.6.1.1- - - Chứa hỗn hợp của HFC-125, HFC-143 và HFC-134a (HFC-404a)',
                title:
                  '5.6.1.1- - - Chứa hỗn hợp của HFC-125, HFC-143 và HFC-134a (HFC-404a)',
                MA_HS: '3827.61.10',
              },
              {
                value:
                  '5.6.1.2- - - Chứa hỗn hợp của HFC-125 và HFC-143a (HFC-507a)',
                title:
                  '5.6.1.2- - - Chứa hỗn hợp của HFC-125 và HFC-143a (HFC-507a)',
                MA_HS: '3827.61.20',
              },
              {
                value: '5.6.1.3- - - Loại khác',
                title: '5.6.1.3- - - Loại khác',
                MA_HS: '3827.61.90',
              },
            ],
          },
          {
            value:
              '5.6.2- - Loại khác, chưa được chi tiết tại các phân nhóm trên, chứa từ 55% trở lên tính theo khối lượng là pentafluoroetan (HFC- 125) nhưng không chứa dẫn xuất flo hóa chưa no của các hydrocacbon (HFO) mạch vòng',
            title:
              '5.6.2- - Loại khác, chưa được chi tiết tại các phân nhóm trên, chứa từ 55% trở lên tính theo khối lượng là pentafluoroetan (HFC- 125) nhưng không chứa dẫn xuất flo hóa chưa no của các hydrocacbon (HFO) mạch vòng',
            MA_HS: '3827.62.00',
          },
          {
            value:
              '5.6.3- - Loại khác, chưa được chi tiết tại phân nhóm trên, chứa từ 40% trở lên tính theo khối lượng là pentafluoroethane (HFC-125)',
            title:
              '5.6.3- - Loại khác, chưa được chi tiết tại phân nhóm trên, chứa từ 40% trở lên tính theo khối lượng là pentafluoroethane (HFC-125)',
            MA_HS: '3827.63.00',
            children: [
              {
                value:
                  '5.6.3.1- - - Chứa hỗn hợp của HFC-32 và HFC-125 (HFC-410A)',
                title:
                  '5.6.3.1- - - Chứa hỗn hợp của HFC-32 và HFC-125 (HFC-410A)',
                MA_HS: '3827.63.10',
              },
              {
                value: '5.6.3.2- - - Loại khác',
                title: '5.6.3.2- - - Loại khác',
                MA_HS: '3827.63.90',
              },
            ],
          },
          {
            value:
              '5.6.4- - Loại khác, chưa được chi tiết tại các phân nhóm trên, chứa từ 30% trở lên tính heo khối lượng là 1,1,1,2-tetrafluoroetan (HFC-134a) nhưng không chứa dẫn xuất flo hóa chưa no của các hydrocacbon (HFO) mạch vòng',
            title:
              '5.6.4- - Loại khác, chưa được chi tiết tại các phân nhóm trên, chứa từ 30% trở lên tính heo khối lượng là 1,1,1,2-tetrafluoroetan (HFC-134a) nhưng không chứa dẫn xuất flo hóa chưa no của các hydrocacbon (HFO) mạch vòng',
            MA_HS: '3827.64.00',
          },
          {
            value:
              '5.6.5- - Loại khác, chưa được chi tiết tại các phân nhóm trên, chứa từ 20% trở lên tính theo khối lượng là difluorometan (HFC-32) và 20% trở lên tính theo khối lượng là pentafluoroetan (HFC- 125)',
            title:
              '5.6.5- - Loại khác, chưa được chi tiết tại các phân nhóm trên, chứa từ 20% trở lên tính theo khối lượng là difluorometan (HFC-32) và 20% trở lên tính theo khối lượng là pentafluoroetan (HFC- 125)',
            MA_HS: '3827.65.00',
          },
          {
            value:
              '5.6.6- - Loại khác, chưa được chi tiết tại các phân nhóm trên, chứa các chất thuộc phân nhóm 2903.41 đến 2903.48',
            title:
              '5.6.6- - Loại khác, chưa được chi tiết tại các phân nhóm trên, chứa các chất thuộc phân nhóm 2903.41 đến 2903.48',
            MA_HS: '3827.68.00',
          },
          {
            value: '5.6.7- - Loại khác',
            title: '5.6.7- - Loại khác',
            MA_HS: '3827.69.00',
          },
        ],
      },
      {
        value: '5.7- Loại khác',
        title: '5.7- Loại khác',
        MA_HS: '3827.90.00',
      },
    ],
  },
  {
    value:
      '2. Tủ lạnh, tủ kết đông và thiết bị làm lạnh hoặc kết đông khác, loại dùng điện hoặc loại khác; bơm nhiệt trừ máy điều hòa không khí thuộc nhóm 84.15.',
    title:
      '2. Tủ lạnh, tủ kết đông và thiết bị làm lạnh hoặc kết đông khác, loại dùng điện hoặc loại khác; bơm nhiệt trừ máy điều hòa không khí thuộc nhóm 84.15.',
    MA_HS: '84.18',
    children: [
      {
        value: '2.1- Tủ kết đông, loại cửa trên, dung tích không quá 800 lít:',
        title: '2.1- Tủ kết đông, loại cửa trên, dung tích không quá 800 lít:',
        MA_HS: '8418.3',
        children: [
          {
            value: '2.1.1- - Dung tích không quá 200 lít',
            title: '2.1.1- - Dung tích không quá 200 lít',
            MA_HS: '8418.30.10',
          },
          {
            value: '2.1.2- - Loại khác',
            title: '2.1.2- - Loại khác',
            MA_HS: '8418.30.90',
          },
        ],
      },
      {
        value: '2.2- Tủ kết đông, loại cửa trước, dung tích không quá 900 lít:',
        title: '2.2- Tủ kết đông, loại cửa trước, dung tích không quá 900 lít:',
        MA_HS: '8418.4',
        children: [
          {
            value: '2.2.1- - Dung tích không quá 200 lít',
            title: '2.2.1- - Dung tích không quá 200 lít',
            MA_HS: '8418.40.10',
          },
          {
            value: '2.2.2- - Loại khác',
            title: '2.2.2- - Loại khác',
            MA_HS: '8418.40.90',
          },
        ],
      },
      {
        value:
          '2.3- Loại có kiểu dáng nội thất khác (tủ, tủ ngăn, quầy hàng, tủ bày hàng và loại tương tự) để bảo quản và trưng bày, có lắp thiết bị làm lạnh hoặc kết đông:',
        title:
          '2.3- Loại có kiểu dáng nội thất khác (tủ, tủ ngăn, quầy hàng, tủ bày hàng và loại tương tự) để bảo quản và trưng bày, có lắp thiết bị làm lạnh hoặc kết đông:',
        MA_HS: '8418.5',
        children: [
          {
            value:
              '2.3.1- - Quầy hàng, tủ bày hàng và các loại tương tự, có lắp thiết bị làm lạnh, dung tích trên 200 lít:',
            title:
              '2.3.1- - Quầy hàng, tủ bày hàng và các loại tương tự, có lắp thiết bị làm lạnh, dung tích trên 200 lít:',
            MA_HS: '0',
            children: [
              {
                value:
                  '2.3.1.1- - - Phù hợp dùng trong y tế, phẫu thuật hoặc phòng thí nghiệm',
                title:
                  '2.3.1.1- - - Phù hợp dùng trong y tế, phẫu thuật hoặc phòng thí nghiệm',
                MA_HS: '8418.50.11',
              },
              {
                value: '2.3.1.2- - - Loại khác',
                title: '2.3.1.2- - - Loại khác',
                MA_HS: '8418.50.19',
              },
            ],
          },
          {
            value: '2.3.2- - Loại khác:',
            title: '2.3.2- - Loại khác:',
            MA_HS: '0',
            children: [
              {
                value:
                  '2.3.2.1- - - Phù hợp dùng trong y tế, phẫu thuật hoặc phòng thí nghiệm',
                title:
                  '2.3.2.1- - - Phù hợp dùng trong y tế, phẫu thuật hoặc phòng thí nghiệm',
                MA_HS: '8418.50.91',
              },
              {
                value: '2.3.2.2- - - Loại khác',
                title: '2.3.2.2- - - Loại khác',
                MA_HS: '8418.50.99',
              },
            ],
          },
        ],
      },
      {
        value: '2.4- Thiết bị làm lạnh hoặc kết đông khác; bơm nhiệt:',
        title: '2.4- Thiết bị làm lạnh hoặc kết đông khác; bơm nhiệt:',
        MA_HS: '0',
        children: [
          {
            value: '2.4.1- - Loại khác',
            title: '2.4.1- - Loại khác',
            MA_HS: '8418.69',
            children: [
              {
                value: '2.4.1.1- - - Thiết bị làm lạnh đồ uống',
                title: '2.4.1.1- - - Thiết bị làm lạnh đồ uống',
                MA_HS: '8418.69.10',
              },
              {
                value:
                  '2.4.1.2- - - Thiết bị cấp nước lạnh (cold water dispenser)',
                title:
                  '2.4.1.2- - - Thiết bị cấp nước lạnh (cold water dispenser)',
                MA_HS: '8418.69.30',
              },
              {
                value:
                  '2.4.1.3- - - Thiết bị làm lạnh nước có công suất làm lạnh trên 21,10 kW:',
                title:
                  '2.4.1.3- - - Thiết bị làm lạnh nước có công suất làm lạnh trên 21,10 kW:',
                MA_HS: '0',
                children: [
                  {
                    value:
                      '2.4.1.3.1- - - - Dùng cho máy điều hoà không khí',
                    title:
                      '2.4.1.3.1- - - - Dùng cho máy điều hoà không khí',
                    MA_HS: '8418.69.41',
                  },
                  {
                    value: '2.4.1.3.2- - - - Loại khác',
                    title: '2.4.1.3.2- - - - Loại khác',
                    MA_HS: '8418.69.49',
                  },
                ],
              },
              {
                value: '2.4.1.4- - - Thiết bị sản xuất đá vảy',
                title: '2.4.1.4- - - Thiết bị sản xuất đá vảy',
                MA_HS: '8418.69.50',
              },
              {
                value: '2.4.1.5- - - Loại khác',
                title: '2.4.1.5- - - Loại khác',
                MA_HS: '8418.69.90',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: '6. Loại khác',
    title: '6. Loại khác',
    MA_HS: '0',
  },
];

export type DataTypeColumnTable2 = {
  key: string;
  name: string,
  stt?: number
  refKey: string,
  isGroupTitle?: boolean,
  maHs?: any,
  productivity?: any,
  import_export?: any,
  chat_name?: any,
  number_of_chat?: any,
  note?: string,
};

export const getRecentYear = (): string[] => {
  return [new Date().getFullYear().toString()];
};

export const YEAR_COLUMNS_2 = getRecentYear();

export const INIT_COLUMNS_TABLE2: DataTypeColumnTable2[] = [
  {
    name: 'table_1.2_content_1',
    refKey: 'group_0',
    stt: 0,
    isGroupTitle: true,
    key: randomString(10),
  },
  {
    key: randomString(10),
    name: '',
    refKey: 'group_0',
    maHs: null,
    productivity: null,
    import_export: null,
    chat_name: null,
    number_of_chat: null,
    note: '',
  },
  {
    name: 'table_1.2_content_2',
    refKey: 'group_1',
    stt: 1,
    key: randomString(10),
    isGroupTitle: true,
  },
  {
    key: randomString(10),
    name: '',
    refKey: 'group_1',
    maHs: null,
    productivity: null,
    import_export: null,
    chat_name: null,
    number_of_chat: null,
    note: '',
  },
];

export const COLUMNS_DATA_INDEX = {
  stt: 'stt',
  name: 'name',
  maHs: 'maHs',
  productivity: 'productivity',
  import_export: 'import_export',
  chat_name: 'chat_name',
  number_of_chat: 'number_of_chat',
  note: 'note',
};

export const findByValue = (value: any) => {
  let result: any = {};

  const findInList = (list: any) => {
    for (let i = 0; i < list.length; i += 1) {
      const { value: _value, children } = list[i];

      if (_value === value) {
        result = list[i];
      }

      if (!_.isEmpty(result)) {
        break;
      }

      if (_.isArray(children)) {
        findInList(children);
      }
    }
  };

  findInList(OPTIONS_SAN_PHAM);

  return result;
};
