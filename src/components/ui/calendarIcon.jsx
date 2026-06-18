const CalendarIcon = ({ day, width = 25, height = 25, color = "#FDFDFD" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#calendarClip)">
        <path
          d="M15.8333 3.24561H4.16667C3.24619 3.24561 2.5 3.9721 2.5 4.86829V16.227C2.5 17.1232 3.24619 17.8497 4.16667 17.8497H15.8333C16.7538 17.8497 17.5 17.1232 17.5 16.227V4.86829C17.5 3.9721 16.7538 3.24561 15.8333 3.24561Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.333 1.62231V4.86767"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.66699 1.62231V4.86767"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text
          x="10"
          y="13"
          fontSize="8"
          textAnchor="middle"
          fill={color}
          fontFamily="Arial"
          fontWeight="bold"
        >
          {day}
        </text>
      </g>

      <defs>
        <clipPath id="calendarClip">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CalendarIcon;
