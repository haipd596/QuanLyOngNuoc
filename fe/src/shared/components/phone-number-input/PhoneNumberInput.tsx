//lib
import React, { useEffect, useRef, useState } from "react";
import { Input, Select } from "antd";

//services
import { useCountryCodesQuery } from "~/shared/services/query";

const { Option } = Select;

const findMatchByDialCode = (
  val: string,
  countryCodes: { id: string; code: string }[],
) => {
  const normalized = val.replace(/^\+/, "");
  return countryCodes.find((c) => {
    const dialCode = c.code.replace(/^\+/, "");
    return normalized.startsWith(dialCode);
  });
};

interface PhoneNumberInputProps {
  value?: string;
  country?: string;
  onChange?: (value: string) => void;
  prefix: string;
  onPrefixChange: (prefix: string, country?: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  id?: string;
  disabled?: boolean;
  prefixTabIndex?: number;
  inputTabIndex?: number;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  country,
  onChange,
  prefix,
  onPrefixChange,
  placeholder,
  style,
  id,
  disabled,
  prefixTabIndex,
  inputTabIndex,
}) => {
  const { data: countryCodes = [], isLoading } = useCountryCodesQuery();
  const hasInitialized = useRef(false);
  const [selectedCountryId, setSelectedCountryId] = useState<string | undefined>(undefined);

  // Sync selectedCountryId from `country` prop (takes priority) or from `prefix`
  useEffect(() => {
    if (countryCodes.length === 0) return;

    const normPrefix = prefix?.replace(/^\+/, "");

    // Try to resolve by `country` id first, then fallback to `prefix` dial code
    const matchByCountry = country
      ? countryCodes.find((c) => c.id === country)
      : undefined;

    const matchByPrefix = normPrefix
      ? countryCodes.find((c) => c.code.replace(/^\+/, "") === normPrefix)
      : undefined;

    const resolved = matchByCountry ?? matchByPrefix;

    if (resolved) {
      if (resolved.id !== selectedCountryId) {
        setSelectedCountryId(resolved.id);
      }
      // Sync prefix and/or country up to parent if either doesn't match
      const prefixMismatch = resolved.code.replace(/^\+/, "") !== normPrefix;
      const countryMismatch = resolved.id !== country;
      if (prefixMismatch || countryMismatch) {
        onPrefixChange(resolved.code, resolved.id);
      }
    } else if (!country && !prefix) {
      setSelectedCountryId(undefined);
    }
  }, [country, prefix, countryCodes]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!value) return;

    if (hasInitialized.current && !value.startsWith("+")) return;

    if (value.startsWith("+")) {
      hasInitialized.current = true;
      if (prefix && value.startsWith(prefix)) {
        const phoneNumber = value.slice(prefix.length).replace(/^0+/, "");
        onChange?.(phoneNumber);
      } else if (countryCodes.length > 0) {
        const matched = findMatchByDialCode(value, countryCodes);
        if (matched) {
          const dialCode = matched.code.replace(/^\+/, "");
          const normalized = value.replace(/^\+/, "");
          const phoneNumber = normalized
            .slice(dialCode.length)
            .replace(/^0+/, "");
          onPrefixChange(matched.code, matched.id);
          onChange?.(phoneNumber);
        }
      }
    } else if (!hasInitialized.current) {
      hasInitialized.current = true;
      const cleaned = value.replace(/\D/g, "").replace(/^0+/, "");
      onChange?.(cleaned);
    }
  }, [countryCodes, value, prefix]); // kept the dependency format same here to avoid eslint warning if `onPrefixChange` is not memoized in parent

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const cleaned = val.replace(/\D/g, "").replace(/^0+/, "");
    onChange?.(cleaned);
  };

  const handlePrefixChange = (val: string) => {
    const match = countryCodes.find((c) => c.id === val);
    if (match) {
      setSelectedCountryId(match.id);
      onPrefixChange(match.code, match.id);
    }
  };

  const prefixSelector = (
    <Select
      value={selectedCountryId || prefix}
      onChange={(val) => handlePrefixChange(val)}
      style={{ width: 150, height: style?.height }}
      popupMatchSelectWidth={false}
      loading={isLoading}
      showSearch
      filterOption={(input, option) =>
        String(option?.label ?? "").toLowerCase().includes(input.toLowerCase()) ||
        String(option?.value ?? "").toLowerCase().includes(input.toLowerCase()) ||
        String(option?.children ?? "").toLowerCase().includes(input.toLowerCase())
      }
      optionLabelProp="label"
      disabled={disabled}
      variant="borderless"
      tabIndex={prefixTabIndex}
    >
      {countryCodes.map((c) => (
        <Option
          key={`${c.code}-${c.id}`}
          value={c.id}
          label={`${c.id} (+ ${c.code})`}
        >
          {`+ ${c.code} - ${c.id}`}
        </Option>
      ))}
    </Select>
  );

  return (
    <Input
      addonBefore={prefixSelector}
      style={{
        ...style,
        width: "100%",
      }}
      value={value}
      onChange={onNumberChange}
      placeholder={placeholder}
      maxLength={15}
      id={id}
      disabled={disabled}
      tabIndex={inputTabIndex}
    />
  );
};

export default PhoneNumberInput;
