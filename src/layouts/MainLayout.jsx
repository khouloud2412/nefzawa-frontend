import React from "react";
import Navbar from "@main/components/common/Navbar";
import Footer from "@main/components/common/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div data-platform="main" className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
