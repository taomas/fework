import React from "react";
import { ConfigProvider } from "antd";
import { HashRouter as Router } from "react-router-dom";
import AppRouter from "./router";

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#7c5cfc",
          borderRadius: 2,
        },
      }}
    >
      <Router>
        <AppRouter></AppRouter>
      </Router>
    </ConfigProvider>
  );
};

export default App;
