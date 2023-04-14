import { createServer } from "miragejs";
import { getAuthRoutes } from "./auth";
import { getSaleRoutes } from "./sale";
import { getFeedRoutes } from "./feed";

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,
    routes() {
      this.namespace = "api";
      getAuthRoutes(this);
      getSaleRoutes(this);
      getFeedRoutes(this);
    },
  });
}
