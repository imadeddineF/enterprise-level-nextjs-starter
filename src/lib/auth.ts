import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";

const prisma = new PrismaClient();

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),

	session: {
		cookieCache: {
			enabled: true,
			maxAge: 60, // 1 minute
		},
	},

	plugins: [nextCookies()],

	emailAndPassword: {
		enabled: true,
	},

	user: {
		additionalFields: {
			firstName: {
				type: "string",
				required: true,
			},
			lastName: {
				type: "string",
				required: true,
			},
		},
	},

	// socialProviders: {
	// 	google: {
	// 		clientId: process.env.GOOGLE_CLIENT_ID as string,
	// 		clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
	// 		mapProfileToUser: (profile) => {
	// 			return {
	// 				firstName: profile.given_name,
	// 				lastName: profile.family_name,
	// 			};
	// 		},
	// 	},
	// },

	advanced: {
		cookiePrefix: "better-auth",
	},
});
