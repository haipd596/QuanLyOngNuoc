import { Form } from "antd";
import styled from "styled-components";

export const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0px;
  }

  .ant-form-item-label {
    padding-bottom: 0;
    flex-shrink: 0;
    width: 180px;

    > label {
      font-weight: 500;
      color: #374151;
      height: auto;
      display: flex;
      text-align: left;
      word-wrap: break-word;
      word-break: break-word;
      white-space: normal;
      line-height: 1.5;
      margin-right: 16px;
    }
  }

  .ant-select.ant-select-in-form-item,
  .ant-input-number {
    max-width: 100%;
    width: 100%;
  }

  .ant-form-item-control {
    flex: 1;
  }

  .ant-input,
  .ant-select-selector,
  .ant-input-textarea textarea {
    border-radius: 4px;
    width: 100%;
  }

  .ant-input:focus,
  .ant-select-selector:focus,
  .ant-input-textarea textarea:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;
