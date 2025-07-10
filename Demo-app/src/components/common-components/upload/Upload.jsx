import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage } from "formik";
import Button from "../button/Button";
import { BUTTON_VARIANTS } from "../button/Constant";
import { useDispatch } from "react-redux";
import { addNotifications } from "../toaster/ToasterSlice";
import { TOASTER_VARIANT } from "../toaster/MetToaster";
import Icons from "../../Icons/Icons";

function Upload({
  customClass = "",
  title = "",
  content = "",
  subTitle = "",
  icon,
  name = "",
  onChangeCb = () => {},
  link = "",
  borderType = "border-dashed",
  isHoverSelectOption = false,
  customCotainerClass = "",
  customImgClass = "",
  customAlignClass = "",
  disabled = false,
  customSubtitleClass = "",
  url,
  subContent = "",
  id = "",
}) {
  const fileInputRef = useRef(null);
  const [showUploadCard, setShowUploadCard] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (url) {
      if (!url.startsWith("uploads/")) {
        setSelectedImage(url);
      }
    } else {
      setSelectedImage(null);
    }
  }, [url]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const fileType = file.type.split("/")[1];
    let isValidFileType = false;
    const maxSizeInBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      dispatch(
        addNotifications({
          message: "File size exceeds 10MB. Please upload a smaller file.",
          variant: TOASTER_VARIANT.ERROR,
        })
      );
      return;
    }

    switch (fileType) {
      case "pdf":
      case "png":
      case "jpeg":
      case "jpg":
      case "doc":
      case "excel":
      case "vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      case "zip":
      case "mp3":
      case "csv":
      case "mpeg":
      case "msword":
      case "svg+xml":
        isValidFileType = true;
        break;
      default:
        isValidFileType = false;
        break;
    }

    if (isValidFileType) {
      onChangeCb(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      dispatch(
        addNotifications({
          message: "Unsupported file type!",
          variant: TOASTER_VARIANT.ERROR,
        })
      );
    }

    onChangeCb(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files[0];
    onChangeCb(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function getFileExtension(url) {
    if (!url) return '';
    if (url.startsWith('data:')) {
      const match = url.match(/data:([^;]+);/);
      if (match) {
        const mime = match[1];
        if (mime === 'application/pdf') return 'pdf';
        if (mime === 'text/csv') return 'csv';
        if (mime.startsWith('image/')) return mime.split('/')[1];
      }
      return '';
    }
    return url.split('.').pop().split('?')[0].toLowerCase();
  }

  return (
    <>
      <div
        id={id}
        onMouseOver={() => {
          setShowUploadCard(true);
        }}
        onMouseLeave={() => {
          setShowUploadCard(false);
        }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex items-center justify-center border-2 sozen-scrollbar ${
          selectedImage ? "" : borderType
        } border-gray-400   rounded-md relative ${customClass} ${
          isHoverSelectOption ? "bg-gray-200" : "bg-white"
        } ${isHoverSelectOption ? "bg-gray-200" : "bg-white"} ${
          isDraggingOver ? "bg-gray-200" : "bg-white"
        }`}
        onClick={handleClick}
      >
        {selectedImage && !showUploadCard ? (
          selectedImage.startsWith("data:text/csv") ? (
            <div className="max-h-60 overflow-auto p-4 text-sm w-full text-left">
              <table className="w-full border border-collapse border-gray-300 text-[12px]">
                <tbody>
                  {atob(selectedImage.split(",")[1])
                    .split("\n")
                    .filter((row) => row.trim() !== "")
                    .map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-gray-300">
                        {row.split(",").map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-2 py-1 border-r border-gray-200"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : getFileExtension(selectedImage) === "pdf" ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
            <Icons iconName={"pdfIcon"}/>
              <span className="text-sm font-normal">PDF Document</span>
            </div>
          ) : (
            <div className={`h-full w-full ${customAlignClass}`}>
              <img
                src={selectedImage}
                alt="Selected"
                className={`h-full w-full object-cover ${customImgClass}`}
              />
            </div>
          )
        ) : (
          <div className={customCotainerClass}>
            <div className="flex justify-center cursor-pointer">{icon}</div>
            <div className="flex flex-col justify-center items-center">
              <div className="pt-2 font-bold">{title}</div>
              <div className="pt-1 font-bold">{content}</div>
              <div className="pt-1 flex items-center justify-center">
                <span className={`${customSubtitleClass}`}>{subTitle}</span>
                {link && (
                  <Button
                    variant={BUTTON_VARIANTS.TEXT}
                    customBtnClass="underline text-met-primary font-bold"
                  >
                    {link}
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-4 items-center flex justify-center text-gray-500 fs-14">
              {subContent}
            </div>
          </div>
        )}
        <input
          type="file"
          name={name}
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => {
            handleImageChange(e);
          }}
          disabled={disabled}
        />
      </div>
      {name && (
        <div className="mt-1 text-[12px] max-w-[350px]">
          <ErrorMessage name={name} component="div" className="error-text" />
        </div>
      )}
    </>
  );
}

export default Upload;
