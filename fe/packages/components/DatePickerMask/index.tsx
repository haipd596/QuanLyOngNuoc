import { DatePicker } from 'antd';
import IconWrapper from '@packages/components/IconWrapper';
import type { DatePickerProps } from 'antd';
import { useRef } from 'react';

/**
 * DatePickerMask — DatePicker tự động chèn dấu "/" khi user gõ ngày tháng.
 *
 * Cách hoạt động:
 *   1. Bắt keydown trên wrapper div (event bubbling từ input bên trong)
 *   2. Sau khi antd xử lý ký tự (setTimeout 0), kiểm tra nếu độ dài = 2 hoặc 5
 *      → tức là user vừa gõ xong "ngày" hoặc "tháng" → chèn "/"
 *   3. Dùng nativeInputValueSetter để bypass React controlled input,
 *      sau đó dispatch "input" event để rc-picker parse lại giá trị mới.
 *
 * Format mặc định: DD/MM/YYYY
 */
export default function DatePickerMask({ style, ...props }: DatePickerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = e.target as HTMLInputElement;

    // Chỉ xử lý khi focus đúng vào input bên trong DatePicker
    if (input.tagName !== 'INPUT') return;

    // Chỉ xử lý phím số
    if (!/^\d$/.test(e.key)) return;

    // Backspace / Delete / Arrow — để antd tự xử lý
    setTimeout(() => {
      const val = input.value;

      // Sau khi gõ xong 2 ký tự (DD) hoặc 5 ký tự (DD/MM) → chèn "/"
      if (val.length === 2 || val.length === 5) {
        const nativeSetter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          'value'
        )?.set;

        if (nativeSetter) {
          nativeSetter.call(input, val + '/');
          // Trigger để rc-picker nhận biết giá trị thay đổi
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    }, 0);
  };

  return (
    <div ref={wrapRef} onKeyDown={handleKeyDown}>
      <DatePicker
        format="DD/MM/YYYY"
        placeholder="DD/MM/YYYY"
        style={{ width: '100%', ...style }}
        suffixIcon={(
          <IconWrapper icon={<i className="fa-sharp fa-solid fa-calendar-days" />} />
        )}
        allowClear={{
          clearIcon: (
            <IconWrapper icon={<i className="fa-solid fa-xmark" />} />
          ),
        }}
        {...props}
      />
    </div>
  );
}
