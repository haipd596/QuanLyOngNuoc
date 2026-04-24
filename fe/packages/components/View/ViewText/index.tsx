import { BORDER } from '@packages/utils/common';
import { KEY_OVERRIDE } from '@packages/utils/constantKeyOverride';
import { Typography, TypographyProps } from 'antd';
import { TitleProps } from 'antd/es/typography/Title';
import React from 'react';

export interface ViewTextProps extends TypographyProps {
  content: string;
  isAdditionalContent: boolean;
  additionalContent: string;
  textColorAdditional: string;
  textType: string;
  typeTransform: any;
  textColor: string;
  underline: boolean;
  italic: boolean;
  strong: boolean;
  fontSize: number;
  level?: TitleProps['level'];
  fontWeight: string;
  justifyContent: string;
  borderStyle: string;
  borderWidth: number;
  borderColor: string;
  maxWidth: number;
  showBorder: string;
  isPaddingBottom: number;
  fieldKey: string;
}

const { Title, Link } = Typography;

const ViewText: React.FC<ViewTextProps> = (props: ViewTextProps) => {
  const {
    content,
    fieldKey,
    isAdditionalContent,
    additionalContent,
    textColorAdditional,
    textType,
    typeTransform,
    textColor,
    underline,
    italic,
    fontSize,
    level,
    fontWeight,
    justifyContent,
    borderStyle,
    borderWidth,
    borderColor,
    maxWidth,
    showBorder,
    isPaddingBottom,
  // stylesPropsParseFromJsonTree
  } = props;
  if (fieldKey === KEY_OVERRIDE.TITLE_XAC_NHAN_DANG_KY) {
    return null;
  }

  const borderValue = `${borderWidth}px ${borderStyle} ${borderColor}`;

  if (textType === 'text') {
    return (
      <Title
        className="custom-text"
        style={{
          color: textColor,
          display: 'flex',
          justifyContent,
          fontSize,
          fontWeight,
          maxWidth,
          borderTop: showBorder === BORDER.BORDER_TOP ? borderValue : 'none',
          borderLeft: showBorder === BORDER.BORDER_LEFT ? borderValue : 'none',
          borderRight: showBorder === BORDER.BORDER_RIGHT ? borderValue : 'none',
          borderBottom: showBorder === BORDER.BORDER_BOTTOM ? borderValue : 'none',
          borderWidth: showBorder === BORDER.BORDER_NONE ? 'none' : borderValue,
          textTransform: typeTransform,
          paddingBottom: isPaddingBottom,
        }}
        underline={underline}
        italic={italic}
        level={level}
      >
        <span>
          {content}
          {isAdditionalContent
          && (
          <span style={{ color: textColorAdditional, textTransform: 'none' }}>
&nbsp;
            {additionalContent}
          </span>
          )}
        </span>
      </Title>
    );
  } if (textType === 'link') {
    return (
      <Link
        href={content}
        style={{
          color: textColor,
          display: 'flex',
          justifyContent,
          fontSize,
          fontWeight,
          maxWidth,
          borderTop: showBorder === BORDER.BORDER_TOP ? borderValue : 'none',
          borderLeft: showBorder === BORDER.BORDER_LEFT ? borderValue : 'none',
          borderRight: showBorder === BORDER.BORDER_RIGHT ? borderValue : 'none',
          borderBottom: showBorder === BORDER.BORDER_BOTTOM ? borderValue : 'none',
          textTransform: typeTransform,
          paddingBottom: isPaddingBottom,
        }}
      >
        {content}
      </Link>
    );
  }
};

export default ViewText;
