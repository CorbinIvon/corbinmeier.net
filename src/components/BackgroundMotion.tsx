
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundMotion() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Create smooth parallax values
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), { stiffness: 50, damping: 20 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -300]), { stiffness: 50, damping: 20 });
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Soft gradient blobs */}
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
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150" />
      <div className="absolute inset-0 bg-grid-slate-900/[0.02] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.02]" />
    </div>
  );
}
