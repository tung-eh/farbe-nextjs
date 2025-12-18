"use client";

import { useRef, ElementType, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const SlideIn = ({
  as: Component = "section",
  children,
  className,
  scrollTrigger,
  ...props
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  scrollTrigger?: ScrollTrigger.Vars;
} & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: `data-${string}`]: any;
}) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(ref.current.children, {
      opacity: 0,
      y: 50,
      delay: 0.3,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom-=25%",
        ...scrollTrigger,
      },
    });
  });

  return (
    <Component ref={ref} className={className} {...props}>
      {children}
    </Component>
  );
};

export default SlideIn;
