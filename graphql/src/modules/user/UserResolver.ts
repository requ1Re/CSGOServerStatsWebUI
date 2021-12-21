import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  Authorized,
} from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import jwt from "jsonwebtoken";
import { ConfigUtil } from "../../util/ConfigUtil";
import { UserLoginDetailsInput } from "./UserLoginDetailsInput";
import { ServerStatsContext } from "src/types/ServerStatsContext";
import { ServerStatsJwtPayload } from "src/types/ServerStatsJwtPayload";


@ObjectType({ description: "Object containing a accessToken in JWT format" })
class LoginResponse {
  @Field({ description: "JSON Web Token" })
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => [User], { description: 'Returns all users' })
  async users() {
    return await User.find();
  }

  @Authorized()
  @Query(() => User, {
    nullable: true,
    description: 'Returns the currently authenticated user if it exists, otherwise null',
  })
  async me(@Ctx() { user }: ServerStatsContext): Promise<User | null> {
    console.log(user);
    return (await User.findOne({ where: { id: user?.userId } })) ?? null;
  }

  @Mutation(() => User, {
    nullable: true,
    description: 'Register a new user, returns the user if registration was successful, returns null otherwise',
  })
  async register(@Arg('data', () => UserLoginDetailsInput) data: UserLoginDetailsInput): Promise<User | null> {
    const hashedPassword = await bcrypt.hash(data.password, 13);

    let user: User;
    try {
      user = await User.create({
        userName: data.userName,
        password: hashedPassword,
      }).save();
    } catch (err) {
      return null;
    }

    if (user) {
      return user;
    } else {
      return null;
    }
  }

  @Mutation(() => LoginResponse, {
    nullable: true,
    description:
      'Logging in a previously created user, returns an object containing the JWT or null if an error occured.',
  })
  async login(@Arg('data', () => UserLoginDetailsInput) data: UserLoginDetailsInput): Promise<LoginResponse | null> {
    const user = await User.findOne({ where: { userName: data.userName } });

    if (!user) {
      return null;
    }

    const verify = await bcrypt.compare(data.password, user.password);

    if (!verify) {
      return null;
    }

    const payload: ServerStatsJwtPayload = { userId: user.id.toString() };

    return {
      accessToken: jwt.sign(payload, process.env.JWT_SECRET ?? ConfigUtil.DEFAULT_JWT_SECRET, {
        expiresIn: '1d',
      }),
    };
  }
}