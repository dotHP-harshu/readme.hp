import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import TextPlugin from "gsap/TextPlugin";
import { useRef } from "react";

gsap.registerPlugin(MorphSVGPlugin, TextPlugin);

const SPARKLE_PATH = `
M 31.2344 54.7305
C 31.8438 54.7305 32.2891 54.2852 32.4062 53.6524
C 34.0703 40.8086 35.8750 38.8633 48.5781 37.4570
C 49.2344 37.3867 49.6797 36.8945 49.6797 36.2852
C 49.6797 35.6758 49.2344 35.2070 48.5781 35.1133
C 35.8750 33.7070 34.0703 31.7617 32.4062 18.9180
C 32.2891 18.2852 31.8438 17.8633 31.2344 17.8633
C 30.6250 17.8633 30.1797 18.2852 30.0860 18.9180
C 28.4219 31.7617 26.5938 33.7070 13.9140 35.1133
C 13.2344 35.2070 12.7891 35.6758 12.7891 36.2852
C 12.7891 36.8945 13.2344 37.3867 13.9140 37.4570
C 26.5703 39.1211 28.3281 40.8321 30.0860 53.6524
C 30.1797 54.2852 30.6250 54.7305 31.2344 54.7305
Z
`;

function ReadmeGenLoader() {
  const svgRef = useRef<SVGSVGElement>(null);
  const paraRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (svgRef.current === null || paraRef.current === null) return;
    const svgPath = svgRef.current.querySelector("path") as SVGPathElement;

    const typingEl = paraRef.current.querySelector(
      ".typing-text",
    ) as HTMLSpanElement;

    // Sparkle morph
    gsap.from(svgPath, {
      duration: 2,
      morphSVG: SPARKLE_PATH,
      rotation: 180,
      transformOrigin: "50% 50%",
      ease: "power3.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.from(typingEl, {
      text: "",
      repeat: -1,
      duration: 2,
      ease: "power3.inOut",
      yoyo: true,
    });
  });

  return (
    <div className="flex justify-center items-center w-fit h-fit flex-col p-[4vw]">
      <div className=" flex justify-center items-center w-fit h-fit">
        <span className="font-mono text-5xl tracking-tight max-xs:text-xl">
          readme
        </span>
        <div className="w-10 h-10 max-xs:w-5 max-xs:h-5">
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 60 60"
            className="translate-y-2"
          >
            <path
              id="shape"
              fill="#25aff3"
              d="
      M30 5
      C44 5 55 16 55 30
      C55 44 44 55 30 55
      C16 55 5 44 5 30
      C5 16 16 5 30 5
      Z
    "
            />
          </svg>
        </div>
        <span className="italic font-bold tracking-tight text-5xl max-xs:text-xl">
          hp
        </span>
      </div>
      <p
        ref={paraRef}
        className="mt-2 text-text-muted-light dark:text-text-muted-dark text-sm text-center min-h-40 flex justify-center items-center"
      >
        <span className="typing-text max-xs:text-xs">
          Generating Readme. It may take time....
        </span>
        <span className="cursor w-1 h-full bg-white ml-2"></span>
      </p>
    </div>
  );
}

export default ReadmeGenLoader;
