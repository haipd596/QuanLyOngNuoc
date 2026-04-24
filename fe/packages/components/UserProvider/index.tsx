import { useFetchBaseLogin } from '@packages/hooks/useFetchBaseLogin';
// import { message } from 'antd';
import { useEffect } from 'react';
import Loading from '../Loading';

type TUserProviderProps = {
  children: any
};

const UserProvider = ({ children }: TUserProviderProps) => {
  const { typeUser, loading } = useFetchBaseLogin();

  useEffect(() => {
    if (typeUser) {
      try {
        // @ts-expect-error: should work
        currentUser = typeUser;
      } catch (error) {
        console.error('get global user error', error);
      }
    }
  }, [typeUser]);

  // useEffect(() => {
  //   if (loading) {
  //     message.warning('Đang lấy thông tin người dùng...');
  //   }
  // }, [loading]);

  if (loading) {
    return <Loading isLoading={loading}><p /></Loading>;
  }

  return (
    children
  );
};

export default UserProvider;
