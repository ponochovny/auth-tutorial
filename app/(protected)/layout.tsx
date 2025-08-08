import Navbar from './_components/Navbar'

interface Props {
	children: React.ReactNode
}

const ProtectedLayout = ({ children }: Props) => {
	return (
		<div className='h-full w-full flex flex-col gap-y-10 items-center justify-center bg-radial-[at_50%_75%] from-sky-400 to-blue-800'>
			<Navbar />
			{children}
		</div>
	)
}

export default ProtectedLayout
