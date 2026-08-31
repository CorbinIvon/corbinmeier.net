
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useCoarsePointer } from "@/hooks/useCoarsePointer";

export default function BackgroundMotion() {
  const isCoarsePointer = useCoarsePointer();
  const { scrollYProgress } = useScroll();

  // Create smooth parallax values
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), { stiffness: 50, damping: 20 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -300]), { stiffness: 50, damping: 20 });
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), { stiffness: 50, damping: 20 });

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Soft gradient blobs - desktop only. Three scroll-animated 100-150px
          blur layers at phone DPR overrun iOS Safari's compositing budget and
          blank the page; see useCoarsePointer. */}
      {!isCoarsePointer && (
        <>
          <motion.div
            style={{ y: y1 }}
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px]"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[150px]"
          />
          <motion.div
            style={{ y: y3 }}
            className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px]"
          />
        </>
      )}

      {/* Subtle grid pattern - same viewport-anchored grid as the homepage
          hero (blueprint-bg), so it's continuous across every page. */}
      <div className="absolute inset-0 opacity-40 blueprint-bg" />
    </div>
  );
}
