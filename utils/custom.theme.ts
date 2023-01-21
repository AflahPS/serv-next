import { PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CustomPalette {
    uiPrimary: PaletteColorOptions;
    uiSecondary: PaletteColorOptions;
    fontPrimary: PaletteColorOptions;
    uiBgLight: PaletteColorOptions;
    violet: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    uiPrimary: true;
    uiSecondary: true;
    fontPrimary: true;
    uiBgLight: true;
    violet: true;
  }
}
