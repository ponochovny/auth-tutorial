'use client'

import { FaUser, FaSignOutAlt } from 'react-icons/fa'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useCurrentUser } from '@/hooks/use-current-user'
import LogoutButton from './logout-button'

const UserButton = () => {
	const user = useCurrentUser()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar>
					<AvatarImage src={user?.image || ''} />
					<AvatarFallback className='bg-sky-500'>
						<FaUser className='text-white' />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-40' align='end'>
				<LogoutButton>
					<DropdownMenuItem>
						<FaSignOutAlt className='h-4 w-4' />
						Logout
					</DropdownMenuItem>
				</LogoutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserButton
