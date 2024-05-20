import { randomBytes } from "node:crypto";

export function generateRef(length: number): string {
	return randomBytes(length)
		.toString("base64")
		.replace(/[^a-zA-Z0-9]/g, "")
		.substring(0, length);
}
