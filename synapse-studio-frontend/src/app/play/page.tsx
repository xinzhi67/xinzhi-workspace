"use client";

import { Suspense, useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./play.module.css";

gsap.registerPlugin(useGSAP);

const SCENES = [
  { key: "geometry", label: "几何演示", desc: "基础 3D 几何体旋转展示", vertices: "2,048", faces: "1,024", material: "PBR 标准" },
  { key: "skeleton", label: "骨骼动画", desc: "glTF 骨骼模型 + 动画轨道", vertices: "4,352", faces: "2,180", material: "蒙皮网格" },
  { key: "particle", label: "粒子效果", desc: "GPU 粒子系统 + 色彩混合", vertices: "300", faces: "-", material: "点精灵" },
  { key: "lighting", label: "光照测试", desc: "多点光源轨道 + PBR 反射", vertices: "4,096", faces: "4,096", material: "高光金属" },
  { key: "material", label: "材质预览", desc: "粗糙度/金属度参数对比", vertices: "15,360", faces: "7,680", material: "PBR 材质" },
] as const;

type SceneKey = (typeof SCENES)[number]["key"];

const SceneComponents: Record<SceneKey, React.ComponentType> = {
  geometry: dynamic(() => import("./scenes/GeometryScene"), { ssr: false }),
  skeleton: dynamic(() => import("./scenes/SkeletonScene"), { ssr: false }),
  particle: dynamic(() => import("./scenes/ParticleScene"), { ssr: false }),
  lighting: dynamic(() => import("./scenes/LightingScene"), { ssr: false }),
  material: dynamic(() => import("./scenes/MaterialScene"), { ssr: false }),
};

export default function PlayPage() {
  const [activeScene, setActiveScene] = useState<SceneKey>("geometry");
  const sceneData = SCENES.find((s) => s.key === activeScene)!;

  const viewportRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLElement>(null);
  const rightPanelRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const sceneContentRef = useRef<HTMLDivElement>(null);
  const valRefs = useRef<Map<string, HTMLSpanElement>>(new Map());

  /* GSAP: 面板入场动画 */
  useGSAP(() => {
    gsap.from(leftPanelRef.current, { x: -40, opacity: 0, duration: 0.6, ease: "power3.out" });
    gsap.from(rightPanelRef.current, { x: 40, opacity: 0, duration: 0.6, ease: "power3.out", delay: 0.1 });
    gsap.from(sceneContentRef.current, { scale: 0.96, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.15 });
  }, []);

  /* GSAP: 场景切换动画 */
  const switchScene = useCallback((key: SceneKey) => {
    if (key === activeScene) return;
    const tl = gsap.timeline();
    // 旧场景淡出
    tl.to(sceneContentRef.current, {
      scale: 0.95, opacity: 0, duration: 0.2, ease: "power2.in",
      onComplete: () => setActiveScene(key),
    });
    // 新场景淡入
    tl.to(sceneContentRef.current, {
      scale: 1, opacity: 1, duration: 0.35, ease: "power2.out",
    }, "+=0.05");
    // 属性面板数值动画（延迟到场景加载后）
    tl.call(() => animatePropertyValues(), undefined, "+=0.1");
  }, [activeScene]);

  /* GSAP: 属性数值跳动 */
  const animatePropertyValues = useCallback(() => {
    valRefs.current.forEach((el) => {
      gsap.from(el, { scale: 1.15, color: "#635BFF", duration: 0.3, ease: "power2.out" });
      setTimeout(() => {
        gsap.to(el, { color: "var(--color-text)", duration: 0.5 });
      }, 300);
    });
  }, []);

  /* GSAP: 场景项悬停 */
  const handleItemEnter = useCallback((el: HTMLDivElement) => {
    gsap.to(el, { x: 4, duration: 0.2, ease: "power2.out" });
  }, []);

  const handleItemLeave = useCallback((el: HTMLDivElement) => {
    gsap.to(el, { x: 0, duration: 0.2, ease: "power2.out" });
  }, []);

  /* GSAP: 场景项点击波纹 */
  const handleItemClick = useCallback((key: SceneKey, el: HTMLDivElement) => {
    gsap.fromTo(el, { scale: 1 }, { scale: 0.94, duration: 0.08, yoyo: true, repeat: 1, ease: "power2.inOut" });
    switchScene(key);
  }, [switchScene]);

  const ActiveScene = SceneComponents[activeScene];

  return (
    <div className={styles.workspace}>
      {/* Left Panel: Scene List */}
      <aside ref={leftPanelRef} className={styles.leftPanel}>
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>场景列表</span>
          <button className={styles.addBtn}>+</button>
        </div>
        <div className={styles.sceneList}>
          {SCENES.map((s) => (
            <div
              key={s.key}
              ref={(el) => { if (el) itemRefs.current.set(s.key, el); }}
              className={`${styles.sceneItem} ${activeScene === s.key ? styles.sceneItemActive : ""}`}
              onClick={() => handleItemClick(s.key, itemRefs.current.get(s.key)!)}
              onMouseEnter={(e) => handleItemEnter(e.currentTarget)}
              onMouseLeave={(e) => handleItemLeave(e.currentTarget)}
            >
              <div className={styles.sceneThumb} />
              <div className={styles.sceneInfo}>
                <span className={styles.sceneName}>{s.label}</span>
                <span className={styles.sceneDesc}>{s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Center: 3D Viewport */}
      <div ref={viewportRef} className={styles.viewport}>
        <div ref={sceneContentRef} className={styles.sceneContent}>
          <Suspense fallback={
            <div className={styles.loadingFallback}>
              <div className={styles.loadingSpinner} />
              <span>加载场景中...</span>
            </div>
          }>
            <ActiveScene />
          </Suspense>
        </div>
        <div className={styles.viewportOverlay}>
          <span className={styles.scenePath}>/ {sceneData.label}</span>
          <span className={styles.hintText}>拖拽旋转 · 滚轮缩放 · 右键平移</span>
        </div>
      </div>

      {/* Right Panel: Properties */}
      <aside ref={rightPanelRef} className={styles.rightPanel}>
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>属性</span>
        </div>
        <div className={styles.propsBody}>
          <div className={styles.propGroup}>
            <span className={styles.propLabel}>场景名称</span>
            <div className={styles.propRow}>
              <span ref={(el) => { if (el) valRefs.current.set("name", el); }} className={styles.propVal}>{sceneData.label}</span>
            </div>
          </div>
          <div className={styles.propGroup}>
            <span className={styles.propLabel}>描述</span>
            <div className={styles.propRow}>
              <span className={styles.propVal}>{sceneData.desc}</span>
            </div>
          </div>
          <div className={styles.propGroup}>
            <span className={styles.propLabel}>顶点数</span>
            <div className={styles.propRow}>
              <span ref={(el) => { if (el) valRefs.current.set("vertices", el); }} className={styles.propVal}>{sceneData.vertices}</span>
            </div>
          </div>
          <div className={styles.propGroup}>
            <span className={styles.propLabel}>三角面</span>
            <div className={styles.propRow}>
              <span ref={(el) => { if (el) valRefs.current.set("faces", el); }} className={styles.propVal}>{sceneData.faces}</span>
            </div>
          </div>
          <div className={styles.propGroup}>
            <span className={styles.propLabel}>材质类型</span>
            <div className={styles.propRow}>
              <span ref={(el) => { if (el) valRefs.current.set("material", el); }} className={styles.propVal}>{sceneData.material}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
