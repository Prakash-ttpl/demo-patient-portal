import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody/Index";

const VARIANTS = {
  SM: "sm",
  MD: "md",
  LG: "lg",
};

const Table = ({
  selectProps = {
    isSelectAll: false,
    onSelectAll: () => {},
    isSelectable: false,
    onSelectRowsCb: () => {},
    selectIdentifier: "",
  },
  isCustomRowChecker = null,
  customRowClasses = "",
  coloumns,
  rows = [],
  sorting,
  variant = "md",
  tableHeaderCustomclasses,
  id
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (selectProps.onSelectRowsCb) {
      selectProps.onSelectRowsCb(selectedRows);
    }
  }, [selectedRows]);

  const getVarient = () => {
    switch (variant) {
      case VARIANTS.SM:
        return "px-4 py-[8px]";
      case VARIANTS.MD:
        return "px-6 py-4";
      default:
        return "px-6 py-4";
    }
  };

  const selectAllCb = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rows);
    }
  };

  useEffect(() => {
    if (!selectProps?.isSelectAll) {
      setSelectedRows([]);
    }
  }, [selectProps?.isSelectAll]);

  return (
    <div id={id} className="flex flex-1 flex-col justify-between">
      <div className="overflow-hidden border border-neutral-20 rounded-lg">
        <div className="relative w-full">
          <div className="overflow-x-auto sozen-scrollbar">
            <table className="min-w-full table-fixed">
              <TableHeader
                selectProps={selectProps}
                selectAllCb={selectAllCb}
                coloumns={coloumns}
                sorting={sorting}
                allChecked={selectedRows.length === rows.length}
                getVarient={getVarient}
                tableHeaderCustomclasses={tableHeaderCustomclasses}
              />
              {rows?.length > 0 ? (
                <TableBody
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                  selectProps={selectProps}
                  coloumns={coloumns}
                  rows={rows}
                  getVarient={getVarient}
                  isCustomRowChecker={isCustomRowChecker}
                  customRowClasses={customRowClasses}
                />
              ) : (
                <tbody>
                  <tr>
                    <td
                      colSpan={
                        coloumns?.length + (selectProps?.isSelectable ? 1 : 0)
                      }
                      className="text-center py-4 text-gray-500 font-bold"
                    >
                      No Record found
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
