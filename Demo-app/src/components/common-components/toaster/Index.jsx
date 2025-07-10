import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { componentKey, removeNotification } from "./ToasterSlice";
import Icons from "../../Icons/Icons";
import { TOASTER_VARIANT } from "./Constants";


const variantStyles = {
  [TOASTER_VARIANT.SUCCESS]: {
    bg: "bg-[#E1FCDE]",
    text: "text-[#A4F3A3]",
    close: "hover:bg-green-200",
    border: "border border-green-300",
    iconName: "toastGreenCheckIcon",
  },
  [TOASTER_VARIANT.ERROR]: {
    bg: "bg-[#FFD4D8]",
    text: "text-[#FA7D87]",
    close: "hover:bg-red-200",
    border: "border border-red-300",
    iconName: "toastCrossIcon",
  },
  [TOASTER_VARIANT.INFO]: {
    bg: "bg-[#E0EDFF]",
    text: "text-[#86B8FE]",
    close: "hover:bg-blue-200",
    border: "border border-blue-300",
    iconName: "toastInfoIcon",
  },
  [TOASTER_VARIANT.WARNING]: {
    bg: "bg-[#FFF2D2]",
    text: "text-[#FFCF73]",
    close: "hover:bg-yellow-200",
    border: "border border-yellow-300",
    iconName: "toastWarningIcon",
  },
};

const CustomToast = ({ message, variant = "info" }) => {
  const style = variantStyles[variant] || variantStyles.default;
  const [visible, setVisible] = useState(false);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setBlink(true);
    setTimeout(() => {
      setBlink(false);
      setVisible(false);
    }, 100);
  };

  return (
    <div
      className={`rounded-md shadow max-w-[450px] flex p-2   transform transition-all duration-300 ease-out
      ${
        visible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-95 translate-y-4"
      }
      ${style.bg} ${style.border}
       ${blink ? "opacity-0" : ""}`}
    >
      <div className="flex pt-2 pb-3 px-3 justify-between items-center">
        <div className="mr-4">
          <Icons iconName={style.iconName} />
        </div>
        <div className="ml-[6px] text-[#565656] font-medium">{message}</div>
      </div>
      <div
        onClick={handleClose}
        className="flex cursor-pointer p-1 justify-between"
      >
        <div>
          <Icons iconName="toastCloseIcon" />
        </div>
      </div>
    </div>
  );
};

const Toaster = () => {
  const { notifications } = useSelector((state) => state[componentKey]);

  const [currentToast, setCurrentToast] = useState(null);
  const dispatch = useDispatch();
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!currentToast && notifications.length > 0) {
      const nextToast = notifications[0];
      setCurrentToast(nextToast);

      timeoutRef.current = setTimeout(() => {
        setCurrentToast(null);
        dispatch(removeNotification());
      }, 3000);
    }
  }, [notifications, currentToast, dispatch]);

  return ReactDOM.createPortal(
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2">
      {notifications.map((toast, index) => (
        <CustomToast
          key={index}
          message={toast.message}
          variant={toast.variant}
          onClose={() => dispatch(removeNotification(index))}
        />
      ))}
    </div>,
    document.getElementById("sozen-ehr-app-toasts")
  );
};

export default Toaster;
