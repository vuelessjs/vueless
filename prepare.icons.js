import { copyIcons } from "@vueless/plugin-vite/services/iconLoader.service.js";

/* Copy SVG icons from the default icon library into assets folder. */
copyIcons("vuelessIcons", "vueless");
