import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Outlet, useLocation } from "react-router";
import "./Layout.scss";
import { Steps } from "../Steps/Steps";
import { useStepsStore } from "@/store/stepsStore";
import { useEffect } from "react";

export const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isPlanPage = location.pathname === "/plan";
  const isResumePage = location.pathname === "/resume";
  const { setCurrentStep } = useStepsStore();

  // Actualizar el paso cuando cambie la ruta
  useEffect(() => {
    if (isPlanPage) {
      setCurrentStep(1);
    } else if (isResumePage) {
      setCurrentStep(2);
    }
  }, [isPlanPage, isResumePage, setCurrentStep]);

  const layoutClasses = `${isHome ? "layout" : "layout__steps"}`;

  return (
    <div className={layoutClasses}>
      <Header />
      {!isHome && <Steps />}
      <div className="layout__content">
        <Outlet />
      </div>
      {isHome && <Footer />}
    </div>
  );
};
