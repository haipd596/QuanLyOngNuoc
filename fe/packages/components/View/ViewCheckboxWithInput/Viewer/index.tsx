import WrapperCardViewer from './WrapperCardViewer';

const ViewerCheckboxWithInput:React.FC<any> = (props) => {
  const { options } = props;

  return (
    <WrapperCardViewer {...props} options={options} />
  );
};

export default ViewerCheckboxWithInput;
