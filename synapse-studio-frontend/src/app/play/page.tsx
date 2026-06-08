import { PlayClient } from "./PlayClient";
import styles from "./play.module.css";

const SCENES = [
  "几何演示",
  "骨骼动画",
  "粒子效果",
  "光照测试",
  "材质预览",
];

export default function PlayPage() {
  return (
    <div className={styles.workspace}>
      {/* Left Panel: Scene List */}
      <aside className={styles.leftPanel}>
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>场景列表</span>
          <button className={styles.addBtn}>+</button>
        </div>
        <div className={styles.sceneList}>
          {SCENES.map((name, i) => (
            <div
              key={name}
              className={`${styles.sceneItem} ${i === 0 ? styles.sceneItemActive : ""}`}
            >
              <div className={styles.sceneThumb} />
              <span className={styles.sceneName}>{name}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Center: 3D Viewport */}
      <div className={styles.viewport}>
        <PlayClient />
        <div className={styles.viewportOverlay}>
          <span className={styles.scenePath}>/ 几何演示</span>
        </div>
      </div>

      {/* Right Panel: Properties */}
      <aside className={styles.rightPanel}>
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>属性</span>
        </div>
        <div className={styles.propsBody}>
          <div className={styles.propGroup}>
            <span className={styles.propLabel}>位置</span>
            <div className={styles.propRow}>
              <span className={styles.propVal}>X: 0</span>
              <span className={styles.propVal}>Y: 0</span>
              <span className={styles.propVal}>Z: 0</span>
            </div>
          </div>
          <div className={styles.propGroup}>
            <span className={styles.propLabel}>旋转</span>
            <div className={styles.propRow}>
              <span className={styles.propVal}>X: 0°</span>
              <span className={styles.propVal}>Y: 0°</span>
              <span className={styles.propVal}>Z: 0°</span>
            </div>
          </div>
          <div className={styles.propGroup}>
            <span className={styles.propLabel}>缩放</span>
            <div className={styles.propRow}>
              <span className={styles.propVal}>1.0</span>
            </div>
          </div>
          <div className={styles.propGroup}>
            <span className={styles.propLabel}>材质</span>
            <div className={styles.propRow}>
              <span className={styles.propVal}>标准</span>
            </div>
          </div>
        </div>
        <div className={styles.stats}>
          <span className={styles.statItem}>顶点: 2,048</span>
          <span className={styles.statItem}>三角面: 1,024</span>
          <span className={styles.statItem}>FPS: 60</span>
        </div>
      </aside>
    </div>
  );
}
