import React from "react";

const SvgLogoWhite = props => (
  <svg width={181} height={26} {...props}>
    <defs>
      <style>
        {
          ".logo_white_svg__b{fill:none;stroke:#fff;stroke-linecap:round;opacity:.5}"
        }
      </style>
    </defs>
    <text
      transform="translate(43 21)"
      fontSize={18}
      fontFamily="MalgunGothicBold,Malgun Gothic"
      fill="none"
      stroke="#fff"
    >
      <tspan x={0} y={0}>
        {"S O S E D I"}
      </tspan>
    </text>
    <path className="logo_white_svg__b" d="M21.5 14.5H.5M180.5 14.5h-21" />
  </svg>
);

export default SvgLogoWhite;
