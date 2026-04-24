import { TViewInfo } from "@packages/components/View/ViewInfo/type";
import { FIELD_NAME } from "@packages/constants/fields";
import { AnyObject } from "antd/es/_util/type";
import { Field } from "../fieldModel";

export const createViewContentProject = (extraFieldConfig: AnyObject = {}) =>
  new Field<Partial<TViewInfo>>({
    fieldName: FIELD_NAME.CONTENT_PROJECT,
    key: "",
    version: 0,
    componentPropsAllowConfig: {},
    ...extraFieldConfig,
  });
