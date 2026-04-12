import { Empty, notification } from 'antd';
import locale from 'antd/es/locale/vi_VN';
import type { ConfigProviderProps } from 'antd/lib/config-provider';

const antdDefaultConfig: ConfigProviderProps = {
  locale: locale,
  componentSize: 'large',
  form: { colon: false },
  space: { size: 12 },
  renderEmpty: () => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có dữ liệu" />,
  theme: {
    token: {
      fontSize: 16,
      fontSizeLG: 16,
      fontFamily: 'Roboto, sans-serif',
      colorPrimary: '#7a1f36',
      colorHighlight: '#7a1f36',
      colorBorder: '#bcbebe',
      colorText: '#202426',
      colorBgContainerDisabled: '#E7E7E7',
      borderRadius: 4,
    },
    components: {
      Input: {
        colorTextDisabled: '#636767',
        colorBgContainerDisabled: '#e7e7e7',
      },
      InputNumber: {
        colorTextDisabled: '#636767',
        colorBgContainerDisabled: '#e7e7e7',
      },
      Table: {
        rowExpandedBg: 'transparent',
        // headerColor: '#636767',
        headerColor: 'white',
        // headerBg: '#E7E7E7',
        headerBg: '#7a1f36',
        borderColor: '#bcbebe',
        rowHoverBg: '#e2f2fd',
      },
      Badge: {
        colorError: '#7a1f36',
      },
      Tooltip: {
        colorBgSpotlight: '#7a1f36',
      },
      Collapse: {
        headerBg: '#fff',
        contentBg: '#fff',
      },
      Tabs: {
        colorText: '#7a1f36',
        itemActiveColor: '#7a1f36',
        inkBarColor: '#7a1f36',
        itemColor: '#7a1f36',
        itemSelectedColor: '#7a1f36',
      },
    },
  },
};

notification.config({
  maxCount: 5,
  placement: 'topRight',
});

export default antdDefaultConfig;
