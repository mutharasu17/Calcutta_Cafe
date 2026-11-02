"use client";

import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register plugins once in browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    DrawSVGPlugin,
    MorphSVGPlugin,
    MotionPathPlugin,
    ScrollTrigger,
    SplitText
  );
}

export {
  gsap,
  DrawSVGPlugin,
  MorphSVGPlugin,
  MotionPathPlugin,
  ScrollTrigger,
  SplitText,
};
