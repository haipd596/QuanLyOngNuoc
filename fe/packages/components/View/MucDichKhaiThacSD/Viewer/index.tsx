import { apiGetMucDichKhaiThacSD } from '@packages/dvc-service/apiGetMucDichKhaiThacSD';
import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import _ from 'lodash';
import { useEffect, useState } from 'react';

const MucDichKhaiThacSDViewer:React.FC = (props: any) => {
  const [options, setOptions] = useState<DefaultOptionType[]>([]);

  useEffect(() => {
    apiGetMucDichKhaiThacSD().then((res) => {
      // use Ten for purpose export word
      setOptions(_.map(res, (item) => ({ label: item.Ten, value: item.Ten })));
    });
  }, []);

  return (
    <Select options={options} {...props} />
  );
};

export default MucDichKhaiThacSDViewer;
