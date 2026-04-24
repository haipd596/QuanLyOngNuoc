import { CodeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useLanguage } from '@packages/components/LanguageContext';
import { Tooltip } from 'antd';
import React, { FC } from 'react';
import { tooltipForComponent } from '../../helperTooltip';
import '../styles.scss';

interface configLabelProps {
  label: string | undefined,
  onOpenCode: () => void,
  fieldNameOrigin?: any,
}

const ConfigLabel:FC<configLabelProps> = ({
  label,
  onOpenCode,
  fieldNameOrigin,
}) : React.JSX.Element => {
  const { translate, language } = useLanguage();

  const tooltipData = tooltipForComponent[fieldNameOrigin]?.[language]?.[label as any] || translate('des_tooltip_default');
  const tooltipTitle = typeof tooltipData === 'string' ? tooltipData : (
    <div>
      {tooltipData.intro && <p style={{marginBottom: 8}}>{tooltipData.intro}</p> }
      {tooltipData.items && (
          <ul style={{ paddingLeft: 20, marginBottom: 10}}>
            {
              tooltipData.items.map((item, index) => {
                const [boldPartIntro, descPartNormal] = item.split(':');

                return (
                  <li key={index}>
                    <strong>{boldPartIntro}</strong>
                    {descPartNormal !== undefined && `:${descPartNormal}`}
                  </li>
                )
              }
              )
            };
          </ul>
        )}
    </div>
  )

  return (
    <div className="label">
      <h5 style={{ margin: '0', color: 'black' }}>{label}</h5>
      <Tooltip title={tooltipTitle} placement="left">
        <i className="info">
          <InfoCircleOutlined />
        </i>
      </Tooltip>
      <button type="button" className="code-button">
        <i>
          <CodeOutlined onClick={onOpenCode} />
          {' '}
          {/* Code reveal button */}
        </i>
      </button>

    </div>
  );
};

export default ConfigLabel;
