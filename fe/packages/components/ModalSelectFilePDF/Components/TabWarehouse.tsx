import { Input, Tabs, TabsProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import _debounce from 'lodash/debounce';
import { useState } from 'react';
import { DocumentEnum } from '../enum';
import ListDataWareHouse from './ListDataWarehouse';
import ListDocumentMyData from './ListDocumentMyData';

type TabWarehouseType = {
  onDownloadFile: (values: AnyObject) => void;
};

const TabWarehouse:React.FC<TabWarehouseType> = ({ onDownloadFile }) => {
  const [keySearch, setKeySearch] = useState<string>('');
  const [tabKey, setTabKey] = useState<DocumentEnum>(DocumentEnum.DOCUMENT_MY_DATA);

  const items: TabsProps['items'] = [
    {
      key: DocumentEnum.DOCUMENT_MY_DATA,
      label: 'Kho dữ liệu điện tử của tôi',
      children: (
        <ListDocumentMyData
          keySearch={keySearch}
          tabKey={tabKey}
          onDownloadFile={onDownloadFile}
        />
      ),
    },
    {
      key: DocumentEnum.DOCUMENT_NATIONAL_DATA,
      label: 'Kho dữ liệu quốc gia',
      children: (
        <ListDataWareHouse
          keySearch={keySearch}
          tabKey={tabKey}
          onDownloadFile={onDownloadFile}
        />
      ),
    },
  ];

  // Search file PDF delay 800s
  const handleSearchPDF = _debounce((e: any) => {
    setKeySearch(e.target.value);
  }, 800);

  return (
    <div>
      <Tabs
        onChange={(activeKey: any) => setTabKey(activeKey)}
        className="tab-select-warehouse"
        defaultActiveKey={DocumentEnum.DOCUMENT_MY_DATA}
        tabBarExtraContent={(
          <Input
            onChange={handleSearchPDF}
            className="input-search-pdf"
            placeholder="Tìm kiếm theo tên file"
          />
        )}
        moreIcon={false}
        items={items}
      />
    </div>
  );
};

export default TabWarehouse;
