import { Registry, Server } from "miragejs";
import { AnyFactories, AnyModels } from "miragejs/-types";

export const getAuthRoutes = (
  mirage: Server<Registry<AnyModels, AnyFactories>>
) => {
  mirage.post("auth/login", () => ({
    name: "John Doe",
    token: "SomeToken",
  }));
};
