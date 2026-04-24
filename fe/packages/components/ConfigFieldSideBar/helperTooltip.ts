import { FIELD_NAME } from "@packages/constants/fields";

type TooltipDescription =
  | string
  | {
      intro?: string;
      items?: string[];
    };
// #region TOOLTIP_BASE
const tooltipBaseHelper_Vi: Record<string, TooltipDescription> = {
  rules: {
    intro:
      "Đây là nơi cấu hình các điều kiện hoặc quy tắc áp dụng cho trường này.",
    items: [
      "Required – Bắt buộc: Nếu bật, người dùng phải nhập giá trị trước khi gửi.",
      "Whitespace – Khoảng trắng: Không cho phép giá trị chỉ chứa khoảng trắng.",
      "Pattern – Mẫu regex: Kiểm tra giá trị nhập vào phải khớp với mẫu biểu thức chính quy.",
      "Message – Thông báo lỗi: Nội dung sẽ hiển thị khi giá trị không hợp lệ.",
    ],
  },
  hidden: "Ẩn trường này khỏi giao diện người dùng.",
  serverPayloadKey: "Tên khoá được gửi lên server khi submit dữ liệu.",
  label: "Nhãn hiển thị cho người dùng.",
  initFieldData: "Dữ liệu khởi tạo mặc định của trường.",
  wrapperColumnNumber: {
    intro: "Xác định độ dài của thành phần sẽ chiếm trong bố cục.",
    items: [
      "Giá trị từ 1 đến 24.",
      "1 – Chiếm 1/24 chiều ngang.",
      "12 – Chiếm nửa chiều ngang.",
      "24 – Chiếm toàn bộ chiều ngang.",
      "Số càng lớn thì trường hiển thị càng rộng.",
    ],
  },
  placeholder: "Gợi ý nội dung cần nhập vào ô.",
  isShowInDetailModeView: "Hiển thị trường ở chế độ xem chi tiết.",
  isShowInModeView: "Hiển thị trường ở chế độ xem thông thường.",
  disabled: "Vô hiệu hóa trường, không cho người dùng chỉnh sửa.",
};

const tooltipBaseHelper_En: Record<string, TooltipDescription> = {
  rules: {
    intro:
      "This is where you configure the conditions or rules applied to this field.",
    items: [
      "Required – If enabled, the user must enter a value before submitting.",
      "Whitespace – Disallows values containing only whitespace.",
      "Pattern – Regex pattern: Ensures the entered value matches the specified regular expression.",
      "Message – The error message displayed when the value is invalid.",
    ],
  },
  hidden: "Hide this field from the user interface.",
  serverPayloadKey: "The key name sent to the server when submitting data.",
  label: "The label displayed to the user.",
  initFieldData: "The default initial data of the field.",
  wrapperColumnNumber: {
    intro: "Specifies the width of the component within the layout.",
    items: [
      "Value ranges from 1 to 24.",
      "1 – Occupies 1/24 of the width.",
      "12 – Occupies half of the width.",
      "24 – Occupies the full width.",
      "The larger the number, the wider the field will be displayed.",
    ],
  },
  placeholder: "A hint text suggesting the content to enter.",
  isShowInDetailModeView: "Display the field in detail view mode.",
  isShowInModeView: "Display the field in normal view mode.",
  disabled: "Disable the field, preventing the user from editing it.",
};
// #endregion test

// #region SELECT
const SELECT_VI: Record<string, TooltipDescription> = {
  allowClear:
    "Nếu bật, một biểu tượng xóa (×) sẽ hiển thị ở bên phải của component Select. Người dùng có thể nhấn vào đó để xóa lựa chọn hiện tại và đưa trường về trạng thái rỗng.",
  onSelect: "Dành cho nhà phát triển.",
  options: {
    intro: "Danh sách tùy chọn hiển thị trong Select.",
    items: [
      "Mỗi phần tử trong options là một object gồm value và label.",
      "Value – Giá trị được lưu khi người dùng chọn.",
      "Label – Nội dung hiển thị cho người dùng.",
    ],
  },
};

const SELECT_EN: Record<string, TooltipDescription> = {
  allowClear:
    "If enabled, a clear (×) icon will appear on the right side of the Select component. Users can click it to remove the current selection and reset the field to an empty state.",
  onSelect: "For developer.",
  options: {
    intro: "The list of options displayed in the Select dropdown.",
    items: [
      "Each option is an object containing value and label.",
      "Value – The data stored when selected.",
      "Label – The text displayed to the user.",
    ],
  },
};
// #endregion SELECT

// #region INPUT_NUMBER
const INPUT_NUMBER_VI: Record<string, TooltipDescription> = {
  max: "Giá trị số lớn nhất cho phép nhập vào ô này",
  min: "Giá trị số nhỏ nhất cho phép nhập vào ô này",
};

const INPUT_NUMBER_EN: Record<string, TooltipDescription> = {
  max: "The maximum numeric value allowed for this input",
  min: "The minimum numeric value allowed for this input",
};
// #endregion INPUT_NUMBER

// #region COLUMN_FIELD
const COLUMN_FIELD_VI: Record<string, TooltipDescription> = {
  isAutoLayout: {
    intro: "Chế độ bố cục tự động:",
    items: [
      "Nếu bật (true): Hệ thống sẽ tự động sắp xếp kích thước các cột dựa trên nội dung và không cho phép cấu hình thủ công trong `columns`.",
      "Nếu tắt (false): Bạn có thể cấu hình thủ công tỷ lệ các cột thông qua trường `columns`.",
    ],
  },
  columns: {
    intro: "Cấu hình tỷ lệ cột (chỉ áp dụng khi `isAutoLayout = false`):",
    items: [
      "Giá trị hợp lệ: từ 1 đến 24 (tuân theo grid system).",
      "Phạm vi: Cho phép định nghĩa theo từng kích thước màn hình `sm`, `md`, `lg`, `xl`, `xxl`.",
      "sm: màn hình nhỏ",
      "md: màn hình trung bình",
      "lg: màn hình lớn",
      "xl: màn hình rất lớn",
      "xxl: màn hình siêu lớn",
      "Ví dụ: `{ sm: 24, md: 12, lg: 8 }` nghĩa là ở màn hình nhỏ `sm` chiếm toàn bộ 24 cột, ở `md` chiếm nửa (12 cột), còn ở `lg` chiếm 1/3 (8 cột).",
      "Không được phép cấu hình nếu `isAutoLayout = true`.",
    ],
  },
  rows: {
    intro: "Các thuộc tính để tùy chỉnh bố cục của các hàng trong cột.",
    items: [
      "justify: Xác định cách căn chỉnh theo chiều ngang giữa các cột trong hàng. Ví dụ: start, center, end, space-between, space-around, space-evenly.",
      "align: Xác định cách căn chỉnh theo chiều dọc của các cột trong hàng. Ví dụ: top, middle, bottom.",
      "gutter: Xác định khoảng cách (theo pixel hoặc mảng) giữa các cột trong hàng. Ví dụ: 16, [16, 24].",
      "wrap (true hoặc false): Xác định các cột có tự động xuống dòng khi vượt quá chiều rộng của hàng hay không.",
    ],
  },
};

const COLUMN_FIELD_EN: Record<string, TooltipDescription> = {
  isAutoLayout: {
    intro: "Auto layout mode:",
    items: [
      "If enabled (true): The system will automatically arrange the column sizes based on content, and manual configuration in `columns` is not allowed.",
      "If disabled (false): You can manually configure the column ratios through the `columns` field.",
    ],
  },
  columns: {
    intro:
      "Column ratio configuration (only applies when `isAutoLayout = false`):",
    items: [
      "Valid values: from 1 to 24 (following the grid system).",
      "Scope: Allows definitions for each screen size breakpoint `sm`, `md`, `lg`, `xl`, `xxl`.",
      "`sm`: small screens",
      "`md`: medium screens",
      "`lg`: large screens",
      "`xl`: extra-large screens",
      "`xxl`: ultra-large screens",
      "Example: `{ sm: 24, md: 12, lg: 8 }` means on small screens `sm` it spans all 24 columns, on `md` it spans half (12 columns), and on `lg` it spans one-third (8 columns).",
      "Not allowed when `isAutoLayout = true`.",
    ],
  },
  rows: {
    intro: "Properties for customizing the layout of rows inside a column.",
    items: [
      "justify: Defines horizontal alignment of columns within a row. Examples: start, center, end, space-between, space-around, space-evenly.",
      "align: Defines vertical alignment of columns within a row. Examples: top, middle, bottom.",
      "gutter: Defines spacing (in pixels or array) between columns within a row. Examples: 16, [16, 24].",
      "wrap (true or false): Determines whether columns should automatically wrap to the next line when exceeding the row width.",
    ],
  },
};
// #endregion COLUMN_FIELD

// #region TEXT_VIEW
const TEXT_VIEW_VI: Record<string, TooltipDescription> = {
  content: "Tiêu đề chính hiển thị cho người dùng.",
  isAdditionalContent: "Hiển thị mô tả bổ sung (true hoặc false).",
  additionalContent: "Nội dung mô tả bổ sung",
  textColorAdditional: "Màu chữ của phần mô tả bổ sung",
  textType: {
    intro: "Kiểu văn bản hiển thị",
    items: [
      "text: Mặc định, hiển thị dạng văn bản.",
      "link: Hiển thị như liên kết.",
    ],
  },
  typeTransform: {
    intro: "Kiểu biến đổi chữ",
    items: [
      "uppercase: Toàn bộ chữ in hoa.",
      "capitalize: Chỉ viết hoa chữ cái đầu.",
      "lowercase: Toàn bộ chữ thường.",
      "none: Giữ nguyên văn bản gốc.",
    ],
  },
  fontSize: "Kích thước chữ (Đơn vị px, rem hoặc em).",
  textColor:
    "Màu chữ chính. Có thể chọn màu HEX (#000000), RGB, hoặc tên màu (red, blue...).",
  borderColor: "Màu đường viền (Áp dụng cho viền bao quanh tiêu đề).",
  borderStyle: {
    intro: "Kiểu đường viền",
    items: ["solid: Liền nét", "dotted: Nét chấm", "dashed: Nét gạch"],
  },
  borderWidth: "Độ dày đường viền. Đơn vị px. Ví dụ: 1px, 2px.",
  showBorder: {
    intro: "Vị trí hiển thị đường viền quanh tiêu đề",
    items: [
      "top: Hiển thị viền phía trên",
      "left: Hiển thị viền bên trái",
      "right: Hiển thị viền bên phải",
      "bottom: Hiển thị viền phía dưới",
      "none: Không hiển thị viền",
    ],
  },
  isPaddingBottom:
    "Khoảng cách dưới tiêu đề. Đơn vị px hoặc rem. Ví dụ: 8px, 1rem.",
  underline: {
    intro:
      "Kiểu gạch chân văn bản (thừa hưởng từ thuộc tính CSS text-decoration-style hoặc font-weight trong Typography)",
    items: [
      "bold: Gạch chân đậm",
      "normal: Gạch chân mặc định",
      "bolder: Đậm hơn chữ bình thường",
      "lighter: Nhẹ hơn chữ bình thường",
      "inherit: Kế thừa từ phần tử cha",
      "initial: Trở về giá trị mặc định của CSS",
      "revert: Hoàn tác về giá trị trước đó",
      "revert-layer: Hoàn tác về giá trị trong phạm vi layer CSS",
    ],
  },
  italic: {
    intro: "Văn bản in nghiêng",
    items: ["true: Bật chế độ in nghiêng", "false: Tắt chế độ in nghiêng"],
  },
  fontWeight: {
    intro: "Độ đậm của chữ (CSS font-weight)",
    items: [
      "normal: Cân bằng, mặc định (~400)",
      "bold: Đậm (~700)",
      "lighter: Nhẹ hơn chữ bình thường",
      "bolder: Đậm hơn chữ bình thường",
      "Giá trị số: từ 100–900 (100 = mảnh nhất, 900 = đậm nhất)",
    ],
  },
  maxWidth: "Chiều rộng tối đa của tiêu đề",
  level: {
    intro: "Cấp độ tiêu đề",
    items: ["1 : h1", "2 : h2", "3 : h3", "4 : h4", "5 : h5"],
  },
  justifyContent: {
    intro: "Căn chỉnh ngang nội dung tiêu đề (áp dụng flexbox)",
    items: [
      "normal: Mặc định, để trình duyệt quyết định",
      "center: Căn giữa",
      "end / flex-end / right: Căn phải",
      "left / flex-start: Căn trái",
      "space-between: Các phần tử cách đều, hai bên sát mép",
      "space-around: Các phần tử cách đều, có khoảng trống ở hai bên",
      "space-evenly: Các phần tử cách đều nhau, kể cả khoảng cách ở hai biên",
    ],
  },
};

const TEXT_VIEW_EN: Record<string, TooltipDescription> = {
  content: "The main title displayed to the user.",
  isAdditionalContent: "Show additional description (true or false).",
  additionalContent: "Additional description content.",
  textColorAdditional: "Text color of the additional description.",
  textType: {
    intro: "Text display type",
    items: [
      "text: Default, displayed as plain text.",
      "link: Displayed as a hyperlink.",
    ],
  },
  typeTransform: {
    intro: "Text transformation type",
    items: [
      "uppercase: All letters in uppercase.",
      "capitalize: Capitalize the first letter only.",
      "lowercase: All letters in lowercase.",
      "none: Keep the original text.",
    ],
  },
  fontSize: "Font size (unit: px, rem, or em).",
  textColor:
    "Main text color. Can be HEX (#000000), RGB, or a color name (red, blue...).",
  borderColor: "Border color (applied to the border around the title).",
  borderStyle: {
    intro: "Border style",
    items: ["solid: Solid line", "dotted: Dotted line", "dashed: Dashed line"],
  },
  borderWidth: "Border thickness. Unit: px. Example: 1px, 2px.",
  showBorder: {
    intro: "Position of the border around the title",
    items: [
      "top: Show border at the top",
      "left: Show border on the left",
      "right: Show border on the right",
      "bottom: Show border at the bottom",
      "none: Do not show border",
    ],
  },
  isPaddingBottom:
    "Bottom spacing of the title. Unit: px or rem. Example: 8px, 1rem.",
  underline: {
    intro:
      "Text underline style (inherited from CSS text-decoration-style or Typography font-weight)",
    items: [
      "bold: Bold underline",
      "normal: Default underline",
      "bolder: Bolder than normal text",
      "lighter: Lighter than normal text",
      "inherit: Inherit from parent element",
      "initial: Revert to CSS initial value",
      "revert: Rollback to the previous value",
      "revert-layer: Rollback to the value within CSS layer scope",
    ],
  },
  italic: {
    intro: "Italic text",
    items: ["true: Enable italic mode", "false: Disable italic mode"],
  },
  fontWeight: {
    intro: "Font weight (CSS font-weight)",
    items: [
      "normal: Balanced, default (~400)",
      "bold: Bold (~700)",
      "lighter: Lighter than normal",
      "bolder: Bolder than normal",
      "Numeric value: from 100–900 (100 = thinnest, 900 = boldest)",
    ],
  },
  maxWidth: "Maximum width of the title.",
  level: {
    intro: "Heading level",
    items: ["1 : h1", "2 : h2", "3 : h3", "4 : h4", "5 : h5"],
  },
  justifyContent: {
    intro: "Horizontal alignment of the title content (applies flexbox)",
    items: [
      "normal: Default, browser decides",
      "center: Center aligned",
      "end / flex-end / right: Right aligned",
      "left / flex-start: Left aligned",
      "space-between: Items spaced evenly, edges flush",
      "space-around: Items spaced evenly, with spacing on edges",
      "space-evenly: Items evenly spaced including edges",
    ],
  },
};

// #endregion TEXT_VIEW

// #region CHECKBOX_TOGGLE
const CHECKBOX_TOGGLE_VI: Record<string, TooltipDescription> = {
  isFullWidth: {
    intro:
      "Cấu hình chiều dài của thành phần được thêm vào bên trong CHECKBOX_TOGGLE",
    items: ["true: Chiếm 100% chiều dài.", "false: Chiếm 50% chiều dài."],
  },
  labelPosition: {
    intro: "Vị trí của tiêu đề",
    items: ["Left: Bên trái checkbox.", "Right: Bên phải checkbox."],
  },
  checkboxToggleServerPayloadKey:
    "Tên khoá được gửi lên server khi submit dữ liệu.",
  enableMutualExclusion: {
    intro:
      "Bật chế độ loại trừ lẫn nhau. Khi true, trong cùng một nhóm chỉ chọn được 1 (giống như radio).",
    items: [
      "false: Cho phép chọn nhiều.",
      "true: Chỉ cho phép chọn một trong nhóm (mutual exclusion). Cần cấu hinh thêm `groupName` để xác định nhóm các checkbox có cùng `groupName`",
      "Lưu ý: Nếu UI có CHECKBOX thì chỉ cần cấu hình tương tự.",
    ],
  },
  groupName: {
    intro:
      "Tên nhóm để gom nhiều CHECKBOX_TOGGLE lại với nhau. Các checkbox có cùng groupName sẽ thuộc cùng một nhóm.",
    items: [
      "Ví dụ: Nếu 2 CHECKBOX_TOGGLE có enableMutualExclusion = true và cùng groupName, thì người dùng chỉ chọn được một trong hai.",
      "Lưu ý: Nếu UI có CHECKBOX thì chỉ cần cấu hình tương tự.",
    ],
  },
};

const CHECKBOX_TOGGLE_EN: Record<string, TooltipDescription> = {
  isFullWidth: {
    intro: "Configure the width of the element inside CHECKBOX_TOGGLE.",
    items: ["true: Occupies 100% width.", "false: Occupies 50% width."],
  },
  labelPosition: {
    intro: "Position of the label.",
    items: [
      "Left: On the left side of the checkbox.",
      "Right: On the right side of the checkbox.",
    ],
  },
  checkboxToggleServerPayloadKey:
    "The key name sent to the server when submitting data.",
  enableMutualExclusion: {
    intro:
      "Enable mutual exclusion mode. When true, only one option in the same group can be selected (similar to radio).",
    items: [
      "false: Allows multiple selections.",
      "true: Only one can be selected within the group (mutual exclusion). Need to configure `groupName` to identify groups of checkboxes with the same `groupName`",
      "Note: If the UI has CHECKBOX, just configure it similar to CHECKBOX_TOGGLE",
    ],
  },
  groupName: {
    intro:
      "The group name to combine multiple CHECKBOX_TOGGLE together. Checkboxes with the same groupName belong to the same group.",
    items: [
      "Example: If 2 CHECKBOX_TOGGLE have enableMutualExclusion = true and the same groupName, the user can only select one of them.",
      "Note: If the UI has CHECKBOX, just configure it similar to CHECKBOX_TOGGLE",
    ],
  },
};

// #endregion CHECKBOX_TOGGLE

export const tooltipForComponent = {
  [FIELD_NAME.SELECT]: {
    vi: { ...tooltipBaseHelper_Vi, ...SELECT_VI },
    en: { ...tooltipBaseHelper_En, ...SELECT_EN },
  },
  [FIELD_NAME.INPUT]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.INPUT_NUMBER]: {
    vi: { ...tooltipBaseHelper_Vi, ...INPUT_NUMBER_VI },
    en: { ...tooltipBaseHelper_En, ...INPUT_NUMBER_EN },
  },
  [FIELD_NAME.CMND_NUMBER]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.MST_NUMBER]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.COLUMN_FIELD]: {
    vi: { ...tooltipBaseHelper_Vi, ...COLUMN_FIELD_VI },
    en: { ...tooltipBaseHelper_En, ...COLUMN_FIELD_EN },
  },
  [FIELD_NAME.TEXT_VIEW]: {
    vi: { ...tooltipBaseHelper_Vi, ...TEXT_VIEW_VI },
    en: { ...tooltipBaseHelper_En, ...TEXT_VIEW_EN },
  },
  [FIELD_NAME.CHECKBOX_TOGGLE]: {
    vi: { ...tooltipBaseHelper_Vi, ...CHECKBOX_TOGGLE_VI },
    en: { ...tooltipBaseHelper_En, ...CHECKBOX_TOGGLE_EN },
  },
  [FIELD_NAME.EMAIL]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.PHONE_NUMBER]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.TABLE]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.TABLE_PROFIT]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.TABLE_CAPITAL_CONTRIBUTION]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.TABLE_CAPITAL_LENDING]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.TABLE_FINANCIAL]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.INPUT_PASSWORD]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.BUTTON]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.RADIO_GROUP]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.ASYNC_RADIO_GROUP]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.HTML_VIEW]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.UPLOAD]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.FIELD_TABLE_SINGLE]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.ASYNC_SELECT]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.CHECK_BOX]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.CHECKBOX_GROUP]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.ASYNC_CHECKBOX_GROUP]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.FORM_STEP]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.CAPTCHA]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.TAB]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.TEXTAREA]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.VIEW_INFO]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.VIEW_INVESTOR]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.VIEW_INVESTOR_SHORTEN]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.VIEW_INVESTOR_BASE]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.VIEW_INVESTOR_BASE_V2]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.VIEW_INVESTOR_CHECKBOX]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.VIEW_INVESTOR_CHECKBOX_V2]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.CONTENT_PROJECT]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.VIEW_INVESTOR_TABLE]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.VIEW_AMENDING_CONTENT]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.VIEW_AMENDING_CONTENT_ADVANCE]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.VIEW_DOCUMENT]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.DIGITAL_SIGNATURE]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.VIEW_SELECT_FILE]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.CHECKBOX_WITH_INPUT]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.GROUP_FIELDS]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.ASYNC_TABLE]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.DATE_PICKER]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.DATETIME_PICKER]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.TABLE_VETERINARY1]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.INPUT_NUMBER_RANGE]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.VIEW_INFO_HIDDEN]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.BUTTON_SYNC_DATA_TO_KHAI]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.MUC_DICH_KHAI_THAC_SD]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.TABLE_TAB_KHOANG_SAN_2]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.TABLE_TAB_KHOANG_SAN]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.TABLE_KHOANG_SAN]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.RANGEPICKER]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.INPUT_WITH_UPLOAD]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.TABLE_DAT_DAI13D]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.TABLE_DAT_DAI13C]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.TABLE_DAT_DAI13B]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.TABLE_HAN_NGACH]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.TABLE_GROUP]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.VIEW_DO_DAC_PRODUCT]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.INPUT_FUNCTION]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.COORDINATE_SELECT]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.ENVIRONMENTAL_COMPONENT]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.INPUT_SEARCH]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.ASYNC_CHECKBOX_WITH_INPUT]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.INPUT_UNIT]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.VIEW_INPUT_BO_SUNG_HS]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
  [FIELD_NAME.GROUP_SELECT]: {
    vi: { ...tooltipBaseHelper_Vi },
    en: { ...tooltipBaseHelper_En },
  },
};
