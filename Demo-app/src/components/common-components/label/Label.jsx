
const Label = ({
  color,
  fontSize,
  fontWeight = "normal",
  isRequired = false,
  asteriskPosition = "end",
  children,
  customClass = "",
  onChangeCb = () => {},
}) => {
  const labelColor = color || "[#565656]";
  const labelFontSize = fontSize || "[12px]";
  const labelFontWeight = fontWeight || "medium";
  const asterisk = isRequired ? (
    <span className="text-red-500 m-1">*</span>
  ) : null;

  return (
    <label
      className={`relative text-${labelColor} text-${labelFontSize} font-${labelFontWeight} ${customClass}`}
      onClick={onChangeCb}
    >
      {asteriskPosition === "start" && asterisk}
      {children}
      {asteriskPosition === "end" && asterisk}
    </label>
  );
};

export default Label;
