import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/users/:ref")
export class GetUserByRefController {
	constructor(private prisma: PrismaService) {}

	@Get()
	async handle(@Param("ref") ref: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				ref: {
					equals: ref,
				},
			},
		});

		if (!user) {
			throw new NotFoundException();
		}

		return { user };
	}
}
