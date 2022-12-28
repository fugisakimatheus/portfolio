import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/layout";
import { ThemeProvider, Global } from "@fugisaki/design-system";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <Global
        styles={`
          html, body {
            scroll-behavior: smooth;
          }

          body {
            background-color: #171923;
            background-image: url(images/wallpaper.svg);
            background-repeat: no-repeat;
            background-size: cover;
          }
      `}
      />
      <Layout />
    </ThemeProvider>
  </React.StrictMode>
);
