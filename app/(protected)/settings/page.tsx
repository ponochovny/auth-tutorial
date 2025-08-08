'use client'

import { logout } from '@/actions/logout'
// import { useCurrentUser } from '@/hooks/use-current-user'
// import { signOut, useSession } from 'next-auth/react'

const SettingsPage = () => {
	// const session = useSession()
	// const user = useCurrentUser()

	const onClick = () => {
		// signOut()
		logout()
	}

	return (
		<div className='flex flex-col gap-y-4 p-10 bg-white rounded-3xl'>
			{/* <pre>{JSON.stringify(session)}</pre> */}
			{/* <pre>{JSON.stringify(user)}</pre> */}
			<button type='button' onClick={onClick}>
				Sign out
			</button>
		</div>
	)
}

export default SettingsPage
