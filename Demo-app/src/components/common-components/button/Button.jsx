import React from "react";
import Icons from "../../Icons/Icons";
import { BUTTON_VARIANTS } from "./Constant";

function Button({
  variant,
  startIcon = {
    icon: "",
    iconStyle: {},
    color: "",
    width: "16",
    height: "16",
  },
  endIcon,
  customBtnClass = "",
  children,
  onClickCb = () => {},
  color = "",
  style = {},
  onMouseOverCb = () => {},
  onMouseLeaveCb = () => {},
  type = "button",
  disabled = false,
  textColor = "white",
  title,
  id,
}) {
  const getVariantClass = () => {
    let variantClass;
    switch (variant) {
      case BUTTON_VARIANTS.CONTAINED:
        variantClass = `bg-${color || "primary-50"} text-${textColor} hover:opacity-90 transition-opacity`;
        break;
      case BUTTON_VARIANTS.OUTLINED:
        variantClass = `text-${color || "primary-50"} bg-[#1018280D] border border-${color || "primary-50"} bg-opacity-10  hover:bg-opacity-10  transition-colors;`;
        break;
      case BUTTON_VARIANTS.TEXT:
        variantClass = `text-${color || "[#393939]"} hover:bg-opacity-10  transition-colors;`;
        break;
      case BUTTON_VARIANTS.OUTLINED_GRAY:
        variantClass = `text-${color || "[#565656]"} hover:bg-opacity-10 bg-solid-white border-[1px] border-[#E9E9E9]  transition-colors`;
        break;
      case BUTTON_VARIANTS.CONTAINED_GRAY:
        variantClass = `text-${textColor || "[#FFFFFF]"} hover:bg-opacity-10 bg-[#D2D2D2] transition-colors`;
        break;
      default:
        variantClass = `bg-${color || "primary-50"} text-white hover:opacity-90 transition-opacity;`;
    }
    return variantClass;
  };

  const baseClasses ="py-1 px-3 rounded text-sm font-medium flex items-center gap-2.5 transition-all duration-200 cursor-pointer";
  const disabledClasses = "opacity-50 !cursor-not-allowed pointer-events-none";

  return (
    <button
      id={id || `button-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`}
      onClick={onClickCb}
      className={`${baseClasses} ${getVariantClass()} ${customBtnClass} ${
        disabled ? disabledClasses : ""
      }`}
      style={{ ...style }}
      onMouseOver={onMouseOverCb}
      onMouseLeave={onMouseLeaveCb}
      type={type}
      disabled={disabled}
      title={title}
    >
      {startIcon.icon && (
        <div id={`button-start-icon-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center">
          {typeof startIcon.icon === "string" ? (
            <Icons
              iconName={startIcon.icon}
              color={startIcon.color}
              width={startIcon.width}
              height={startIcon.height}
            />
          ) : (
            startIcon.icon
          )}
        </div>
      )}
      {children}
      {endIcon && (
        <div id={`button-end-icon-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center">
          {typeof endIcon === "string" ? <Icons iconName={endIcon} /> : endIcon}
        </div>
      )}
    </button>
  );
}

export default Button;
