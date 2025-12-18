"use client";

import { useRef, ElementType, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SlideIn = ({
  as: Component = "section",
  children,
  className,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
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
    });
  });

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
};

export default SlideIn;
