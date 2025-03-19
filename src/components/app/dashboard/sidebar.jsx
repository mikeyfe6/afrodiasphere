import * as React from 'react'

// import * as styles from '../../styles/modules/dashboard/sidebar.module.scss'

const Sidebar = ({ profile, loadingData }) => {
	return (
		<>
			<h5 style={{ filter: loadingData ? 'blur(2px)' : 'none' }}>
				Hallo, {profile}
			</h5>

			{/* <button
						href="#"
						title="Uitloggen"
						onClick={e => {
							e.preventDefault()
							logout(() => navigate('/login'))
						}}
					>
						Log uit
					</button> */}
		</>
	)
}

export default Sidebar
