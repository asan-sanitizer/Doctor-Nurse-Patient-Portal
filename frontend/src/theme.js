// theme.js
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  components: {
    Divider: {
      sizes: {
        xl: {
          h: "1.2px",
          px: "32px",
        },
      },
      },
    },
  },
);

export default theme;