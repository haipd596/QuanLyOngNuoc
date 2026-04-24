import { Schema } from '@packages/main/Forms';
import { message } from 'antd';

export const callbackSaveJson = (schema: any) => {
  try {
    console.log("BBBB::", schema)
    // eslint-disable-next-line no-eval
    eval(`callBackSaveJson(${JSON.stringify(Schema.output(schema))})`);
  } catch (error: any) {
    message.error(error?.message || 'Đã có lỗi xảy ra');
    throw new Error(error);
  }
};
