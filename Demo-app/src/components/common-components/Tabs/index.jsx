import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import useGetCurrentPathHook from "../../../libs/customHooks/useGetCurrentPathHook";

const Tabs = ({
  tabs,
  customDivClass = "",
  customChildClass = "",
  pathLevel = 2,
  getAdditionalTab = () => {},
  id = "",
}) => {
  const activeTab = useGetCurrentPathHook(true, pathLevel);
  const navigate = useNavigate();

  return (
    <div
      id={id || "tabs-container"}
      className={`${customDivClass} w-full border border-[#E9E9E9] p-4 rounded`}
    >
      <div id="tabs-header" className="flex justify-between">
        <div id="tabs-navigation">
          {tabs.map((tab, index) => (
            <React.Fragment key={"navigation-tab-id-" + index}>
              <button
                id={`tab-button-${tab.id}-${index}`}
                className={`relative font-medium px-4 fs-14 line-height-120 py-2 mr-4 cursor-pointer focus:outline-none ${
                  activeTab === tab.id
                    ? "shadow-sm text-[#145E90] rounded-md bg-[#F2F8FD]"
                    : "bg-white text-neutral-60"
                }`}
                onClick={() => navigate(tab.redirectTo)}
              >
                {tab.name}
                {activeTab === tab.id && (
                  <span id={`tab-active-indicator-${tab.id}`} className="absolute bottom-0 left-0 w-full h-[3px]  rounded-t-md bg-primary-50"></span>
                )}
              </button>
            </React.Fragment>
          ))}
        </div>

        <div id="tabs-additional-content">{getAdditionalTab()}</div>
      </div>
      <div id="tabs-content" className={`pt-4 ${customChildClass}`}>
        <Routes>
          {tabs.map((tab) => (
            <Route
              key={tab.id}
              path={tab.id === activeTab ? "*" : ""}
              element={tab.component}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default Tabs;
