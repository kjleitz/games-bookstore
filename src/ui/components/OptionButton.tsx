import { JSX, ReactNode } from "react";

interface OptionButtonProps {
  isSelected?: boolean;
  onClick?: () => void;
  title: string | ReactNode;
  synopsis: string | ReactNode;
}

export const OptionButton = ({
  title,
  synopsis,
  isSelected = false,
  onClick,
}: OptionButtonProps): JSX.Element => {
  return (
    <div className="option-button-container">
      <button
        type="button"
        onClick={onClick}
        className={`option-button rounded-panel text-left transition-colors ${
          isSelected
            ? "border-accent bg-accent/15 text-textPrimary"
            : "border-border/40 bg-surface/70 text-textSecondary hover:border-accent hover:text-textPrimary"
        }`}
      >
        <div className="text-textPrimary">{title}</div>
        <p className="text-textSecondary">{synopsis}</p>
      </button>
    </div>
  );
};
