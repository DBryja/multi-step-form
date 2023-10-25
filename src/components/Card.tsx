import { useRef, useEffect } from "react";
import { isMedium } from "../utils/utils";
import classNames from "classnames";

interface ICard {
  children: React.ReactNode;
  runAnim: any;
  className?: string;
}

export default function Card({ children, runAnim, className }: ICard) {
  const ref = useRef<HTMLDivElement>(null);
  const isMed = isMedium(window);
  useEffect(() => {
    ref.current?.animate(
      [
        { opacity: 0, transform: isMed ? "translateX(2px)" : "translateX(-48%)", offset: 0 },
        { opacity: 0, transform: isMed ? "translateX(2px)" : "translateX(-48%)", offset: 0.6 },
        { opacity: 1, transform: isMed ? "translateX(0)" : "translateX(-50%)", offset: 1 },
      ],
      { duration: isMed ? 300 : 500, iterations: 1 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runAnim]);

  const classes = classNames(
    "relative -top-24 left-1/2 -translate-x-1/2 w-[95%] bg-white p-4 pb-6 rounded-lg shadow-lg text-cblue-600 md:p-10 md:static md:translate-x-0 md:w-full md:shadow-none md:bg-transparent",
    className
  );
  return (
    <div className={classes} ref={ref}>
      {children}
    </div>
  );
}
