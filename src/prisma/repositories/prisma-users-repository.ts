import { UsersRepository } from "@/application/repositories/users-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaUsersRepository extends UsersRepository {
	constructor(private prisma: PrismaService) {
		super();
	}

	async findByRef(ref: string) {
		const user = await this.prisma.user.findUnique({
			where: { ref },
		});

		return user;
	}
}
