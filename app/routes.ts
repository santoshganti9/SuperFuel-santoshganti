import { type RouteConfig, index } from "@react-router/dev/routes";

export default [index("routes/jsList.tsx"), {path: "/create-snippet", file: "routes/jsCreationForm.tsx"}, {path:"/view-snippet/:snippetId", file:"routes/jsSnippetResult.tsx"}] satisfies RouteConfig;
