import { randomUUID } from "node:crypto";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { generateRef } from "util/generate-ref";
import { GetUserByRefUseCase } from "./get-user-by-ref";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetUserByRefUseCase;

describe("Get User By Ref", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();

		sut = new GetUserByRefUseCase(inMemoryUsersRepository);
	});

	it("should be able to get a user by ref", async () => {
		const userRef = generateRef(7);
		const userId = randomUUID().toString();

		const fakerUser = {
			id: userId,
			name: "John",
			ref: userRef,
		};

		inMemoryUsersRepository.items.push(fakerUser);

		const result = await sut.execute({
			ref: userRef,
		});

		expect(result.user).toEqual(fakerUser);
	});

	it("should not be able to get user by wrong ref", async () => {
		await expect(() =>
			sut.execute({
				ref: "any-ref",
			}),
		).rejects.toBeInstanceOf(Error);
	});
});
