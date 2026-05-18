import { CloseOutlined } from "@ant-design/icons";
import type { ModalProps } from "antd";
import { Modal } from "antd";
import classNames from "classnames";
import type { ReactNode } from "react";
import {
  ModalBody,
  ModalHeader,
  ModalHeaderButton,
  ModalTitle,
  ModalTitleWrapper,
} from "./styled";

export interface IBaseModalProps extends ModalProps {
  icon?: ReactNode;
  headerHeight?: string;
  fullScreen?: boolean;
  showHeader?: boolean;
  loading?: boolean;
  hideModal?: () => void;
}

const BaseModal = ({
  title,
  children,
  icon,
  loading,
  fullScreen,
  closeIcon,
  headerHeight = "4.8rem",
  showHeader = true,
  ...props
}: IBaseModalProps) => {
  return (
    <Modal
      width="var(--modal-width-lg)"
      className={classNames({ fullScreen })}
      centered
      closable={false}
      maskClosable={false}
      style={{
        boxShadow: "0px 2px 0.8rem 3px rgba(0, 0, 0, 0.2)",
        borderRadius: "4px",
        padding: 0,
      }}
      styles={{
        body: {
          padding: 0,
          maxHeight: "var(--modal-max-height)",
          overflowY: "auto",
        },
        footer: {
          borderRadius: 4,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        },
      }}
      rootClassName="base-modal"
      okButtonProps={{
        size: "large",
        style: {
          width: "100%",
          marginInlineStart: 0,
          height: 40,
          borderRadius: 6,
          fontWeight: 600,
          boxShadow: "none",
          color: "#fff",
          backgroundColor: "var(--primary)",
          borderColor: "var(--primary)",
        },
      }}
      cancelButtonProps={{
        size: "large",
        style: {
          width: "100%",
          marginInlineStart: 0,
          height: 40,
          borderRadius: 6,
          fontWeight: 600,
          boxShadow: "none",
          backgroundColor: "#fff",
          color: "var(--primary)",
          borderColor: "var(--primary)",
        },
      }}
      confirmLoading={loading}
      cancelText="Hủy"
      {...props}
    >
      {showHeader && (
        <ModalHeader height={headerHeight}>
          <ModalTitleWrapper>
            {icon && icon}
            <ModalTitle>{title}</ModalTitle>
          </ModalTitleWrapper>

          {closeIcon ? (
            closeIcon
          ) : (
            <ModalHeaderButton
              onClick={props.hideModal ? props.hideModal : props.onCancel}
            >
              <CloseOutlined
                style={{ fontSize: "2rem", color: "#fff" }}
              />
            </ModalHeaderButton>
          )}
        </ModalHeader>
      )}

      <ModalBody className="modal-body">{children}</ModalBody>
    </Modal>
  );
};

export default BaseModal;
