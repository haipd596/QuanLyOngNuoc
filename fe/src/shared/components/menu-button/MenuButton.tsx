// import { Drawer } from 'antd';
// import { useState } from 'react';
// import MenuIcon from '@assets/icons/MenuIcon';
// import Menu from './Menu';
// import { MenuButtonWrapper } from './styled';
// import { useNavigate } from '@tanstack/react-router';
// import useGetApps from '@/shared/hooks/useGetApps';

// export const MenuButton = () => {
//   const navigate = useNavigate();
//   const [menuVisible, setMenuVisible] = useState(false);
//   const { apps } = useGetApps();
//   return (
//     <>
//       <Drawer
//         placement="left"
//         width="320px"
//         onClose={() => setMenuVisible(false)}
//         open={menuVisible}
//         styles={{
//           header: { display: 'none' },
//           mask: { background: 'transparent' },
//           body: {padding: "1rem 0rem"}
//         }}
//       >
//         <Menu onClose={() => setMenuVisible(false)} />
//       </Drawer>

//       <MenuButtonWrapper
//         as="button"
//         onClick={() => {
//           apps?.length > 1 ? setMenuVisible(true) : navigate({ to: '/admin'});
//         }}
//       >
//         <MenuIcon size={24} color="var(--primary)" />
//       </MenuButtonWrapper>
//     </>
//   )
// }
// export default MenuButton;
