import section from "../page-section.module.css";
import { PlayClient } from "./PlayClient";

export default function PlayPage() {
  return (
    <>
      <h1 className={section.title}>娱乐空间</h1>
      <p className={section.subtitle}>
        Three.js + React Three Fiber：加载 glTF 骨骼模型并播放可用动画轨道。需要网络以拉取
        CDN 模型；离线请将资源放入 `public/models/` 并修改 `PlayCanvas.tsx` 中的 URL。
      </p>
      <PlayClient />
    </>
  );
}
