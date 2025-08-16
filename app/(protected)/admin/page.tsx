// 'use client'

import { userRole } from '@/lib/auth'

// import { useUserRole } from '@/hooks/use-user-role'

const AdminPage = async () => {
	// const role = useUserRole()
	const role = await userRole()

	return <div>Current role: {role}</div>
}

export default AdminPage
