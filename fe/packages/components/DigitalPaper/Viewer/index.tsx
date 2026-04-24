import { TModeView } from '@packages/@types';
import IconWrapper from '@packages/components/IconWrapper';
import Signature from '@packages/components/View/FileButtonGroup/Signature';
import { Schema } from '@packages/main/Forms';
import { Button, Tooltip } from 'antd';
import clsx from 'clsx';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import React, { useMemo, useState } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveFields } from '~/redux/slices';
import { DIGITALPAPER_TOOLTIP, PATH_TO_MAIN_GIAY_TOID } from '../constant';
import ModalDigitalPaper from './ModalDigitalPaper';

export type TDigitalPaperViewerProps = {
  subForm: Schema,
  modeView: TModeView,
  onSubmit: (values: any) => void,
  onValuesChange: (values: any) => void,
  value: any,
  urlDownload: string,
  isShowButtonTraCuu?: boolean,
  indexFile?:number,
  targetFieldKey?: string;
};

const DigitalPaperViewer = ({
  urlDownload, subForm, isShowButtonTraCuu, indexFile,targetFieldKey, ...rest
}: TDigitalPaperViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const file = _get(rest, 'value.file.fileNodeObject', []);
  const giayToId = _get(rest, `value.${PATH_TO_MAIN_GIAY_TOID}`, '');

  const fieldsInColumnIndex = _get(subForm, 'fieldsInColumnIndex', []);

  const activeFields = useAppSelector(selectActiveFields);

  const handleDeleteFile = () => {
    rest.onSubmit(null);
  };

  const handleSuccess = (signedFile: any) => {
    rest.onSubmit({
      formData: _get(rest, 'value.file.formData', {}),
      fileNodeObject: [signedFile],
    });
  };

  const fields = useMemo(() => {
    return fieldsInColumnIndex.map(({ fieldKeyCol, columnIndex }) => {
      const _result = activeFields.find(({ key }) => key === fieldKeyCol);
      if (_result) {
        return ({
          ..._result,
          columnIndex,
          isShowField: true,
        });
      }
      return null;
    }).filter((item) => !_isEmpty(item)) as any;
  }, [fieldsInColumnIndex, activeFields]);

  return (
    <div className="button-group">
      <Tooltip title={DIGITALPAPER_TOOLTIP.TO_KHAI}>
        <Button
          icon={(
            <IconWrapper icon={<i className={clsx('fa-solid fa-pen fa-lg', 'icon_global_dvc')} />} />
          )}
          onClick={() => setIsOpen(true)}
        />
      </Tooltip>
      <a href={urlDownload || '#'} aria-label="dowload">
        <Tooltip title={DIGITALPAPER_TOOLTIP.URL_TAI_MAU}>
          <Button icon={(
            <IconWrapper icon={<i className={clsx('fa-solid fa-download fa-lg', 'icon_global_dvc')} />} />
        )}
          />
        </Tooltip>
      </a>
      {!_isEmpty(file) ? (
        <Signature onDelete={handleDeleteFile} file={file[0]} targetFieldKey={targetFieldKey} indexFile={indexFile} onSigned={handleSuccess} />
      ) : null}
      <ModalDigitalPaper
        {...rest}
        giayToId={giayToId}
        subForm={{ fields }}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isShowButtonTraCuu={isShowButtonTraCuu}
      />
    </div>
  );
};

export default DigitalPaperViewer;
