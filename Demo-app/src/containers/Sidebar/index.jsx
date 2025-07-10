import React from "react"
import { useNavigate } from "react-router-dom"
import { SOZEN_COLORS } from "../../libs/constant"
import Button from "../../components/common-components/button/Button"
import ButtonDropdown from "../../components/common-components/buttonDropdown/"
import {BUTTON_VARIANTS} from "../../components/common-components/button/Constant"

const Sidebar = ({ options, onClickCb = () => { }, customBtnClass = "", checkIsActivePath = () => { } }) => {
    const navigate = useNavigate()
    return (
        <div className="w-full">
            {options.map((option, index) => {
                const isActivePath = checkIsActivePath(option) || ""
                return (<React.Fragment key={"sidebar-option-" + index}>
                    {option.children ? (
                        <ButtonDropdown customBtnClass='text-gray-700 text-[12px] w-full' label={option.label} options={option.children} selectCb={(selectedOpt) => { navigate(selectedOpt.path) }} />
                    ) : option.label ?
                        (<Button
                            customBtnClass={`w-full text-[12px]  ${option.suffixIcon ? "justify-between" : ""} ${isActivePath ? "bg-[#E9E9E9] text-[#727272] m-1 font-bold" : "text-[#8C8C8C] m-1"} ${customBtnClass}`}
                            startIcon={{ icon: option.prefixIcon , ...(isActivePath ? { color: "#727272"} : {color: "#8C8C8C"})}}
                            onClickCb={() => onClickCb(option)}
                            endIcon={option.suffixIcon}
                            variant={BUTTON_VARIANTS.TEXT}
                        >
                            {option.label}
                        </Button>
                        ) : null}
                </React.Fragment>)
            })}
        </div>
    )
}

export default Sidebar