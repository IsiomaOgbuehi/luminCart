import { Global } from "@emotion/react"
const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Bau';
        src: url('/fonts/Bau-Regular.eot');
        src: url('/fonts/Bau-Regular.eot?#iefix') format('embedded-opentype'),
            url('/fonts/Bau-Regular.woff2') format('woff2'),
            url('/fonts/Bau-Regular.woff') format('woff'),
            url('/fonts/Bau-Regular.ttf') format('truetype'),
            url('/fonts/Bau-Regular.svg#Bau-Regular') format('svg');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    @font-face {font-family: "Freight Display Pro"; src: url("//db.onlinewebfonts.com/t/d61a5a7eade9ff598a63d1960d1b36cb.eot"); src: url("//db.onlinewebfonts.com/t/d61a5a7eade9ff598a63d1960d1b36cb.eot?#iefix") format("embedded-opentype"), url("//db.onlinewebfonts.com/t/d61a5a7eade9ff598a63d1960d1b36cb.woff2") format("woff2"), url("//db.onlinewebfonts.com/t/d61a5a7eade9ff598a63d1960d1b36cb.woff") format("woff"), url("//db.onlinewebfonts.com/t/d61a5a7eade9ff598a63d1960d1b36cb.ttf") format("truetype"), url("//db.onlinewebfonts.com/t/d61a5a7eade9ff598a63d1960d1b36cb.svg#Freight Display Pro") format("svg"); } 
      `}
  />
);
export default Fonts;