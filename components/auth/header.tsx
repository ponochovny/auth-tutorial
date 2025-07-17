import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'

const font = Poppins({
	weight: ['400', '600'],
	subsets: ['latin'],
})

interface HeaderProps {
	label: string
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<div
			className={cn(
				'w-full flex flex-col gap-y-4 items-center',
				font.className
			)}
		>
			<h1 className='text-3xl font-semibold'>🔐Auth</h1>
			<p className='text-muted-foreground text-sm'>{label}</p>
		</div>
	)
}
