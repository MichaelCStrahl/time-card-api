import { UsersRepository } from "@/application/repositories/users-repository";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

export class InMemoryUsersRepository extends UsersRepository {
	public items: User[] = [];

	async findByRef(ref: string) {
		const user = this.items.find((item) => item.ref === ref);

		if (!user) {
			return null;
		}

		return user;
	}
}
