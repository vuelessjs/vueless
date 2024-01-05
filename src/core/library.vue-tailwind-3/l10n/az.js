const Azerbaijan = {
  weekdays: {
    shorthand: ["B.", "B.e.", "Ç.a.", "Ç.", "C.a.", "C.", "Ş."],
    longhand: [
      "Bazar",
      "Bazar ertəsi",
      "Çərşənbə axşamı",
      "Çərşənbə",
      "Cümə axşamı",
      "Cümə",
      "Şənbə",
    ],
  },
  months: {
    shorthand: ["Yan", "Fev", "Mar", "Apr", "May", "İyn", "İyl", "Avq", "Sen", "Okt", "Noy", "Dek"],
    longhand: [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "İyun",
      "İyul",
      "Avqust",
      "Sentyabr",
      "Oktyabr",
      "Noyabr",
      "Dekabr",
    ],
  },
  firstDayOfWeek: 1,
  ordinal: () => ".",
  rangeSeparator: " - ",
  weekAbbreviation: "Hf",
  amPM: ["GƏ", "GS"],
  time24hr: true,
};

export default Azerbaijan;
export { Azerbaijan };
