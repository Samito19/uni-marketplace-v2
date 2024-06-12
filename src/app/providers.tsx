"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from '@chakra-ui/react'


const breakpoints = {
  base: '0px',
  sm: '640px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}

// 3. Extend the theme
const theme = extendTheme({ breakpoints })

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
