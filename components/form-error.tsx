import { CircleAlertIcon } from 'lucide-react'

interface FormErrorProps {
	message?: string
}

const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null

	return (
		<div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
			<CircleAlertIcon className='w-4 h-4' />
			<p>{message}</p>
		</div>
	)
}

export default FormError
