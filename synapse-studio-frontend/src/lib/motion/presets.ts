import gsap from "gsap";

/** 主内容区路由切换后的轻量入场 */
export function animateMainEnter(
  el: HTMLElement | null,
  opts?: { duration?: number },
) {
  if (!el) return;
  gsap.fromTo(
    el,
    { opacity: 0, y: 10 },
    {
      opacity: 1,
      y: 0,
      duration: opts?.duration ?? 0.35,
      ease: "power2.out",
    },
  );
}

/** 卡片网格入场（工作台首页） */
export function staggerCards(
  container: HTMLElement | null,
  selector = "[data-hub-card]",
) {
  if (!container) return;
  const cards = container.querySelectorAll(selector);
  if (!cards.length) return;
  gsap.fromTo(
    cards,
    { opacity: 0, y: 16 },
    {
      opacity: 1,
      y: 0,
      duration: 0.45,
      stagger: 0.08,
      ease: "power2.out",
    },
  );
}
