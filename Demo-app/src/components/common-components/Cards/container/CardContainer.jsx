const CardContainer = ({children,customCssClass}) =>{
    return (
        <div id="card-container" className={`container-card-body rounded bg-white overflow-hidden  ${customCssClass}`}>{children}</div>
    )
}
export default CardContainer;