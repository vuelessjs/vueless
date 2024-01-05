const Indonesian = {
  weekdays: {
    shorthand: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
    longhand: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
  },
  months: {
    shorthand: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    longhand: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
  },
  firstDayOfWeek: 1,
  ordinal: () => "",
  time24hr: true,
  rangeSeparator: " - ",
};

export default Indonesian;
export { Indonesian };
