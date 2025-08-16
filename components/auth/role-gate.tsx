import { useUserRole } from '@/hooks/use-user-role'
import { UserRole } from '@/lib/generated/prisma'
import FormError from '@/components/form-error'

interface RoleGateProps {
	children: React.ReactNode
	allowedRole: UserRole
}

const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
	const role = useUserRole()

	if (role !== allowedRole) {
		return <FormError message="You don't have access to this page" />
	}

	return <>{children}</>
}

export default RoleGate
