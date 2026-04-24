import clsx from 'clsx';
import React from 'react';
import './styles.scss';
import { Button } from 'antd';
import { isEditMode, isViewMode } from '@packages/utils/viewMode';
import { MODE_VIEW } from '@packages/constants/modeView';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { selectModeView, setModeView } from '~/redux/slices/FormSlice';

function SwitchMode() {
  const modeView = useAppSelector(selectModeView);
  const dispatch = useAppDispatch();

  const changeToView = () => dispatch(setModeView(MODE_VIEW.VIEW));

  const changeToEdit = () => dispatch(setModeView(MODE_VIEW.EDIT));

  return (
    <div className="switch-mode-wrapper">
      <div className="switch-mode-inner">
        <Button className={clsx({ active: isViewMode(modeView) }, 'switch-item')} onClick={changeToView}>
          View
        </Button>
        <Button className={clsx({ active: isEditMode(modeView) }, 'switch-item')} onClick={changeToEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
}

export default SwitchMode;
