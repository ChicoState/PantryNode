import { createServer } from "miragejs";
import { getAuthRoutes } from "./auth";
import { getSaleRoutes } from "./sale";
import { getFeedRoutes } from "./feed";

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,
    routes() {
      // Axios and MirageJS issue fixed based on comment https://github.com/pretenderjs/pretender/issues/354#issuecomment-1299297701
      const NativeXMLHttpRequest = window.XMLHttpRequest;

      (window as any).XMLHttpRequest = function XMLHttpRequest() {
        const request: any = new NativeXMLHttpRequest();
        delete request.onloadend;
        return request;
      };
      // End fix

      this.namespace = "api";
      this.urlPrefix = "http://localhost:3001";
      getAuthRoutes(this);
      getSaleRoutes(this);
      getFeedRoutes(this);
      this.passthrough();
    },
  });
}
