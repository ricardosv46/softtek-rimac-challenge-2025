import { IconRimacDesktop } from "@/icons/IconRimacDesktop/IconRimacDesktop";
import "./Footer.scss";
import { IconRimacMobile } from "@/icons/IconRimacMobile/IconRimacMobile";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <IconRimacDesktop className="footer__logo desktop" />
        <IconRimacMobile className="footer__logo mobile" />
        <div className="footer__line" />
        <div className="footer__contact">
          <span className="footer__contact-text">
            © 2023 RIMAC Seguros y Reaseguros.
          </span>
        </div>
      </div>
    </footer>
  );
};
