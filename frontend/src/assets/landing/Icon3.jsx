import React from "react";

const Icon3 = ({color}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
    >
      <path
        d="M61.1667 37.8333H37.8334V61.1666H61.1667V37.8333ZM15.9584 2.83331L29.0834 26.1666H2.83337L15.9584 2.83331ZM49.5 26.1666C52.5942 26.1666 55.5617 24.9375 57.7496 22.7496C59.9375 20.5616 61.1667 17.5942 61.1667 14.5C61.1667 11.4058 59.9375 8.43832 57.7496 6.2504C55.5617 4.06248 52.5942 2.83331 49.5 2.83331C46.4058 2.83331 43.4384 4.06248 41.2505 6.2504C39.0625 8.43832 37.8334 11.4058 37.8334 14.5C37.8334 17.5942 39.0625 20.5616 41.2505 22.7496C43.4384 24.9375 46.4058 26.1666 49.5 26.1666Z"
        stroke={color}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M2.83337 37.8333L26.1667 61.1666M26.1667 37.8333L2.83337 61.1666"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Icon3;
