export const COLORS = {
  // Brand Palette (HSL Derived for harmony)
  primary: '#2E7D32',    // Deep Forest Green
  primaryLight: '#4CAF50', // Leaf Green
  primaryDark: '#1B5E20',  // Dark Moss
  secondary: '#8BC34A',  // Sprout Green

  // Neutral Palette
  background: '#F9FBF9', // Soft Mint-tinted White
  surface: '#FFFFFF',
  text: '#122613',       // Almost Black Green
  textLight: '#5C6B5D',  // Muted Sage
  border: '#E0EAE0',

  // Status Palette
  success: '#388E3C',
  warning: '#F57C00',
  error: '#D32F2F',
  info: '#1976D2',

  white: '#FFFFFF',
  black: '#000000',

  // Premium Layered Shadows
  shadow: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: "#1B5E20",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: "#1B5E20",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      elevation: 8,
    }
  }
};

export const SIZES = {
  padding: 20,
  radius: 20,       // Larger radius for modern look
  radiusSm: 12,
  h1: 28,
  h2: 24,
  h3: 18,
  body: 16,
};
