import { useReducedMotion, type Variants, type Transition } from "framer-motion";

export interface MotionConfig {
  prefersReducedMotion: boolean;
  fadeUpVariants: Variants;
  staggerContainer: Variants;
  defaultTransition: Transition;
  sectionReveal: {
    initial: { opacity: number; y: number };
    whileInView: { opacity: number; y: number };
    viewport: { once: boolean; margin: string };
    transition: Transition;
  };
}

export const useMotionConfig = (): MotionConfig => {
  const reduced = useReducedMotion();
  const prefersReducedMotion = Boolean(reduced);

  const defaultTransition: Transition = {
    duration: prefersReducedMotion ? 0 : 0.45,
    ease: [0.16, 1, 0.3, 1],
  };

  const fadeUpVariants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: defaultTransition,
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  const sectionReveal = {
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 24,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      margin: "-60px",
    },
    transition: defaultTransition,
  };

  return {
    prefersReducedMotion,
    fadeUpVariants,
    staggerContainer,
    defaultTransition,
    sectionReveal,
  };
};

export default useMotionConfig;