/** PostCSS config in CommonJS form — reliably picked up by both `next dev`
 *  (webpack) and `next build`. The prior .mjs form was only honoured by build,
 *  so dev shipped globals.css with @tailwind unprocessed. */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
