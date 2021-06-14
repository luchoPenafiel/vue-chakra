export default {
  colors: {
    blue: {
      50: 'red',
      100: '#d4e0ef',
      200: '#a9c1df',
      300: '#7da2ce',
      400: '#5283be',
      500: '#2764ae',
      600: '#1f508b',
      700: '#173c68',
      800: '#102846',
      900: '#081423',
      950: '#040a11',
    },
  },
  radii: {
    md: '500px',
  },
  components: {
    button: {
      baseStyle: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderRadius: 'base', // <-- border radius is same for all variants and sizes
      },
      // Two sizes: sm and md
      sizes: {
        sm: {
          fontSize: 'sm',
          px: 4, // <-- px is short for paddingLeft and paddingRight
          py: 3, // <-- py is short for paddingTop and paddingBottom
        },
        md: {
          fontSize: 'md',
          px: 6, // <-- these values are tokens from the design system
          py: 4, // <-- these values are tokens from the design system
        },
      },
      // Two variants: outline and solid
      variants: {
        outline: {
          border: '2px solid',
          borderColor: 'purple.500',
          color: 'blue.50',
        },
        solid: {
          bg: 'blue.50',
          color: 'white',
        },
      },
      // The default size and variant values
      defaultProps: {
        size: 'md',
        variant: 'outline',
      },
    },
    Input: {
      variants: {
        outline: {
          borderColor: '#fff',
        },
      },
    },
  },
};
