import { useNavigate } from "@tanstack/react-router";
import { publicNavigationItems } from "../constants/navigation";
import { StyledMenu } from "./styles/NavBarStyled";

const AppNavbar = () => {
  const navigate = useNavigate();

  const handleClick = (e: { key: string }) => {
    navigate({ to: e.key });
  };

  return (
    <StyledMenu
      mode="horizontal"
      items={publicNavigationItems}
      onClick={handleClick}
    />
  );
};

export default AppNavbar;
