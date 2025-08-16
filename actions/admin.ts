'use server'

import { userRole } from '@/lib/auth'
import { UserRole } from '@/lib/generated/prisma'

export const admin = async () => {
	const role = await userRole()

	if (role === UserRole.ADMIN) {
		return { success: 'Allowed Server Action!' }
	}

	return { error: 'Forbidden Server Action!' }
}
