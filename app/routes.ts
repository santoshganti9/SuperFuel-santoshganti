import { type RouteConfig, index } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), {path: "/asins", file: "routes/asins.tsx"}, {path:"/asin/:asin", file:"routes/asinSales.tsx"}] satisfies RouteConfig;
