const palette = {
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    600: "#4B5563",
    800: "#1F2937",
    900: "#111827",
  },
  red: {
    100: "#F8D7DA",
    500: "#EA868F",
    700: "#842029",
    900: "#2C0B0E",
  },
  green: {
    100: "#D1E7DD",
    500: "#75B798",
    700: "#0F5132",
    900: "#051B11",
  },
  yellow: {
    100: "#FFF3CD",
    500: "#FFDA6A",
    700: "#664D03",
    900: "#332701",
  },
  blue: {
    100: "#cce5ffff",
    500: "#6EA8FE",
    700: "#084298",
    900: "#031633",
  },
}

export interface ITheme {
  image: {
    invert: number
  }
  background: {
    primary: string
    secondary: string
    surface: string
  }
  text: {
    primary: string
    secondary: string
    muted: string
    inverted: string
  }
  border: {
    default: string
    strong: string
  }
  button: {
    primary: {
      background: string
      text: string
      hover: string
    }
    secondary: {
      background: string
      text: string
      hover: string
    }
  }
  status: {
    error: {
      background: string
      border: string
      text: string
    }
    success: {
      background: string
      border: string
      text: string
    }
    warning: {
      background: string
      border: string
      text: string
    }
    info: {
      background: string
      border: string
      text: string
    }
  }
}

export const lightTheme: ITheme = {
  image: {
    invert: 100,
  },
  background: {
    primary: palette.gray[200],
    secondary: palette.gray[100],
    surface: "#FFFFFF",
  },
  text: {
    primary: palette.gray[900],
    secondary: palette.gray[600],
    muted: palette.gray[300],
    inverted: "#FFFFFF",
  },
  border: {
    default: palette.gray[300],
    strong: palette.gray[600],
  },
  button: {
    primary: {
      background: palette.blue[500],
      text: "#FFFFFF",
      hover: palette.blue[700],
    },
    secondary: {
      background: palette.gray[200],
      text: palette.gray[900],
      hover: palette.gray[300],
    },
  },
  status: {
    error: {
      background: palette.red[100],
      border: palette.red[700],
      text: palette.red[500],
    },
    success: {
      background: palette.green[100],
      border: palette.green[700],
      text: palette.green[500],
    },
    warning: {
      background: palette.yellow[100],
      border: palette.yellow[700],
      text: palette.yellow[500],
    },
    info: {
      background: palette.blue[100],
      border: palette.blue[700],
      text: palette.blue[500],
    },
  },
}

export const darkTheme: ITheme = {
  image: {
    invert: 0
  },
  background: {
    primary: palette.gray[900],
    secondary: palette.gray[800],
    surface: "#000000",
  },
  text: {
    primary: "#FFFFFF",
    secondary: palette.gray[300],
    muted: palette.gray[600],
    inverted: palette.gray[900],
  },
  border: {
    default: palette.gray[600],
    strong: palette.gray[300],
  },
  button: {
    primary: {
      background: palette.blue[700],
      text: "#FFFFFF",
      hover: palette.blue[500],
    },
    secondary: {
      background: palette.gray[800],
      text: "#FFFFFF",
      hover: palette.gray[600],
    },
  },
  status: {
    error: {
      background: palette.red[900],
      border: palette.red[700],
      text: palette.red[500],
    },
    success: {
      background: palette.green[900],
      border: palette.green[700],
      text: palette.green[500],
    },
    warning: {
      background: palette.yellow[900],
      border: palette.yellow[700],
      text: palette.yellow[500],
    },
    info: {
      background: palette.blue[900],
      border: palette.blue[700],
      text: palette.blue[500],
    },
  },
}
