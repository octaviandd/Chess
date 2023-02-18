/** @format */

export const Overlay = ({ type } : {type: string}) => {
  const color = getOverlayColor(type);
  return (
    <div
      className="overlay"
      role={type}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }}
    />
  );
};

function getOverlayColor(type: string) {
  switch (type) {
    case 'illegal-move-hover':
      return "red";
    case 'legal-move-hover':
      return "green";
    case 'possible-move':
      return "yellow";
  }
}
