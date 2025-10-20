import "./Tag.scss";

interface TagProps {
  children: React.ReactNode;
}

export const Tag = ({ children }: TagProps) => {
  return <h1 className=" tag tag__text">{children}</h1>;
};
