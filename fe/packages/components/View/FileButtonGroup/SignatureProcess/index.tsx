/* eslint-disable no-eval */
import Loading from '@packages/components/Loading';
import { defineComponent } from '@packages/utils/common';
import { message, Modal } from 'antd';
import _get from 'lodash/get';
import { useState } from 'react';
import GetCert from './GetCert';
import Sign from './Sign';

const STEPS_NAME = {
  GET_CERT: 'GET_CERT',
  SIGN: 'SIGN',
};

const CALLBACK_STEPS = {
  [STEPS_NAME.GET_CERT]: {
    action: 'GET_CERT',
    callbackFunction: 'callbackGetCertificate',
    component: GetCert,
  },
  [STEPS_NAME.SIGN]: {
    action: 'SIGN',
    callbackFunction: 'callbackSignDocument',
    component: Sign,
  },
};

type TSignatureProcessProps = {
  open: boolean,
  setIsOpen: (value: boolean) => void
  file: any
  onSuccess: (signedFile: any) => void
};

const SignatureProcess = ({
  open, setIsOpen, file, onSuccess,
}: TSignatureProcessProps) => {
  const [step, setStep] = useState(STEPS_NAME.GET_CERT);
  const [componentProps, setComponentProps] = useState({});
  const [resultsGetCertResult, setResultsGetCertResult] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFinish = async (values: any) => {
    try {
      setIsLoading(true);
      if (step === STEPS_NAME.GET_CERT) {
        const results = await eval(`${CALLBACK_STEPS[step].callbackFunction}({ 
          attachmentId: '${file.NodeId}',
          strCAName: '${values.provider}',
          strUserId: '${values.userId}',
        })`);
        setStep(STEPS_NAME.SIGN);
        setComponentProps(results);
        setResultsGetCertResult(values);
        setIsLoading(false);
        return;
      }

      if (step === STEPS_NAME.SIGN) {
        const results = await eval(`${CALLBACK_STEPS[step].callbackFunction}({ 
          serial_number: '${values.serialNumber}',
          strCAName: '${resultsGetCertResult.provider}',
          strUserId: '${resultsGetCertResult.userId}',
        })`);
        const jsonData = JSON.parse(results);
        const attachmentId = _get(jsonData, 'Data.attachmentId', null);
        const filename = _get(jsonData, 'Data.filename', null);
        setIsLoading(false);

        if (!filename && !attachmentId) {
          throw new Error(`file name and attachmentId not exist ${results}`);
        }

        onSuccess({
          ...file,
          NodeId: attachmentId,
          FileName: filename,
        });
        handleClose();
      }
    } catch (error) {
      message.error('Đã có lỗi xảy ra khi ký số');
      console.error('SignatureProcess', error);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      style={{ minHeight: 400 }}
      footer={null}
      className="signature-process"
      width="50vw"
    >
      <Loading isLoading={isLoading}>
        {defineComponent(
          CALLBACK_STEPS[step].component as any,
          { onFinish: handleFinish, onClose: handleClose, ...componentProps },
        )}
      </Loading>
    </Modal>
  );
};

export default SignatureProcess;
