// theme.ts
import { theme as chakraTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools';
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const fonts = {
    ...chakraTheme.fonts,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    heading: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
}

const styles = {
  global: () => ({
    body: {
      color: '#000',
      bg: '#2b316d',
    },
  }),
};

// extend the theme
const customTheme = extendTheme({ config, fonts, styles });

export default customTheme;