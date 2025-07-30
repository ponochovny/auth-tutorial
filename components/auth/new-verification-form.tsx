'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BeatLoader } from 'react-spinners'

import { newVerification } from '@/actions/new-verification'
import { CardWrapper } from '@/components/auth/card-wrapper'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'

const NewVerificationForm = () => {
	const [error, setError] = useState<string | undefined>()
	const [success, setSuccess] = useState<string | undefined>()

	const searchParams = useSearchParams()

	const token = searchParams.get('token')

	const onSubmit = useCallback(() => {
		if (!token) {
			setError('Token not found')
			return
		}

		newVerification(token)
			.then((data) => {
				setError(data?.error)
				setSuccess(data?.success)
			})
			.catch(() => {
				setError('Something went wrong')
			})
	}, [token])

	useEffect(() => {
		onSubmit()
	}, [onSubmit])

	return (
		<CardWrapper
			headerLabel='Confirming your verification'
			backButtonLabel='Back to login'
			backButtonHref='/login'
		>
			<div className='w-full text-center'>
				{!error && !success && <BeatLoader />}
				<FormSuccess message={success} />
				<FormError message={error} />
			</div>
		</CardWrapper>
	)
}

export default NewVerificationForm
