const paths = {
  "arrow-up-right": "M5 19 19 5M5 5h14v14",
  "arrow-down-right": "m5 5 14 14M5 19h14V5",
  "arrow-up": "M12 20V4m-7 7 7-7 7 7",
  "arrow-down": "M12 4v16m-7-7 7 7 7-7",
  asterisk: "M12 2v20M2 12h20M5 5l14 14M5 19 19 5",
  plus: "M12 4v16M4 12h16",
  minus: "M4 12h16",
  check: "m4 12 5 5L20 6",
};

// Draw decorative symbols instead of relying on each device's emoji font.
export default function Icon({ name }) {
  return (
    <svg
      class="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={name === "asterisk" ? 2.8 : 1.8}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
