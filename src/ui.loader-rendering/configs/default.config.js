export default /*tw*/ {
  wrapper: "",
  loader: `
    flex justify-center items-center fixed left-0 top-0 z-[9999] h-screen w-screen bg-gray-800 
    transition-all duration-300"
  `,
  ripple: "relative h-40 w-40 ml-auto mr-auto",
  rippleElement: "absolute opacity-100 rounded-full border-4 border-solid border-white",
  transition: {
    enterFromClass: "scale-110 transform",
    leaveActiveClass: "scale-110 transform",
  },
};
