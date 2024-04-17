export default /*tw*/ {
  wrapper: "grid grid-rows-1 gap-4 md:gap-6 text-center",
  title: "text-base font-normal text-gray-900 mb-1 mt-3",
  description: "text-xs font-normal text-gray-500/[85]",
  radio: {
    base: "absolute right-4 top-2 !gap-0",
    label: "mr-1",
  },
  icon: "mb-3 flex justify-center",
  defaultVariants: {
    color: "brand",
    gridCols: 2,
    withIcon: true,
  },
  safelist: (colors) => [
    { pattern: `border-(${colors})-100`, variants: ["disabled"] },
    { pattern: `border-(${colors})-300` },
    { pattern: `border-(${colors})-400`, variants: ["hover"] },
    { pattern: `border-(${colors})-500`, variants: ["focus", "active"] },
    { pattern: `text-(${colors})-500` },
    { pattern: `bg-(${colors})-100`, variants: ["disabled"] },
    { pattern: `bg-(${colors})-500`, variants: ["focus"] },
    { pattern: `ring-(${colors})-200`, variants: ["focus"] },
  ],
};
