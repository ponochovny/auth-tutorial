const SettingsPage = async () => {
	const users = await new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{ id: 1, name: 'John Doe' },
				{ id: 2, name: 'Jane Doe' },
			])
		}, 1000)
	})

	return (
		<div>
			<p>SettingsPage</p>
			{JSON.stringify(users)}
		</div>
	)
}

export default SettingsPage
