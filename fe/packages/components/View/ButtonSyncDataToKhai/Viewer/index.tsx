import { SyncOutlined } from '@ant-design/icons';
import { apiGetFormDataByHsId } from '@packages/dvc-service/apiGetFormDataByHsId';
import {
  Button, Flex,
  message,
} from 'antd';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import _ from 'lodash';
import _get from 'lodash/get';
import { useEffect, useState } from 'react';
// import { recursiveGetData } from '../../ViewSelect/recursiveGetData';
import { SPECIFIC_HIDDEN_KEYS } from '@packages/utils/common';
import { useAppSelector } from '~/redux/hooks';
import { selectIsDuThao } from '~/redux/slices';
import {
  cleanObjectDeep,
  dynamicMerge,
  recursiveGetData,
  reverseTransformData,
} from '../../ViewSelect/recursiveGetData';
import './styles.scss';
import { reverseFieldMap, SPECIFIC_HIDDEN_KEYS_ADDRESS, SPECIFIC_HIDDEN_KEYS_NORMAL } from './transform.helper';

const ButtonSyncDataToKhaiViewer:React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useFormInstance();
  const [hsId, setHsId] = useState(null);

  const isDuThao = useAppSelector(selectIsDuThao);

  useEffect(() => {
    const handler = async ({ hsId: _hsId }: any) => {
      setHsId(_hsId);
    };

    // @ts-expect-error: should work
    observableSchemaDuThao.subscribe(handler);

    return () => {
      // @ts-expect-error: should work
      observableSchemaDuThao.unsubscribe(handler);
    };
  });

  const handleSync = async () => {
    if (!hsId) return;

    try {
      setIsLoading(true);
      const data = await apiGetFormDataByHsId(hsId);

      const formToKhai = _.find(data.ThanhPhanHoSoQD, { BatBuoc: 1 })?.file?.formData;

      if (formToKhai) {
        const currentFormValues = form.getFieldsValue();
        const formValuePairCurrent = Object.keys(currentFormValues).reduce((acc, cur) => {
          const foundValueCurrent = recursiveGetData(currentFormValues, cur);
          if (foundValueCurrent != null && acc !== undefined) {
            acc[cur] = cleanObjectDeep(
              foundValueCurrent,
              SPECIFIC_HIDDEN_KEYS_ADDRESS,
              SPECIFIC_HIDDEN_KEYS_NORMAL,
            );
          }

          return acc;
        }, {} as any);

        const formValuePair = Object.keys(formToKhai).reduce((acc, cur) => {
          if (!SPECIFIC_HIDDEN_KEYS.includes(cur)) {
            const foundValue = recursiveGetData(formToKhai, cur);
            if (foundValue !== null && foundValue !== undefined) {
              if (reverseFieldMap[cur]) {
                const reverseType = reverseFieldMap[cur];
                const result = reverseTransformData(reverseType, {
                  [cur]: foundValue,
                  ...formToKhai,
                });
                acc[cur] = result[cur];
              } else {
                acc[cur] = foundValue;
              }
            }
          }

          return acc;
        }, {} as any);

        const mergedValues = dynamicMerge(formValuePairCurrent, formValuePair);

        // Cập nhật form với giá trị đã merge
        form.resetFields();
        form.setFieldsValue(mergedValues);
      } else{ // Xử lý cho trường hợp lấy thông tin người nộp từ tờ khai mà không có giấy tờ bắt buộc
        const targetDataBuffers = form.getFieldsValue()
        const targetViewInfo = _get(targetDataBuffers,"ThongTinChung", {})
        form.setFieldValue("ThongTinChung_BoSung", [targetViewInfo])
      }

      message.success("Đồng bộ dữ liệu từ tờ khai thành công!")
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonWidth = 200;

  return (
    <Flex justify="end">
      {
        isDuThao
          ? (
            <Button
              icon={<SyncOutlined />}
              type="primary"
              className="button-sync-data"
              loading={isLoading}
              onClick={handleSync}
              style={{ width: buttonWidth }}
            >
              {isLoading ? 'Đang lấy dữ liệu từ tờ khai' : 'Lấy dữ liệu từ tờ khai'}
            </Button>

          )
          : ''
      }
    </Flex>
  );
};

export default ButtonSyncDataToKhaiViewer;
