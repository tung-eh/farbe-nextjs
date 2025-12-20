"use client";

import { useRef, ElementType, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

type SlideInProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  scrollTrigger?: ScrollTrigger.Vars;
} & React.ComponentPropsWithoutRef<T>;

const SlideIn = <T extends ElementType = "section">({
  as,
  children,
  className,
  scrollTrigger,
  ...props
}: SlideInProps<T>) => {
  const ref = useRef<HTMLElement>(null);
  const Component: ElementType = as ?? "section";

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
