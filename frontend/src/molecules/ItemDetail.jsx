function ItemDetail({ label, value, className }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className={`font-medium ${className}`}>{value || "-"}</p>
    </div>
  );
}

export default ItemDetail;
