import router from "@/Route";
import { RouterProvider } from "@tanstack/react-router";
import { getZoomRatio } from "@utils/getZoomRatio";
import { useLayoutEffect } from "react";

function App() {
  //Auto zoom to fit the screen - chỉ áp dụng trên desktop lớn (1400px-1920px)
  // Tablet và laptop nhỏ (< 1400px) không dùng zoom để font-size giữ nguyên
  useLayoutEffect(() => {
    const viewportWidth =
      window.innerWidth || window.document.documentElement.clientWidth;
    const isMobile = viewportWidth < 768;

    if (!isMobile) {
      // getZoomRatio tự handle: screen width + OS scale (devicePixelRatio) compensation
      const zoom = getZoomRatio();
      document.documentElement.style.setProperty("--zoom", zoom.toString());
    } else {
      document.documentElement.style.setProperty("--zoom", "1");
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
