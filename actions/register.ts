'use server'
import * as z from 'zod'
import bcrypt from 'bcryptjs'

import { RegisterSchema } from '@/schemas'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validateFields = RegisterSchema.safeParse(values)

	if (!validateFields.success) {
		return { error: 'Invalid fields!' }
	}

	const { email, password, name } = validateFields.data
	const hashedPassword = await bcrypt.hash(password, 10)

	const existingUser = await getUserByEmail(email)

	if (existingUser) {
		return { error: 'Email already in use!' }
	}

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	})

	const verificationToken = await generateVerificationToken(email)
	await sendVerificationEmail(verificationToken.email, verificationToken.token)

	return { success: 'Confirmation email sent!' }
}

export { register }
