import { ViewCheckboxInput } from '../type';
import WrapperCardBuilder from './WrapperCardBuilder';

const BuilderCheckboxWithInput:React.FC<ViewCheckboxInput> = (props) => {
  const { options } = props;

  return (
    <WrapperCardBuilder options={options} />
  );
};

export default BuilderCheckboxWithInput;
