import { TModeView } from '@packages/@types';
import { MODE_VIEW } from '@packages/constants/modeView';

export const isViewMode = (modeView: TModeView) => modeView === MODE_VIEW.VIEW;
export const isEditMode = (modeView: TModeView) => modeView === MODE_VIEW.EDIT;
export const isDetailsMode = (modeView: TModeView) => modeView === MODE_VIEW.DETAILS;
export const isViewOrDetailMode = (modeView: TModeView) => (
  modeView === MODE_VIEW.DETAILS || modeView === MODE_VIEW.VIEW
);
