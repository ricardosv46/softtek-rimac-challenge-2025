import { IconUser } from "@/icons/IconUser/IconUser";
import "./UserSelection.scss";
import { IconUserPlus } from "@/icons/IconUserPlus/IconUserPlus";
import { IconCheckGreen } from "@/icons/IconCheckGreen/IconCheckGreen";
import { UserSelectionState } from "@/store/quoteStore";

interface UserSelectionProps {
  userSelectionState: UserSelectionState;
  onSelectionChange: (isForSomeoneElse: boolean) => void;
}

export const UserSelection = ({
  userSelectionState,
  onSelectionChange,
}: UserSelectionProps) => {
  const isForMe = userSelectionState === UserSelectionState.FOR_ME;
  const isForSomeoneElse =
    userSelectionState === UserSelectionState.FOR_SOMEONE_ELSE;
  return (
    <div className="user-selection">
      <div className="user-selection__cards">
        <button
          className={`user-selection__card ${
            isForMe ? "user-selection__card--selected" : ""
          }`}
          onClick={() => onSelectionChange(false)}
          type="button"
        >
          <div className="user-selection__header">
            <div className="user-selection__icon user-selection__icon--me">
              <IconUser />
            </div>
            <h3 className="user-selection__title">Para mí</h3>
          </div>
          <p className="user-selection__description">
            Cotiza tu seguro de salud y agrega familiares si así lo deseas.
          </p>
          <div className="user-selection__radio">
            {!isForMe && <div className="radio"></div>}
            {isForMe && <IconCheckGreen className="radio__dot" />}
          </div>
        </button>

        <button
          className={`user-selection__card ${
            isForSomeoneElse ? "user-selection__card--selected" : ""
          }`}
          onClick={() => onSelectionChange(true)}
          type="button"
        >
          <div className="user-selection__header">
            <div className="user-selection__icon user-selection__icon--others">
              <IconUserPlus />
            </div>
            <h3 className="user-selection__title">Para alguien más</h3>
          </div>
          <p className="user-selection__description">
            Realiza una cotización para uno de tus familiares o cualquier
            persona.
          </p>
          <div className="user-selection__radio">
            {!isForSomeoneElse && <div className="radio"></div>}
            {isForSomeoneElse && <IconCheckGreen className="radio__dot" />}
          </div>
        </button>
      </div>
    </div>
  );
};
