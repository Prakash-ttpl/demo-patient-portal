import React from "react";
import Checkbox from "../../checkbox/Checkbox";
import { General } from "../../../../libs/utility/General";

const TableBody = ({
  coloumns,
  rows,
  selectProps,
  setSelectedRows,
  selectedRows,
  getVarient,
  isCustomRowChecker,
  customRowClasses
}) => {
  const onToggleCb = (object) => {
    const updatedArray = General.toggleObjectInArray(
      selectedRows,
      object,
      selectProps.selectIdentifier
    );
    setSelectedRows(updatedArray);
  };

  return (
    <tbody className="w-full">
      {rows?.map((row, rowIndex) => {
        const isCustomRow = isCustomRowChecker && isCustomRowChecker(row);
        if (isCustomRow) {
          return (
            <tr className={`${customRowClasses}`} key={`table-row-${rowIndex}`}>
              {selectProps.isSelectable && (
                <td className={`${getVarient()} w-[40px] flex-shrink-0`}>
                  <Checkbox
                    checked={selectedRows.some(
                      (selectedRw) =>
                        selectedRw[selectProps.selectIdentifier] ===
                        row[selectProps.selectIdentifier]
                    )}
                    onChangeCb={() => onToggleCb(row)}
                  />
                </td>
              )}
              {coloumns?.map((col, colIndex) => {
                return (
                  <td
                    key={`table-cell-${rowIndex}-${colIndex}`}
                    className={`${col?.customColumnClasses} pl-6 `}
                  >
                    {col?.customRenderLogic(row, rowIndex)}
                  </td>
                );
              })}
            </tr>
          );
        } else {
          return (
            <tr
              className="bg-white border-b border-[#E9E9E9]"
              key={`table-row-${rowIndex}`}
            >
              {selectProps?.isSelectable && (
                <td className={`${getVarient()} w-[40px] flex-shrink-0`}>
                  <Checkbox
                    checked={selectedRows.some(
                      (selectedRw) =>
                        selectedRw[selectProps.selectIdentifier] ===
                        row[selectProps.selectIdentifier]
                    )}
                    onChangeCb={() => onToggleCb(row)}
                  />
                </td>
              )}
              {coloumns?.map((col, colIndex) => {
                const stickyClass =
                  col.stickyColumn === col.field
                    ? "sticky right-0 z-10 bg-white shadow-[inset_6px_0_6px_0px_rgba(0,0,0,0.05)]"
                    : "";

                return (
                  <td
                    key={`table-cell-${rowIndex}-${colIndex}`}
                    className={`h-[48px] text-nowrap ${getVarient()} ${
                      col?.color || ""
                    } ${stickyClass} ${col.widthClass || ""} overflow-hidden`}
                  >
                    {col?.renderLogic(row, rowIndex)}
                  </td>
                );
              })}
            </tr>
          );
        }
      })}
    </tbody>
  );
};

export default TableBody;
