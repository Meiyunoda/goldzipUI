import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { createBreakpoints, mode } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});


const textTheme = {
  Text: {
    // 1. We can update the base styles
    baseStyle: ({ colorMode }) => ({
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "27px",
      color: (colorMode === "dark") ? "white" : "black"
    }),
    // 2. We can add a new button size or extend existing
    sizes: {
      xl: {
        h: "56px",
        fontSize: "lg",
        px: "32px",
      },
    },
    // 3. We can add a new visual variant
    variants: {
      "gold-title": {
        // fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: { base: '38px', md: "47px" },
        lineHeight: { base: '40px', md: "55px" },
        /* identical to box height */
        color: "gold",
      },
      "bold": {
        fontSize: { base: '28px', md: '35px' },
        fontWeight: 700,
        lineHeight: { base: '40px', md: '50px' },
      }
      // 4. We can override existing variants
      // solid: (props) => ({
      //   bg: props.colorMode === "dark" ? "red.300" : "red.500",
      // }),
    },
  }
};

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        background: mode("white", "black")(props),
        bg: mode("white", "black")(props),
        color: mode("black", "white")(props),
      },
    }),
  },

  colors: {
    black: '#16161D',
    gold: '#E2C16C',
    white: "#F7F8F8"
  },
  // fonts: {
  //   body: "system-ui, sans-serif",
  //   heading: "Georgia, serif",
  //   mono: "Menlo, monospace",
  // },
  breakpoints,

  config,

  components: { ...textTheme }
})

export default theme;
