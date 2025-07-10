import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_ROLE_NAMES } from "./Constants";
const AllowAdminOnly = ({fallback , children,navigateUrl= null}) =>{
    const [isAdminUser,setIsAdminUser] = useState();

    const navigate = useNavigate();

    if(!isAdminUser){
        if(fallback){
            return fallback();
        }else if(navigateUrl){
            return navigate(navigateUrl);
        }
        return <></>
    }
    return (
        <>{children}</>
    )
}
export default AllowAdminOnly;