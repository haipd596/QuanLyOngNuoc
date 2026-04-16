// import {
//   CloseOutlined,
//   ReloadOutlined,
//   SearchOutlined,
// } from "@ant-design/icons";
// import { Button, Popover } from "antd";
// import React, { useState } from "react";
// import useI18n from "~/shared/hooks/useI18n";

// interface FilterPopoverProps {
//   children: React.ReactNode;
//   open?: boolean;
//   onOpenChange?: (open: boolean) => void;
//   content: React.ReactNode;
//   onSearch?: () => void;
//   onReset?: () => void;
//   placement?:
//     | "top"
//     | "left"
//     | "right"
//     | "bottom"
//     | "topLeft"
//     | "topRight"
//     | "bottomLeft"
//     | "bottomRight";
//   trigger?: "hover" | "focus" | "click";
//   compact?: boolean;
// }

// export const FilterPopover: React.FC<FilterPopoverProps> = ({
//   children,
//   open,
//   onOpenChange,
//   content,
//   onSearch,
//   onReset,
//   placement = "bottomRight",
//   trigger = "click",
//   compact = false,
// }) => {
//   const { t } = useI18n();
//   const [internalOpen, setInternalOpen] = useState(false);

//   const isControlled = open !== undefined;
//   const popoverOpen = isControlled ? open : internalOpen;

//   const handleOpenChange = (newOpen: boolean) => {
//     if (!isControlled) setInternalOpen(newOpen);
//     onOpenChange?.(newOpen);
//   };

//   const handleClose = () => handleOpenChange(false);

//   const handleSearch = () => {
//     onSearch?.();
//     handleClose();
//   };

//   const handleReset = () => {
//     onReset?.();
//   };

//   const contentPadding = compact ? 8 : 14;
//   const footerPadding = compact ? 8 : 12;

//   const popoverContent = (
//     <div className={compact ? "filter-popover filter-popover--compact" : "filter-popover"}>
//       {/* Content */}
//       <div style={{ padding: contentPadding }}>{content}</div>

//       {/* Footer */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "flex-end",
//           gap: 8,
//           padding: footerPadding,
//           borderTop: "1px solid #f0f0f0",
//         }}
//       >
//         <Button
//           size={compact ? "small" : undefined}
//           icon={<ReloadOutlined />}
//           onClick={handleReset}
//         >
//           {t("filter.reset")}
//         </Button>

//         <Button
//           size={compact ? "small" : undefined}
//           icon={<CloseOutlined />}
//           onClick={handleClose}
//         >
//           {t("filter.close")}
//         </Button>

//         <Button
//           size={compact ? "small" : undefined}
//           type="primary"
//           style={{
//             backgroundColor: "var(--primary)",
//             height: compact ? 30 : undefined,
//           }}
//           icon={<SearchOutlined />}
//           onClick={handleSearch}
//         >
//           {t("filter.search")}
//         </Button>
//       </div>
//     </div>
//   );

//   return (
//     <Popover
//       content={popoverContent}
//       trigger={trigger}
//       open={popoverOpen}
//       onOpenChange={handleOpenChange}
//       placement={placement}
//     >
//       {children}
//     </Popover>
//   );
// };