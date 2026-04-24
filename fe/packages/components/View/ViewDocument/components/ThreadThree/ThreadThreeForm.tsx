import React, { useMemo } from 'react';
import { ThreadThreeFormType, TItemsThreadThree } from '../../type';
import FormAutoFill from './FormAutoFill';
import FormCustomFill from './FormCustomFill';

const ThreadThreeForm:React.FC<ThreadThreeFormType> = ({ isChecked }) => {
  const config: TItemsThreadThree[] = [
    {
      title: 'Thông tin về người được cấp GCN trên GCN trước khi biến động:',
      subtitle: '(Được lấy tự động từ thông tin kê khai tại mục 1. Để chỉnh sửa thông tin, vui lòng kê khai lại mục 1)',
      form: (
        <FormAutoFill fullname="Nguyễn Văn A" vneid="123123123123" address="Test Address" />
      ),
      isShow: isChecked,
    },
    {
      title: 'Thông tin về người được cấp GCN trên GCN sau khi biến động:',
      subtitle: '(Được lấy tự động từ thông tin kê khai tại mục 1 và cơ sở dữ liệu quốc gia về dân cư)',
      form: (
        <FormAutoFill fullname="Nguyễn Văn A" vneid="123123123123" address="Test Address" />
      ),
      isShow: isChecked,
    },
    {
      title: 'Nội dung trên GCN trước khi biến động:',
      subtitle: '',
      form: (
        <FormCustomFill fullname="Nguyễn Văn A" vneid="123123123123" address="Test Address" />
      ),
      isShow: true,
    },
    {
      title: 'Nội dung trên GCN sau khi biến động:',
      subtitle: '',
      form: (
        <FormCustomFill fullname="Nguyễn Văn A" vneid="123123123123" address="Test Address" repeat />
      ),
      isShow: true,
    },
  ];

  const listItemConfig = useMemo(() => {
    return config.filter((item) => item.isShow);
  }, [isChecked]);

  return (
    <div className="f-thread-child--wrap">
      {
        listItemConfig.length > 0 ? (
          listItemConfig.map((item, index) => (
            <div key={index} className="f-thread-child f-thread-child--border">
              <div className="f-thread-child__title">
                <p>{`3.${index + 1}.${item.title}`}</p>
                {item.subtitle && <p className="f-subtitle-child">{item.subtitle}</p>}
              </div>
              <div className="f-thread-child__content">{item.form}</div>
            </div>
          ))
        ) : null
      }
    </div>
  );
};

export default ThreadThreeForm;
