const IsAccessAllowed = (allowedRoles = [],currentRole= [])=>{
    if(typeof currentRole === 'string'){
        return allowedRoles.includes(currentRole);
    }else{
        for(let role of currentRole){
            return allowedRoles.includes(role);
        }
    }
}
export default IsAccessAllowed;