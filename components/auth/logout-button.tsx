'use client'

import { logout } from '@/actions/logout'

interface LogoutButtonProps {
	children?: React.ReactNode
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
	const onClick = async () => {
		logout()
	}

	return (
		<span onClick={onClick} className='cursor-pointer'>
			{children}
		</span>
	)
}

export default LogoutButton
