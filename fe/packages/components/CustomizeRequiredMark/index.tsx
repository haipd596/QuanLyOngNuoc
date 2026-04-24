export const CustomizeRequiredMark = (
  label: React.ReactNode,
  { required }: { required: boolean },
) => (
  <span>
    {label}
    {required ? <span style={{ color: 'red', marginLeft: 2 }}>(*)</span> : null}
  </span>
);
