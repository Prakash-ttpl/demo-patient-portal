import { useEffect, useMemo, useRef, useState } from "react";
import DropdownModal from "../dropdownModal/DropdownModal";
import Icons from "../../Icons/Icons";
import Input from "../input/Input";
import { SOZEN_COLORS } from "../../../libs/constant";
import useDebounced from "../../../libs/customHooks/useDebounced";
import { getSelectOptions } from "./SelectDropdownSaga";
import { useDispatch } from "react-redux";

const SelectDropdown = ({
  label = "",
  name = "",
  startIcon,
  labelColor = "[#565656]",
  onChangeCb = () => {},
  isRequired = false,
  value = undefined,
  placeholder = "",
  options = [],
  showToggle = true,
  toggleIcon = "",
  customClasses = "",
  isMultiSelect = false,
  disabled = false,
  renderOption = undefined,
  isAsync = false,
  openDirection = "bottom",
  url = "",
  labelKey,
  valueKey,
  labelKey2,
  multiSelectAll = false,
  labelFontSize = "[12px]",
  onAddNewCb = () => {},
  newlyAddedOption = {},
  isAddNewOption = false,
  addNewOptBtnLable = "",
  error = null,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState();
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [iconRotation, setIconRotation] = useState(0);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [paginationState, setPaginationState] = useState({
    pageNumber: 1,
    limit: 10,
    totalRecords: 0,
    search: searchText,
  });
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  const debounce = useDebounced(1000);

  useEffect(() => {
    if (!isOpen) {
      setIsSearchMode(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setHasMore(true);
  }, [searchText]);

  useEffect(() => {
    if (isAsync) return;
    if (isMultiSelect) return;
    const selectedOpt = options.find((opt) => opt?.value === value?.value);
    setSelectedOption(selectedOpt);
  }, [value?.value, isAsync, isMultiSelect]);

  useEffect(() => {
    if (!isAsync) return;
    if (!isMultiSelect) return;
    const selectedOpt = options?.filter((opt) => value?.includes(opt?.value));
    setSelectedOption(selectedOpt);
  }, [value?.length, isMultiSelect, isAsync]);

  useEffect(() => {
    if (value !== undefined) {
      if (isMultiSelect) {
        const newSelected = Array.isArray(value) ? value : [];
        if (JSON.stringify(selectedOption) !== JSON.stringify(newSelected)) {
          setSelectedOption(newSelected);
        }
      } else {
        const newSelected = value || null;
        const areSame =
          (selectedOption === null && newSelected === null) ||
          (selectedOption?.label === newSelected?.label &&
            selectedOption?.value === newSelected?.value);

        if (!areSame) {
          setSelectedOption(newSelected);
        }

        if (
          !newSelected ||
          (typeof newSelected === "object" &&
            !newSelected.label &&
            !newSelected.value)
        ) {
          setSearchText("");
        }
      }
    }
  }, [value, isMultiSelect]);

  useEffect(() => {
    if (isAsync) return;
    let filteredOptions = [];
    filteredOptions = options.filter(
      (opt) =>
        opt.label &&
        opt.label.toLowerCase().startsWith(searchText.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  }, [searchText, options, isAsync]);

  useEffect(() => {
    if (!isAsync) return;
    setFilteredOptions(dropdownOptions);
  }, [dropdownOptions.length, isAsync]);

  useEffect(() => {
    if (!url || url?.includes("null")) return;

    const params = {
      page: paginationState.pageNumber,
      limit: paginationState.limit,
    };

    if (paginationState.search) {
      params.name = paginationState.search;
    }
    if (hasMore) {
      dispatch(
        getSelectOptions({
          url,
          params,
          labelKey,
          valueKey,
          labelKey2,
          addOptions,
          handlePaginationChange,
          onHasMoreUpdate: setHasMore,
        })
      );
    }
  }, [
    dispatch,
    url,
    paginationState.pageNumber,
    paginationState.limit,
    paginationState.search,
    labelKey,
    valueKey,
    labelKey2,
    hasMore
  ]);

  const onCloseCb = () => {
    setIsOpen(false);
    setIsSearchMode(false);
  };

  const onDropdownTouchBottomCb = () => {
    if (!hasMore) return;
    setPaginationState((prev) => ({
      ...prev,
      pageNumber: prev.pageNumber + 1,
    }));
  };

  const handlePaginationChange = (paginationObj) => {
    setPaginationState((prev) => ({ ...prev, ...paginationObj }));
  };

  const handleInputChange = (e) => {
    if (e.target.value === "") {
      if (isMultiSelect) {
        setSelectedOption([]);
        onChangeCb([]);
      } else {
        setSelectedOption({});
        onChangeCb({});
      }
    }

    if ((isMultiSelect || isAsync) && e.target.value !== "") {
      setIsSearchMode(true);
    }

    if (e.target.value !== "") {
      debounce(() => {
        setDropdownOptions([]);

        handlePaginationChange({
          pageNumber: 1,
          search: e.target.value,
        });
      });
    }

    setSearchText(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };
  const handleIconRotation = (e) => {
    e.stopPropagation();
    if (disabled) return;

    if (isMultiSelect || isAsync) {
      if (isSearchMode) {
        setIsSearchMode(false);
        setSearchText("");
      } else {
        setIsSearchMode(true);
        setSearchText("");
      }
    }

    setIconRotation(iconRotation === 180 ? 0 : 180);
    setIsOpen(iconRotation === 180 ? false : true);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onChangeCb(option);
    setSearchText("");
    setIsSearchMode(false);
    setIsOpen(false);
  };

  const addOptions = (options) => {
    setDropdownOptions((prev) => [...prev, ...options]);
  };

  const handleInputClick = () => {
    if (isMultiSelect || isAsync) {
      if (isSearchMode) {
        setIsSearchMode(false);
        setSearchText("");
      } else {
        setIsSearchMode(true);
        setSearchText("");
      }
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const displayValue = useMemo(() => {
    if ((isMultiSelect || isAsync) && isSearchMode) {
      return searchText;
    }

    if ((isMultiSelect || isAsync) && !isSearchMode) {
      if (isMultiSelect && Array.isArray(selectedOption)) {
        return selectedOption.map((opt) => opt.label).join(", ");
      }
      if (
        selectedOption !== null &&
        typeof selectedOption === "object" &&
        "label" in selectedOption
      ) {
        return selectedOption.label || "";
      }
    }

    if (isOpen && searchText) return searchText;

    if (isMultiSelect && Array.isArray(selectedOption)) {
      return selectedOption.map((opt) => opt.label).join(", ");
    }
    if (
      selectedOption !== null &&
      typeof selectedOption === "object" &&
      "label" in selectedOption
    ) {
      return selectedOption.label || "";
    }
    if (selectedOption !== null && selectedOption !== undefined) {
      const foundOption = options.find((opt) => opt.value === selectedOption);
      return foundOption?.label || "";
    }
    return "";
  }, [
    searchText,
    selectedOption,
    isOpen,
    isMultiSelect,
    isAsync,
    isSearchMode,
    options,
  ]);

  return (
    <div id={id} className={`relative ${customClasses}`}>
      <div>
        <Input
          onClickCb={handleInputClick}
          startIcon={startIcon}
          labelColor={labelColor}
          labelFontSize={labelFontSize}
          label={label}
          placeholder={placeholder}
          value={displayValue}
          onChangeCb={handleInputChange}
          endIcon={
            toggleIcon
              ? toggleIcon
              : showToggle && (
                  <div onClick={handleIconRotation}>
                    <Icons
                      iconName="expandIcon"
                      color={SOZEN_COLORS.DARK_GRAY}
                      rotateDeg={isOpen ? 180 : 0}
                    />
                  </div>
                )
          }
          onFocusCb={handleFocus}
          isRequired={isRequired}
          name={name}
          disabled={disabled}
          autoComplete="off"
          error={error}
        />
      </div>

      <DropdownModal
        isOpen={isOpen}
        onCloseCb={onCloseCb}
        options={filteredOptions}
        isMultiSelect={isMultiSelect}
        multiSelectAll={multiSelectAll}
        selectCb={handleSelectOption}
        selectedOption={selectedOption}
        renderOption={renderOption}
        onDropdownTouchBottomCb={onDropdownTouchBottomCb}
        isAsync={
          isAsync && dropdownOptions.length < paginationState.totalRecords
        }
        disabled={disabled}
        openDirection={openDirection}
        dropdownOptions={dropdownOptions}
        onAddNewCb={onAddNewCb}
        newlyAddedOption={newlyAddedOption}
        isAddNewOption={isAddNewOption}
        addNewOptBtnLable={addNewOptBtnLable}
      />
    </div>
  );
};

export default SelectDropdown;
