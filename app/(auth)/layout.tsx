import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='h-full flex items-center justify-center bg-radial-[at_50%_75%] from-sky-400 to-blue-800'>
			{children}
		</div>
	)
}

export default AuthLayout
