import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { MyContext } from "../../types/MyContext";

export const isAuthenticated: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("ERROR.GRAPHQL.NOT_AUTHORIZED");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.SESSION_SECRET ?? "sseeccrreett");
    console.log(payload);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("ERROR.GRAPHQL.NOT_AUTHORIZED");
  }
  return next();
};