import { PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CustomPalette {
    uiPrimary: PaletteColorOptions;
    uiSecondary: PaletteColorOptions;
    fontPrimary: PaletteColorOptions;
    steelBlue: PaletteColorOptions;
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
    steelBlue: true;
    violet: true;
  }
}
