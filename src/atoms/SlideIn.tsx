"use client";

import { useState, useRef, createElement, JSX } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { twMerge } from "tailwind-merge";

gsap.registerPlugin(ScrollTrigger);

type SlideInProps<T extends keyof JSX.IntrinsicElements> = {
  as?: T;
  scrollTrigger?: ScrollTrigger.Vars;
  className?: string;
} & Omit<JSX.IntrinsicElements[T], "ref">;

const SlideIn = <T extends keyof JSX.IntrinsicElements = "section">({
  as,
  scrollTrigger,
  className,
  ...props
}: SlideInProps<T>) => {
  const ref = useRef<HTMLElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useGSAP(() => {
    if (!ref.current) return;

    setIsAnimated(false);

    gsap.to(ref.current.children, {
      opacity: 1,
      y: 0,
      delay: 0.3,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom-=25%",
        ...scrollTrigger,
      },
      onComplete: () => setIsAnimated(true),
    });
  }, [ref.current?.children]); // eslint-disable-line react-hooks/refs

  // eslint-disable-next-line react-hooks/refs
  return createElement(as ?? "section", {
    ref,
    className: twMerge(
      !isAnimated && "[&>*]:opacity-0 [&>*]:translate-y-[50px]",
      className,
    ),
    ...props,
  });
};

export default SlideIn;
