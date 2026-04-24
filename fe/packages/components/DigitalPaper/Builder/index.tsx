import { TModeView } from '@packages/@types';
import { JsonSchema } from '@packages/main/Forms';
import {
  Button,
} from 'antd';
import _ from 'lodash';
import { useMemo } from 'react';
import { useAppDispatch } from '~/redux/hooks';
import {
  setModalDigitalBuilderProps,
  toggleOpenModalDigitalBuilder,
} from '~/redux/slices';
import { PATH_TO_MAIN_GIAY_TOID } from '../constant';
import CheckRequireForm from './CheckRequireForm';

type TDigitalPaperBuilderProps = {
  subForm: JsonSchema,
  modeView: TModeView,
  onSave: (values: any) => void
};

const DigitalPaperBuilder = (props: TDigitalPaperBuilderProps) => {
  const dispatch = useAppDispatch();

  const handleConfig = () => {
    dispatch(toggleOpenModalDigitalBuilder());
    dispatch(setModalDigitalBuilderProps(props));
  };

  const giayToId = _.get(props, `value.${PATH_TO_MAIN_GIAY_TOID}`, []);

  const options = useMemo(() => {
    return _.get(props, `requiredForm.${giayToId}`, []);
  }, [props]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Button style={{ pointerEvents: 'all' }} onClick={handleConfig}>Config</Button>
      <div style={{ pointerEvents: 'all' }}>
        <CheckRequireForm currentRequired={options} giayToId={giayToId} />
      </div>
    </div>
  );
};

export default DigitalPaperBuilder;
