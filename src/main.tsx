import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/layout";
import { ThemeProvider, Global } from "@fugisaki/design-system";
import "./i18n";

const App = () => {
  return (
    <ThemeProvider>
      <Global
        styles={`
          html, body {
            scroll-behavior: smooth !important;
          }

          body {
            background-color: #171923;
            background-image: url(images/wallpaper.svg);
            background-repeat: no-repeat;
            background-size: cover;
          }

          &::-webkit-scrollbar {
            width: 8px;
            background: rgba(113, 128, 150, 0.1);
          }

          &::-webkit-scrollbar-track {
            width: 8px;
          }
          
          &::-webkit-scrollbar-thumb {
            background: rgba(203, 213, 224, 0.24);
          }
      `}
      />
      <Layout />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
