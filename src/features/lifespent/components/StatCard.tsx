export function StatCard({ icon, value, label, color }: { icon: string; value: string | number; label: string; color: string }) {
  return (
    <div style={{
      background: "#111120", border: `1px solid ${color}18`, borderRadius: "12px",
      padding: "16px 12px", flex: 1, minWidth: "120px", textAlign: "center",
    }}>
      <div style={{ fontSize: "18px", marginBottom: "7px" }}>{icon}</div>
      <div style={{ color, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "15px", lineHeight: 1.2, marginBottom: "5px" }}>{value}</div>
      <div style={{ color: "#363658", fontSize: "10px", fontFamily: "'Inter',sans-serif", lineHeight: 1.4 }}>{label}</div>
    </div>
  );
}
