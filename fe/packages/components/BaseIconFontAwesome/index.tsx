import IconWrapper from '../IconWrapper';

type BaseIconFontAwesomeType = {
  className: string;
  fontSize?: number;
  color?: string;
};

const BaseIconFontAwesome:React.FC<BaseIconFontAwesomeType> = (props) => {
  const { className, fontSize, color } = props;

  return (
    <IconWrapper icon={(
      <i
        className={className}
        style={{ color, fontSize }}
      />
)}
    />
  );
};

export default BaseIconFontAwesome;
