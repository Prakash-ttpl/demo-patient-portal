import "../input/style.scss";
import Icons from "../../Icons/Icons";
function SearchBar({
  value,
  onChangeCb,
  placeholder,
  iconProps = { icon: "searchIcon", color: "#4c4c4c99" },
  customclasses = "",
  bgInputColor,
  id = "",
}) {
  return (
    <div id="search-bar-component" className="relative min-w-[250px]">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {iconProps.icon ? (
          <Icons iconName={iconProps.icon} color={iconProps.color} />
        ) : null}
      </div>
      <input
        type="text"
        className={`input-component border-[1px]  border-[#cdcdcd] pl-10 text-[14px] block w-full p-2 h-[40px] focus:outline-none rounded-md opacity-100 bg-${
          bgInputColor || "white"
        } bg-no-repeat bg-0 bg-0/0 padding-box ${customclasses}`}
        placeholder={placeholder}
        onChange={onChangeCb}
        value={value}
        id={id}
      />
    </div>
  );
}

export default SearchBar;
