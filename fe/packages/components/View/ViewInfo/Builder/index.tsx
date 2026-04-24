// import useFetchData from '@packages/hooks/useFetchData';
// import { randomString } from '@packages/utils/radomString';
// import { Button, Form, Row } from 'antd';
// import { AnyObject } from 'antd/es/_util/type';
// import { useState } from 'react';
// import { useAppDispatch } from '~/redux/hooks';
// import { updateViewInfoKey } from '~/redux/slices';
// import WrapperColumnKey from '../WrapperColumnKey';
// import { IPropsValue, TAsyncViewInfoProps } from '../type';
// import FormModalValue from './FormModalValue';
// import './style.scss';

// const BuilderInfo: React.FC<TAsyncViewInfoProps> = (props) => {
//   const {
//     fieldKey,
//     listKeyValueInViewInfo,
//   } = props;
//   const [form] = Form.useForm();
//   const dispatch = useAppDispatch();
//   const [open, setOpen] = useState<boolean>(false);
//   const [keyValues, setKeyValues] = useState<IPropsValue[]>(listKeyValueInViewInfo);
//   const { fetchData: dataSource } = useFetchData();

//   const handleAddValue = (values: IPropsValue) => {
//     const { id } = values;
//     setKeyValues((prev: IPropsValue[]) => {
//       const indexVal = prev.findIndex(({ id: _id }) => _id === id);
//       if (indexVal !== -1) {
//         prev[indexVal] = values;
//       } else {
//         prev.push({ ...values, id: randomString(10) });
//       }
//       dispatch(updateViewInfoKey({
//         fieldKey,
//         listKeyValueInViewInfo: [...prev],
//       }));
//       return [...prev];
//     });

//     setOpen(false);
//   };

//   const handleDeleteKey = (id: string) => {
//     const filterKeys = keyValues.filter(({ id: _id }) => _id !== id);
//     setKeyValues(filterKeys);
//     dispatch(updateViewInfoKey({
//       fieldKey,
//       listKeyValueInViewInfo: filterKeys,
//     }));
//   };

//   const handleEditKey = (values: AnyObject) => {
//     form.setFieldsValue(values);
//     setOpen(true);
//   };

//   if (!dataSource) return <div>Data is not found</div>;

//   return (
//     <div className="wrapper-view-info">
//       {keyValues.length === 0 && <div>Thêm thông tin mô tả!</div>}
//       <Row justify="space-between" align="middle" gutter={[0, 10]}>
//         <WrapperColumnKey
//           dataSource={dataSource}
//           dataValues={keyValues}
//           onDeleteKey={handleDeleteKey}
//           onEditKey={handleEditKey}
//         />
//       </Row>
//       <FormModalValue
//         open={open}
//         form={form}
//         onCancel={() => setOpen(false)}
//         onClose={() => setOpen(true)}
//         onSubmit={handleAddValue}
//       />
//       <Button type="primary" onClick={() => setOpen(true)}>
//         Thêm
//       </Button>
//     </div>
//   );
// };

// export default BuilderInfo;

export default () => 'Builder view info';
