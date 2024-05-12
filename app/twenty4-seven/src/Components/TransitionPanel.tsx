import React from "react";
import { ReactComponent as LogoDark } from "../Assets/LogoWebDark.svg";
import { ReactComponent as LogoLight } from "../Assets/LogoWebLight.svg";
import { useTheme } from "../Utils/ThemeContext";

interface TransitionPanelProps {
  isPanelOpen: boolean;
}

const TransitionPanel: React.FC<TransitionPanelProps> = ({ isPanelOpen }) => {
  const { theme } = useTheme();
  const LogoComponent = theme === "dark" ? LogoDark : LogoLight;

  return (
    <div
      id="panelSlide"
      className={`absolute h-full w-1/2 z-10 bg-light_border dark:bg-dark_border ${
        isPanelOpen
          ? "translate-x-0 rounded-r-full"
          : "translate-x-[100%] rounded-l-full"
      } transition-all duration-500 ease-in-out
          flex flex-col items-center justify-center gap-4`}
    >
      <div className="dark:text-txtWhite font-semibold text-4xl">Twenty4/7</div>
      <LogoComponent style={{ width: "124px", height: "124px" }} />
      <div className="mt-8 dark:text-txtWhite text-2xl">
        The E-commerce website for influencers
      </div>
    </div>
  );
};

export default TransitionPanel;
