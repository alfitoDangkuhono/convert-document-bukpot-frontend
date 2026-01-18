export default function Loading({ size = 24, color = "#9d31cc" }) {
  return (
    <span
      className="spinner"
      style={{
        width: size,
        height: size,
        borderTopColor: color,
      }}
    />
  );
}
