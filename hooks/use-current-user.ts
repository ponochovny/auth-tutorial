import { useSession } from 'next-auth/react'

export const useCurrentUser = () => {
	const { data, status, update } = useSession()

	if (status === 'unauthenticated') update()

	return data?.user
}
