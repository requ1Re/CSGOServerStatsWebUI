import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from "../../entity/User";
import { sign } from "jsonwebtoken";
import { MyContext } from "src/types/MyContext";
import { isAuthenticated } from "./IsAuthenticated";


@ObjectType({ description: "Object containing a accessToken in JWT format" })
class LoginResponse {
  @Field({ description: "JSON Web Token" })
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User], { description: "Returns all users" })
  async users() {
    return await User.find();
  }

  @Query(() => User, {
    nullable: true,
    description:
      "Returns the currently authenticated user if it exists, otherwise null",
  })
  @UseMiddleware(isAuthenticated)
  async me(@Ctx() { payload }: MyContext): Promise<User | null> {
    return (await User.findOne({ where: { id: payload?.userId } })) ?? null;
  }

  @Mutation(() => Boolean, { description: "Register a new user" })
  async register(
    @Arg("userName") userName: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await hash(password, 13);
    // let user = null;
    try {
      await User.insert({
        userName,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

  @Mutation(() => LoginResponse, {
    nullable: true,
    description:
      "Logging in a previously created user, returns an object containing the JWT or null if an error occured.",
  })
  async login(
    @Arg("userName") userName: string,
    @Arg("password") password: string
  ): Promise<LoginResponse | null> {
    const user = await User.findOne({ where: { userName } });

    if (!user) {
      return null;
    }

    const verify = await compare(password, user.password);

    if (!verify) {
      return null;
    }

    return {
      accessToken: sign(
        { userId: user.id },
        process.env.SESSION_SECRET ?? "labmon",
        {
          expiresIn: "1d",
        }
      ),
    };
  }
}
