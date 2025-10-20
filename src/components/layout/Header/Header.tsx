import { IconRimacDesktop } from "@/icons/IconRimacDesktop/IconRimacDesktop";
import "./Header.scss";
import { IconPhone } from "@/icons/IconPhone/IconPhone";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <IconRimacDesktop className="header__logo" />

        <div className="header__contact">
          <span className="header__contact-text">¡Compra por este medio!</span>

          <div className="header__phone">
            <IconPhone className="header__phone-icon" />
            <span className="header__phone-number">(01) 411 6001</span>
          </div>
        </div>
      </div>
    </header>
  );
};
