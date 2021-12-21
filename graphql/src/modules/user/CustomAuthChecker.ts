import jwt from "jsonwebtoken";
import { ServerStatsContext } from "src/types/ServerStatsContext";
import { AuthChecker } from "type-graphql";

export const customAuthChecker: AuthChecker<ServerStatsContext> = ({ context }) => {
  let authorized = false;
  const authorization = context.req.headers["authorization"];

  if (authorization) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET ?? "labmon", (err, decoded) => {
      if (err) {
        authorized = false;
      } else {
        if (decoded) {
          authorized = true;
        }
      }
    });
  }

  return authorized;
};
