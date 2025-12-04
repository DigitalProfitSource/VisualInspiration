import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface SlotCounterProps {
  value: string;
  className?: string;
}

function SlotDigit({ digit, delay = 0 }: { digit: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px", amount: 0.5 });
  
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        springValue.set(1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      springValue.set(0);
    }
  }, [isInView, springValue, delay]);

  const isNumber = !isNaN(parseInt(digit));
  
  if (!isNumber) {
    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: delay / 1000 }}
        className="inline-block"
      >
        {digit}
      </motion.span>
    );
  }

  const targetNum = parseInt(digit);
  const displayValue = useTransform(springValue, [0, 1], [0, targetNum]);

  return (
    <div ref={ref} className="inline-block relative h-[1.2em] overflow-hidden">
      <motion.div
        className="flex flex-col items-center"
        style={{
          y: useTransform(displayValue, (v) => {
            const current = Math.round(v);
            return `-${current * 1.2}em`;
          }),
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <span key={num} className="h-[1.2em] flex items-center justify-center">
            {num}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function SlotCounter({ value, className = "" }: SlotCounterProps) {
  const characters = value.split("");
  
  return (
    <span className={`inline-flex items-baseline ${className}`}>
      {characters.map((char, index) => (
        <SlotDigit key={index} digit={char} delay={index * 80} />
      ))}
    </span>
  );
}

interface AnimatedMetricProps {
  value: string;
  suffix: string;
  description: string;
}

export function AnimatedMetric({ value, suffix, description }: AnimatedMetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px", amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const springProgress = useSpring(0, {
    stiffness: 50,
    damping: 20,
  });

  useEffect(() => {
    if (isInView) {
      springProgress.set(1);
      setHasAnimated(true);
    } else {
      springProgress.set(0);
    }
  }, [isInView, springProgress]);

  return (
    <div ref={ref} className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5">
      <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2 overflow-hidden">
        <SlotCounter value={value} />
        <motion.span 
          className="text-primary text-2xl ml-1"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          {suffix}
        </motion.span>
      </div>
      <motion.p 
        className="text-slate-500 text-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        {description}
      </motion.p>
    </div>
  );
}
