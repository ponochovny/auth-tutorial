import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LoginButton } from '@/components/auth/login-button'

const font = Poppins({
	weight: ['600'],
	subsets: ['latin'],
})

export default function Home() {
	return (
		<main className='flex h-full flex-col items-center justify-center bg-radial-[at_50%_75%] from-sky-400 to-blue-800 space-y-6'>
			<h1
				className={cn(
					'text-6xl font-semibold text-white drop-shadow-md',
					font.className
				)}
			>
				🔐Auth
			</h1>
			<p className='text-white text-lg'>A simple authentication service</p>
			<LoginButton>
				<Button variant='secondary' size='lg'>
					Sign In
				</Button>
			</LoginButton>
		</main>
	)
}
