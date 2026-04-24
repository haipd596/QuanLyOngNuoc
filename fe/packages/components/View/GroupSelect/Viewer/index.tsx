import FCGroupSelect from '@packages/components/GroupSelect';

type GroupSelectType = {
  modeView: string;
};

const GroupSelectViewer:React.FC<GroupSelectType> = (props) => {
  const { modeView } = props;

  return (
    <FCGroupSelect modeView={modeView} />
  );
};

export default GroupSelectViewer;
