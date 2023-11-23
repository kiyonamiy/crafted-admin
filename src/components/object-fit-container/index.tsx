import { useCallback, useEffect, useRef, useState } from "react";

interface ParentSizeScalerProps {
  children: React.ReactNode;
}

/**
 * 作用：等比例缩放“子元素”至“父元素”宽高，与 object-fit: contain 效果类似，参考 https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
 * 将该容器放置在目标父元素和目标子元素之间（直接相连，要求双方都有宽度和高度）
 */
export const ObjectFitContainer = ({ children }: ParentSizeScalerProps) => {
  const containerRef = useRef<HTMLDivElement>(null); // 获取父元素宽高（设置 width 100% 与父元素保持同等宽）
  const childrenContainerRef = useRef<HTMLDivElement>(null); // 获取子元素原本宽高
  const childrenContainerInitialSizeRef = useRef<{
    width: number;
    height: number;
  }>(); // 解决监听窗口变化时子元素宽高改变的问题（否则就会拿着上一次的比例来算，比例会计算错误）

  const [scale, setScale] = useState(1);
  const resize = useCallback(() => {
    if (
      containerRef.current == null ||
      childrenContainerInitialSizeRef.current == null
    ) {
      return;
    }
    const containerRectInfo = containerRef.current.getBoundingClientRect();
    const scaleWidth =
      containerRectInfo.width / childrenContainerInitialSizeRef.current.width;
    const scaleHeight =
      containerRectInfo.height / childrenContainerInitialSizeRef.current.height;
    let scale = Math.min(scaleWidth, scaleHeight);
    if (scale === 0) {
      if (scaleWidth != 0) {
        scale = scaleWidth;
      }
      if (scaleHeight != 0) {
        scale = scaleHeight;
      }
      // 重新撑起父元素宽度高度
      if (scale != 0) {
        containerRef.current.style.width = `${Math.abs(
          childrenContainerInitialSizeRef.current.width * scale,
        )}px`;
        containerRef.current.style.height = `${Math.abs(
          childrenContainerInitialSizeRef.current.height * scale,
        )}px`;
      }
    }
    setScale(scale);
  }, []);

  useEffect(() => {
    if (containerRef.current == null) {
      return;
    }
    // 记录 children 的初始宽高
    if (childrenContainerRef.current != null) {
      const scaleContainerRectInfo =
        childrenContainerRef.current.getBoundingClientRect();
      childrenContainerInitialSizeRef.current = {
        width: scaleContainerRectInfo.width,
        height: scaleContainerRectInfo.height,
      };
    }
    //初始化自适应
    resize();
    const resizeObserver = new ResizeObserver(() => {
      // 如果父元素宽高发生变化，则相应缩放
      resize();
    });
    // 监听目标元素
    resizeObserver.observe(containerRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="object-fit-container" ref={containerRef}>
      <div
        className="scale-container"
        ref={childrenContainerRef}
        style={{
          ["--transform" as never]: `scale(${scale}) translate(-50%, -50%)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
