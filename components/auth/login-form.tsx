'use client'

import * as z from 'zod'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import { CardWrapper } from '@/components/auth/card-wrapper'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { LoginSchema } from '@/schemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { login } from '@/actions/login'
import { cn } from '@/lib/utils'

const LoginForm = () => {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl')
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email already in use with different provider!'
			: ''

	const [showTwoFactor, setShowTwoFactor] = useState(false)

	const [error, setError] = useState<string | undefined>()
	const [success, setSuccess] = useState<string | undefined>()

	const [isPending, startTransition] = useTransition()
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
			code: '',
		},
	})

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('')
		setSuccess('')

		startTransition(() => {
			login(values, callbackUrl)
				.then((data) => {
					if (data?.error) {
						form.reset()
						setError(data.error)
					}
					if (data?.success) {
						form.reset()
						setSuccess(data.success)
					}
					if (data?.twoFactor) {
						setShowTwoFactor(true)
					}
				})
				.catch(() => {
					setError('Something went wrong')
				})
		})
	}

	return (
		<CardWrapper
			headerLabel={showTwoFactor ? 'Two-factor authentication' : 'Welcome back'}
			backButtonLabel="Don't have an account?"
			backButtonHref='/register'
			showSocial
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-4'>
						{showTwoFactor && (
							<FormField
								control={form.control}
								name='code'
								disabled={isPending}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Two-factor code</FormLabel>
										<FormControl>
											<Input {...field} placeholder='123456' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<div className={cn({ hidden: showTwoFactor }, 'space-y-4')}>
							<FormField
								control={form.control}
								name='email'
								disabled={isPending}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder='john.doe@example.com'
												disabled={showTwoFactor}
												type='email'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								disabled={isPending}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder='********'
												disabled={showTwoFactor}
												type='password'
											/>
										</FormControl>
										<Button
											size='sm'
											variant='link'
											asChild
											className='px-0 font-normal justify-self-start'
										>
											<Link href='/reset-password'>Forgot password</Link>
										</Button>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<FormError message={error || urlError || ''} />
					<FormSuccess message={success || ''} />
					<Button type='submit' disabled={isPending} className='w-full'>
						{showTwoFactor ? 'Submit code' : 'Login'}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}

export default LoginForm
