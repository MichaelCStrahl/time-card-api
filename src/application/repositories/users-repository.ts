import { User } from "@prisma/client";

export abstract class UsersRepository {
	abstract findByRef(ref: string): Promise<User | null>;
}
