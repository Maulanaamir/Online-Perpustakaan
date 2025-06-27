import React from "react";
import Router from "./routes";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  return (
    <MainLayout>
      <Router />
    </MainLayout>
  );
}
