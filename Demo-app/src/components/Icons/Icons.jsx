import PdfIcon from "./vectors/PdfIcon";
import SearchIcon from "./vectors/SearchIcon";

const icons = {
  pdfIcon: () => <PdfIcon />,
  SearchIcon:()=> <SearchIcon/>
};
const Icons = ({
  iconName,
  color,
  transformScale = 1,
  rotateDeg = 0,
  style,
  height,
  width,
  onClick = () => {},
}) => {
  const iconProps = {
    style: {
      ...style,
      transform: `scale(${transformScale}) rotate(${rotateDeg}deg)`,
      cursor: "pointer",
    },
    color: color,
    stroke: color,

    iconName: "",
    height: height,
    width: width,
    onClick: onClick,
  };

  const IconComponent = icons[iconName];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...iconProps} />;
};

export default Icons;
