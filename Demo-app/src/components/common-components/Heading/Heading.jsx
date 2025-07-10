import { HEADING } from "./Constants";

const Heading = ({ type = "", children, color = "", fontSize, fontWeight = "", onClickCb = () => { }, customClasses = "" }) => {
    const labelStyles = {
        color: color || 'black',
        fontSize: fontSize || 'lg',
        weight: fontWeight || "bold"
    };
    switch (type) {
        case HEADING.H1:
            return (
                <h1 id={`heading-h1-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`} onClick={onClickCb} className={`text-${labelStyles.color} text-${labelStyles.fontSize} font-${labelStyles.weight} ${customClasses}`}>{children}</h1>
            );
        case HEADING.H2:
            return (
                <h2 id={`heading-h2-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`} onClick={onClickCb} className={`text-${labelStyles.color} text-${labelStyles.fontSize} font-${labelStyles.weight} ${customClasses}`}>{children}</h2>
            );
        case HEADING.H3:
            return (
                <h2 id={`heading-h3-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`} onClick={onClickCb} className={`text-${labelStyles.color} text-${labelStyles.fontSize} font-${labelStyles.weight} ${customClasses}`}>{children}</h2>
            );
        default:
            return (
                <h2 id={`heading-default-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`} onClick={onClickCb} className={`text-${labelStyles.color} text-${labelStyles.fontSize} font-${labelStyles.weight} ${customClasses}`}>{children}</h2>
            );
    }

}

export default Heading