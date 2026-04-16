import {
  BackButton,
  CurrentItem,
  Header,
  HomeItem,
  LinkItem,
  PageContent,
  PageWrapper,
  StyledBreadcrumb,
} from "@/shared/components/page-container/styled";
import type { AppMenuItem } from "@/shared/components/sidebar/types";
import { getPersistedSearch, persistSearch } from "@/shared/hooks/useSearchPersist";
import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Space } from "antd";
import React, { useEffect, useMemo } from "react";

interface MenuLabelNumberProps {
  text: string;
  count: number;
}

interface PageContainerProps {
  children: React.ReactNode;
  menuItems: AppMenuItem[];
  showNavButtons?: boolean;
  onBack?: () => void;
  showBreadcrumb?: boolean;
  customBreadcrumb?: Array<{ title: string; path?: string }>;
  homeRoute?: string;
  homeLabel?: string;
  showHome?: boolean;
  breadcrumbSeparator?: React.ReactNode;
}

export const PageContainerBreadCrumb: React.FC<PageContainerProps> = ({
  children,
  menuItems,
  showNavButtons = true,
  showBreadcrumb = true,
  showHome = true,
  customBreadcrumb,
  onBack,
  homeRoute = "/",
  homeLabel = "Trang chủ",
  breadcrumbSeparator = ">",
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hàm trích xuất text từ label (ReactNode hoặc string)
  const extractLabel = (label: string | React.ReactNode): string => {
    if (typeof label === "string") {
      return label;
    }
    // Nếu label là React component (ví dụ MenuLabelNumber) thì lấy prop text
    if (React.isValidElement<MenuLabelNumberProps>(label)) {
      if (label.props?.text) {
        return label.props.text;
      }
    }
    return "";
  };

  // ─── Tìm menu item khớp với một path ───────────────────────────────────
  const findMenuItemByPath = (
    items: AppMenuItem[],
    targetPath: string
  ): AppMenuItem | null => {
    for (const item of items) {
      if (item.path === targetPath) return item;
      if (item.children?.length) {
        const found = findMenuItemByPath(item.children, targetPath);
        if (found) return found;
      }
    }
    return null;
  };

  // ─── Auto-save search khi đứng ở route có haveSearch ──────────────────
  // Lưu ý: location.search trong TanStack Router là object (parsed), cần dùng location.searchStr để lấy chuỗi "?key=value"
  useEffect(() => {
    const currentItem = findMenuItemByPath(menuItems, location.pathname);
    if (currentItem?.haveSearch && currentItem.path) {
      const searchStr: string = (location as any).searchStr ?? "";
      persistSearch(currentItem.path, searchStr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, (location as any).searchStr, menuItems]);

  // Tạo danh sách breadcrumb dựa trên menu và đường dẫn hiện tại
  const breadcrumbItems = useMemo(() => {
    // Nếu có breadcrumb custom thì dùng luôn
    if (customBreadcrumb) {
      return customBreadcrumb;
    }

    const currentPath = location.pathname;

    type BreadcrumbTrail = Array<{ title: string; path?: string }>;

    // Exact match: tìm menu item khớp chính xác với targetKey
    const findExactMenuItem = (
      items: AppMenuItem[],
      targetKey: string,
      parentTrail: BreadcrumbTrail = []
    ): BreadcrumbTrail | null => {
      for (const item of items) {
        const itemLabel = extractLabel(item.label);
        if (item.key === targetKey) {
          return [...parentTrail, { title: itemLabel, path: item.path }];
        }
        if (item.children?.length) {
          const result = findExactMenuItem(item.children, targetKey, [
            ...parentTrail,
            { title: itemLabel, path: item.path },
          ]);
          if (result) return result;
        }
      }
      return null;
    };

    // Prefix match: tìm item.key là prefix của currentPath, lấy match dài nhất
    const findPrefixMenuItem = (
      items: AppMenuItem[],
      targetPath: string,
      parentTrail: BreadcrumbTrail = []
    ): { trail: BreadcrumbTrail; matchLength: number } | null => {
      let best: { trail: BreadcrumbTrail; matchLength: number } | null = null;

      for (const item of items) {
        const itemLabel = extractLabel(item.label);
        // Strip query string khi so sánh prefix
        const itemKey = item.key?.split("?")[0] ?? "";

        if (itemKey && targetPath.startsWith(itemKey)) {
          const trail = [
            ...parentTrail,
            { title: itemLabel, path: item.path },
          ];
          if (!best || itemKey.length > best.matchLength) {
            best = { trail, matchLength: itemKey.length };
          }
        }

        if (item.children?.length) {
          const childResult = findPrefixMenuItem(item.children, targetPath, [
            ...parentTrail,
            { title: itemLabel, path: item.path },
          ]);
          if (
            childResult &&
            (!best || childResult.matchLength > best.matchLength)
          ) {
            best = childResult;
          }
        }
      }

      return best;
    };

    // ===== BUILD breadcrumb gốc =====
    let breadcrumb: BreadcrumbTrail = [];

    // Ưu tiên exact match trước
    const exactTrail = findExactMenuItem(menuItems, currentPath);
    if (exactTrail?.length) {
      breadcrumb = [...exactTrail];
    } else {
      // Fallback: prefix matching (cho các route con không có trong menu)
      const prefixResult = findPrefixMenuItem(menuItems, currentPath);
      if (prefixResult?.trail.length) {
        breadcrumb = [...prefixResult.trail];
      }
    }

    // ===== THÊM HOME =====
    if (showHome) {
      breadcrumb.unshift({
        title: homeLabel,
        path: homeRoute,
      });
    }

    return breadcrumb;
  }, [
    location.pathname,
    customBreadcrumb,
    menuItems,
    homeRoute,
    homeLabel,
    showHome,
  ]);

  // Xử lý nút quay lại
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  // ─── Navigate khi click breadcrumb ────────────────────────────────────
  const handleBreadcrumbClick = (path: string) => {
    const menuItem = findMenuItemByPath(menuItems, path);
    if (menuItem?.haveSearch) {
      const savedSearch = getPersistedSearch(path); // dạng "?thuTucId=135"
      if (savedSearch) {
        // Parse searchStr thành object để truyền cho TanStack Router
        // Các giá trị số phải là number (không phải string) để tránh bị wrap dấu nháy khi serialize
        const params: Record<string, string | number> = {};
        new URLSearchParams(savedSearch.replace(/^\?/, "")).forEach((val, key) => {
          const num = Number(val);
          params[key] = !isNaN(num) && val.trim() !== "" ? num : val;
        });
        navigate({ to: path, search: params as any });
      } else {
        navigate({ to: path });
      }
    } else {
      navigate({ to: path });
    }
  };

  return (
    <PageWrapper>
      {/* Header + Breadcrumb */}
      {showBreadcrumb && (
        <Header>
          {/* Nút quay lại */}
          {showNavButtons && (
            <Space size={8}>
              <BackButton
                type="text"
                icon={<ArrowLeftOutlined />}
                size="small"
                onClick={handleBack}
                title="Quay lại"
              />
            </Space>
          )}

          {/* Breadcrumb */}
          <StyledBreadcrumb
            separator={breadcrumbSeparator}
            items={breadcrumbItems.map((item, index) => ({
              title:
                index === 0 &&
                item.path === homeRoute &&
                item.title === homeLabel ? (
                  <HomeItem
                    clickable={!!item.path}
                    onClick={() =>
                      item.path && navigate({ to: item.path })
                    }
                  >
                    <HomeOutlined />
                    {item.title}
                  </HomeItem>
                ) : item.path ? (
                  <LinkItem
                    onClick={() => handleBreadcrumbClick(item.path!)}
                  >
                    {item.title}
                  </LinkItem>
                ) : (
                  <CurrentItem>{item.title}</CurrentItem>
                ),
            }))}
          />
        </Header>
      )}

      {/* Nội dung trang */}
      <PageContent>{children}</PageContent>
    </PageWrapper>
  );
};
