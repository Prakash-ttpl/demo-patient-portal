import React from "react";
import "./style.scss";
import Label from "../label/Label";
import { ErrorMessage } from "formik";
import Icons from "../../Icons/Icons";

function Input({
  name = "",
  id = null,
  placeholder = "",
  label = "",
  labelColor = "[#565656]",
  labelFontSize = "[12px]",
  labelfontWeight = "medium",
  isRequired = false,
  asteriskPosition = "end",
  startIcon = "",
  endIcon = "",
  value = "",
  onChangeCb = () => {},
  onFocusCb = () => {},
  onBlurCb = () => {},
  bgInputColor = "",
  customClasses = "",
  errorContainerClasses = "text-[12px] max-w-[410px]",
  type = "text",
  disabled = false,
  autoComplete = "off",
  showCloseIcon = false,
  onCloseCb = () => {},
  maxLength = null,
  minLength = null,
  error = null,
  unit = "",
  onClickCb = () => {},
}) {
  return (
    <div className="w-full flex gap-2 flex-col justify-start relative">
      {label && (
        <div className="">
          <Label
            color={labelColor}
            fontSize={labelFontSize}
            fontWeight={labelfontWeight}
            isRequired={isRequired}
            asteriskPosition={asteriskPosition}
          >
            {label}
          </Label>{" "}
        </div>
      )}

      <div className="relative">
        {startIcon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {startIcon}
          </span>
        )}
        <input
          autoComplete={autoComplete}
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          className={`input-component border-[1px]  border-[#cdcdcd] text-[14px] block w-full p-2 h-[40px] focus:outline-none rounded-md opacity-100 bg-${
            bgInputColor || "white"
          } bg-no-repeat bg-0 bg-0/0 padding-box  ${
            startIcon ? "pl-[80px]" : ""
          } ${customClasses}`}
          value={value}
          onChange={onChangeCb}
          onFocus={onFocusCb}
          onBlur={onBlurCb}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          onClick={onClickCb}
        />
        {unit && (
          <span
            className={`absolute inset-y-0 right-0 flex items-center px-3 h-full border-[1px] border-[#ddd7d7] bg-gray-50 text-gray-700 text-sm rounded-r-md`}
          >
            {unit}
          </span>
        )}
        {endIcon && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {endIcon}
          </span>
        )}
        {showCloseIcon && (
          <span
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={onCloseCb}
          >
            <Icons iconName="closeIcon" />
          </span>
        )}
      </div>
      {(name || error) && (
        <div className={`mt-1 ${errorContainerClasses}`}>
          {error ? (
            <div className="error-text">
              {typeof error === "string" ? error : error?.label}
            </div>
          ) : (
            <ErrorMessage name={name}>
              {(msg) => (
                <div className="error-text">
                  {typeof msg === "string" ? msg : msg?.label}
                </div>
              )}
            </ErrorMessage>
          )}
        </div>
      )}
    </div>
  );
}

export default Input;
