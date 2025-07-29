import { CardWrapper } from '@/components/auth/card-wrapper'
import { TriangleAlertIcon } from 'lucide-react'

const ErrorCard = () => {
	return (
		<CardWrapper
			headerLabel='Oops! Something went wrong!'
			backButtonHref='/login'
			backButtonLabel='Back to login'
		>
			<div className='w-full text-center'>
				<TriangleAlertIcon className='text-rose-500 w-16 h-16 inline-block' />
			</div>
		</CardWrapper>
	)
}

export default ErrorCard
