import "./HomePage.scss";
import familyImage from "@/assets/images/family.webp";
import { Tag } from "@/components/common/Tag/Tag";
import { Form } from "@/components/common/Form/Form";

export const HomePage = () => {
  return (
    <main className="hero">
      <div className="hero__container">
        {/* MOBILE LAYOUT */}
        <div className="hero__mobile">
          <div className="hero__content-mobile">
            <div className="hero__text-content">
              <Tag>Seguro Salud Flexible</Tag>

              <h1 className="hero__title">Creado para ti y tu familia</h1>
            </div>

            <div className="hero__image-mobile">
              <div className="hero__family-image">
                <img
                  src={familyImage}
                  alt="Familia feliz"
                  className="hero__family-img"
                />
              </div>
            </div>
          </div>
          <div className="hero__line" />
          <p className="hero__description">
            Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
            asesoría. 100% online.
          </p>
          <Form variant="mobile" />
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hero__desktop">
          <div className="hero__image-desktop">
            <div className="hero__family-image">
              <img
                src={familyImage}
                alt="Familia feliz"
                className="hero__family-img"
              />
            </div>
          </div>
          <div className="hero__content-desktop">
            <Tag>Seguro Salud Flexible</Tag>

            <h1 className="hero__title">Creado para ti y tu familia</h1>

            <p className="hero__description">
              Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
              asesoría. 100% online.
            </p>

            <Form variant="desktop" />
          </div>
        </div>
      </div>
    </main>
  );
};
