import React from "react";

const SvgLogoBlue = props => (
  <svg width={181} height={26} {...props}>
    <defs>
      <style>
        {
          ".logo_blue_svg__b{fill:none;stroke:#367a7a;stroke-linecap:round;opacity:.5}"
        }
      </style>
    </defs>
    <text
      transform="translate(43 21)"
      fontSize={18}
      fontFamily="MalgunGothicBold,Malgun Gothic"
      fill="none"
      stroke="#367a7a"
    >
      <tspan x={0} y={0}>
        {"S O S E D I"}
      </tspan>
    </text>
    <path className="logo_blue_svg__b" d="M21.5 14.5H.5M180.5 14.5h-21" />
  </svg>
);

export default SvgLogoBlue;
