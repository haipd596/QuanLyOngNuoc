import { FormViewerCore } from './FormViewerCore';
import { withEmbedBuilder } from './withEmbedBuilder';
import { withStandalone } from './withStandalone';

export const FormViewerEmbedWithBuilder = withEmbedBuilder(FormViewerCore);
export const FormViewerStandalone = withStandalone(FormViewerCore);
