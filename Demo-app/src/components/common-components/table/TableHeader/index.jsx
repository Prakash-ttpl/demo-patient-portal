import React from "react";
import Checkbox from "../../checkbox/Checkbox";

const TableHeader = ({
  tableHeaderCustomclasses = "",
  coloumns,
  sorting,
  selectProps,
  allChecked,
  selectAllCb = () => {},
  getVarient,
}) => {
  const { isSortable = false, onSortChangeCb } = sorting || {};

  return (
    <thead
      className={`bg-[#E7E7E7] text-neutral-80 font-medium text-[14px] ${tableHeaderCustomclasses}`}
    >
      <tr>
        {selectProps?.isSelectable && (
          <th
            scope="col"
            className={`text-left ${getVarient()} w-[40px] flex-shrink-0`}
          >
            {selectProps?.isSelectAll && (
              <Checkbox checked={allChecked} onChangeCb={selectAllCb} />
            )}
          </th>
        )}
        {coloumns?.map((col, index) => {
          const stickyClass =
            col.stickyColumn === col.field
              ? "sticky right-0 z-20 bg-[#E7E7E7] shadow-[inset_6px_0_6px_-6px_rgba(0,0,0,0.1)]"
              : "";

          return (
            <th
              key={`table-column-${index}`}
              scope="col"
              className={`text-left text-nowrap ${getVarient()} ${stickyClass} ${
                col.widthClass || ""
              } overflow-hidden`}
            >
              {col.label}
              {isSortable && col.sort && (
                <span
                  className="inline-block ml-2 cursor-pointer"
                  onClick={() => onSortChangeCb(col.sort)}
                >
                  &#8597;
                </span>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
