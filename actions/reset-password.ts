'use server'

import * as z from 'zod'

import { ResetSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
	const validatedFields = ResetSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' }
	}

	const { email } = validatedFields.data

	const existingUser = await getUserByEmail(email)

	if (!existingUser) {
		return { error: 'Email does not exist!' }
	}

	const passwordResetToken = await generatePasswordResetToken(email)
	await sendPasswordResetEmail(
		passwordResetToken.email,
		passwordResetToken.token
	)

	return { success: 'Check your email to reset your password!' }
}
