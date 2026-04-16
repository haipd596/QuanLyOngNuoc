import { useNavigate } from "@tanstack/react-router";
import type { MenuProps } from "antd";
import { Popover } from "antd";
import { PopoverMenuWrapper } from "./styled";
import type { AppMenuItem } from "./types";

export const useHandle = () => {
  const navigate = useNavigate();

  const navigateTo = (key: string) => {
    navigate({ to: key as any });
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigateTo(e.key);
  };

  const findParents = (
    items: AppMenuItem[] | undefined,
    path: string,
    parents: string[] = []
  ): string[] | null => {
    if (!items) return null;
    for (const item of items) {
      if (!item) continue;
      if (item.key === path || path?.includes(item.key)) return [...parents, item.key];

      if (item.children && item.children.length > 0) {
        const result = findParents(item.children, path, [...parents, item.key]);
        if (result) return result;
      }
    }
    return null;
  };

  const createPopoverContent = (children?: AppMenuItem[]) => (
    <PopoverMenuWrapper>
      {children?.map(
        (child) =>
          child && (
            <div key={child.key}>
              {child.children?.length ? (
                <div className="my-popover-header">
                  <div className="popover-header">
                    {child.icon} {child.label}
                  </div>

                  <div className="my-submenu">
                    {child.children.map((grandChild) => (
                      <div
                        key={grandChild.key}
                        onClick={() => navigateTo(grandChild.key)}
                        className="popover-submenu-item"
                      >
                        {grandChild.label}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => navigateTo(child.key)}
                  className="popover-item"
                >
                  {child.icon} {child.label}
                </div>
              )}
            </div>
          )
      )}
    </PopoverMenuWrapper>
  );

  const renderCollapsedMenuItem = (item: AppMenuItem) => {
    if (item.children?.length) {
      return (
        <Popover
          key={item.key}
          content={createPopoverContent(item.children)}
          trigger="hover"
          placement="rightTop"
        >
          <div className="collapsed-menu-item">{item.icon}</div>
        </Popover>
      );
    }

    return (
      <div
        key={item.key}
        className="collapsed-menu-item"
        onClick={() => navigateTo(item.key)}
      >
        {item.icon}
      </div>
    );
  };

  return {
    navigateTo,
    findParents,
    handleMenuClick,
    createPopoverContent,
    renderCollapsedMenuItem,
  };
};
export default useHandle;
