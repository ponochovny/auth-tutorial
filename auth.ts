import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { db } from '@/lib/db'
import authConfig from '@/auth.config'
import { getUserById } from '@/data/user'
import { UserRole } from '@/lib/generated/prisma'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-conformation'

export const { handlers, signIn, signOut, auth } = NextAuth({
	pages: {
		signIn: '/login',
		error: '/auth-error',
	},
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			})
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			// Allow OAuth without email verification
			if (account?.provider !== 'credentials') return true

			const existingUser = await getUserById(user.id || '')

			// Prevent sign in without email verification
			if (!existingUser?.emailVerified) return false

			// Prevent sign in wihout email verification
			if (existingUser.isTwoFactorEnabled) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
					existingUser.id
				)

				if (!twoFactorConfirmation) return false

				// Delete two factor confirmation for next sign in
				await db.twoFactorConfirmation.delete({
					where: {
						id: twoFactorConfirmation.id,
					},
				})
			}

			return true
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub
			}

			if (token.role && session.user) {
				session.user.role = token.role as UserRole
			}

			if (session.user) {
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
			}

			return session
		},
		async jwt({ token }) {
			if (!token.sub) return token

			const existingUser = await getUserById(token.sub)

			if (!existingUser) return token

			token.role = existingUser.role
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

			return token
		},
	},
	adapter: PrismaAdapter(db),
	session: {
		strategy: 'jwt',
	},
	...authConfig,
})
