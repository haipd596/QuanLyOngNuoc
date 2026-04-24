import {
  useEffect, useState,
} from 'react';

import { THANH_PHAN_HSQD_KEY } from '@packages/constants/jsonConfig';
import { MODE_VIEW } from '@packages/constants/modeView';
import { apiGetSchemaByTthcId } from '@packages/dvc-service';
import { apiGetFormDataByHsId } from '@packages/dvc-service/apiGetFormDataByHsId';
import { Schema } from '@packages/main/Forms';
import _ from 'lodash';
import { DEMO_VIEWER } from '~/pages/ViewPage/demo';
import { useAppDispatch } from '~/redux/hooks';
import { setSchema } from '~/redux/slices';
import ModalDigitalPaper from '../DigitalPaper/Viewer/ModalDigitalPaper';
import './styles.scss';

function FormViewToKhaiDienTuCallback() {
  const [isOpen, setIsOpen] = useState(false);
  const [schemaFromObservable, setSchemaFromObservable] = useState(DEMO_VIEWER);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFormData, setIsLoadingFormData] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    try {
      const handler = ({ tthcId }: any) => {
        setIsOpen(true);
        setIsLoading(true);
        apiGetSchemaByTthcId(tthcId)
          .then((_schema: any) => {
            try {
              const activeSchema = Schema.reconcile(_schema as any);
              // hidden all fields, prevent show in route viewer
              const activeSchemaHiddenAllFields = {
                ...activeSchema,
                fields: activeSchema.fields.map((field) => ({ ...field, isShowField: false })),
              };
              dispatch(setSchema(activeSchemaHiddenAllFields));

              // get subForm
              const subForm = _.get(
                _.find(
                  activeSchemaHiddenAllFields.fields,
                  ({ key }) => key === THANH_PHAN_HSQD_KEY,
                ),
                'subForm',
              ) as any;
              const mainSubForm = _.cloneDeep(_.get(Object.values(subForm), 0, {})) as any;

              // get field in subForm
              mainSubForm.fields = mainSubForm
                .fieldsInColumnIndex.map(({ fieldKeyCol, columnIndex }: any) => {
                  const _result = _schema.fields.find(({ key }: any) => key === fieldKeyCol);
                  if (_result) {
                    return ({
                      ..._result,
                      columnIndex,
                      isShowField: true,
                    });
                  }
                  return null;
                }).filter((item: any) => !_.isEmpty(item)) as any;
              setSchemaFromObservable(mainSubForm);
            } catch (error) {
              console.error('parse to khai dien tu loi', error);
            }
            setIsLoading(false);
          }).catch((error) => {
            console.error('apiGetSchemaByTthcId dvc callback error', error);
          });
      };

      // @ts-expect-error: should work
      observableSchemaToKhaiDienTu.subscribe(handler);

      return () => {
        // @ts-expect-error: should work
        observableSchemaToKhaiDienTu.unsubscribe(handler);
      };
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    setIsLoadingFormData(true);
    apiGetFormDataByHsId().then((data: any) => {
      if (data) {
        const listGiayTo = _.get(data, 'ThanhPhanHoSoQD', []);
        const fileData = listGiayTo.find(({ BatBuoc }: any) => BatBuoc === 1);
        setFormData(fileData);
      }
    }).finally(() => {
      setIsLoadingFormData(false);
    });
  }, []);

  if (isLoading || isLoadingFormData) return null;

  return isOpen && (
    <ModalDigitalPaper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      subForm={schemaFromObservable as any}
      modeView={MODE_VIEW.DETAILS}
      loading={isLoading}
      value={formData}
    />
  );
}

export default FormViewToKhaiDienTuCallback;
