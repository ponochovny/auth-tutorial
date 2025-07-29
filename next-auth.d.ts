import { type DefaultSession } from 'next-auth'
import { UserRole } from './lib/generated/prisma'

declare module 'next-auth' {
	interface Session {
		user: {
			role: UserRole
		} & DefaultSession['user']
	}
}
