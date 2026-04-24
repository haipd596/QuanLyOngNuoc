import { Button, Form, Input } from 'antd';
import { useState } from 'react';

// import { apiGetUserInfo } from '@packages/dvc-service';
import DocumentModal from '../components/DocumentModal';
import ThreadCertificate2 from '../components/ThreadCertificate2';
import ThreadFive from '../components/ThreadFive';
import ThreadFour from '../components/ThreadFour';
import ThreadLand1 from '../components/ThreadLand1';
import ThreadThree from '../components/ThreadThree';
import '../styles.scss';

const BuilderDocument: React.FC<any> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // useEffect(() => {
  //   // setIsLoadingFormData(true);
  //   apiGetUserInfo().then((data: any) => {
  //     console.log('🚀 ~ apiGetUserInfo ~ data:', data);
  //     if (data) {
  //       // setFormData(data);
  //     }
  //   }).finally(() => {
  //     // setIsLoadingFormData(false);
  //   });
  // }, []);

  return (
    <div className="wrapper-document">
      <Button type="primary" onClick={() => setIsOpen(true)}>Thêm thành phần</Button>
      <DocumentModal
        isOpen={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        <div className="header-title">
          <Form.Item
            name="dear"
            label={<strong>Kính Gửi:</strong>}
            initialValue="CHI NHÁNH VĂN PHÒNG ĐĂNG KÍ ĐẤT ĐAI THÀNH PHỐ HÀ GIANG"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="declaration-section">
          <h3>I. Phần kê khai của người đăng ký</h3>
        </div>
        <ThreadLand1 isChecked={isChecked} />
        <ThreadCertificate2 />
        <ThreadThree isChecked={isChecked} onChange={() => setIsChecked(!isChecked)} />
        <ThreadFour />
        <ThreadFive />
      </DocumentModal>
    </div>
  );
};

export default BuilderDocument;
