// import { ArrowRightOutlined } from '@ant-design/icons';
// import { Col, Row } from 'antd';
// import { Link } from "@tanstack/react-router";
// import useGetApps from '@/shared/hooks/useGetApps';
// import MenuActiveIcon from '@/assets/icons/MenuActiveIcon';
// import {
//   MenuButtonWrapper,
//   AppLogoWrapper,
//   AppName,
//   MenuHeader,
//   MenuTitle,
//   MenuWrapper
// } from './styled';

// type TMenu = { onClose: any; }

// export const Menu = ({ onClose }: TMenu) => {
//   const { apps } = useGetApps();
//   return (
//     <MenuWrapper>
//       <MenuHeader>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//           <MenuButtonWrapper>
//             <MenuActiveIcon size={24} color="var(--primary)" />
//           </MenuButtonWrapper>
//           <MenuTitle>Ứng dụng</MenuTitle>
//         </div>
//         <Link to="/admin" onClick={onClose}>
//           <span style={{ color: 'Var(--primary)' }}>Tất cả</span>
//           <ArrowRightOutlined style={{ color: 'Var(--primary)', marginLeft: '4px' }} />
//         </Link>
//       </MenuHeader>
//       <Row style={{ padding: '0 16px', alignItems: 'baseline' }}>
//         {apps.map((app) => (
//           <Col xs={12} key={app.maUD}>
//             <AppLogoWrapper to={app.path} onClick={onClose}>
//               <div>
//                 <img src={app.imageSrc} alt="" />
//               </div>
//               <AppName>{app.tenUD}</AppName>
//             </AppLogoWrapper>
//           </Col>
//         ))}
//       </Row>
//     </MenuWrapper>
//   )
// }
// export default Menu;
