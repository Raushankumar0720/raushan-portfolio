import './Badge.css';

export default function Badge({ children, variant = 'default', color, className = '' }) {
  const style = color ? { backgroundColor: `${color}18`, color, borderColor: `${color}30` } : {};

  return (
    <span className={`badge badge-${variant} ${className}`} style={style}>
      {children}
    </span>
  );
}

export function StatusBadge({ status, config }) {
  const { label, color, icon } = config;
  return (
    <span
      className="badge badge-status"
      style={{
        backgroundColor: `${color}18`,
        color: color,
        borderColor: `${color}40`,
      }}
    >
      <span className="badge-dot" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
