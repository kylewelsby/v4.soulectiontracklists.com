const SIZES = [12, 32, 48, 84];
const whitelistSizes = [];
SIZES.forEach((size) => {
  whitelistSizes.push(`w-${size}`);
  whitelistSizes.push(`h-${size}`);
  whitelistSizes.push(`min-w-${size}`);
  whitelistSizes.push(`min-h-${size}`);
  whitelistSizes.push(`max-w-${size}`);
  whitelistSizes.push(`max-h-${size}`);
});
module.exports = {
  theme: {
    extend: {
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      }
    }
  },
  purge: {
    enabled: false, // process.env.NODE_ENV === "production",
    content: ["str/**/*.vue"],
    option: {
      safelist: [].concat(whitelistSizes)
    }
  },
  future: {
    removeDeprecatedGapUtilities: true
  }
};
