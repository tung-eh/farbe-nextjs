"use client";

import { useRef, createElement, JSX } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

type SlideInProps<T extends keyof JSX.IntrinsicElements> = {
  as?: T;
  scrollTrigger?: ScrollTrigger.Vars;
} & Omit<JSX.IntrinsicElements[T], "ref">;

const SlideIn = <T extends keyof JSX.IntrinsicElements = "section">({
  as,
  scrollTrigger,
  ...props
}: SlideInProps<T>) => {
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

  // eslint-disable-next-line react-hooks/refs
  return createElement(as ?? "section", {
    ref,
    ...props,
  });
};

export default SlideIn;
