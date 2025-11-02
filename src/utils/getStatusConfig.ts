type Status = "Production" | "Development" | string;

export function getStatusConfig(status: Status) {
  const normalized = status.toLowerCase();

  const statusConfig: { [key: string]: { color: string; text: string } } = {
    production: {
      color: "bg-lime-600",
      text: "production",
    },
    development: {
      color: "bg-orange-500",
      text: "development",
    },
    default: {
      color: "bg-gray-400",
      text: "archived",
    },
  };

  return statusConfig[normalized] || statusConfig.default;
}
