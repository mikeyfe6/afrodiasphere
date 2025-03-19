import * as React from 'react'

import * as styles from '../../../../styles/modules/dashboard/socials.module.scss'

const Pinterest = ({ ytLink, setYtLink, handleSmLinkChange, loadingData }) => {
	const setYtHandler = e => {
		const newYtLink = e.target.value.toLowerCase()
		setYtLink(newYtLink)

		handleSmLinkChange('youtube', newYtLink)
	}

	return (
		<form className={styles.socialField}>
			<div>
				<label htmlFor="ytlink">
					<i className="fa-brands fa-youtube" style={{ color: '#F70001' }} />
					youtube.com/
				</label>
				<input
					id="ytlink"
					name="ytlink"
					type="text"
					placeholder="jouwprofiel"
					value={ytLink}
					onChange={setYtHandler}
					disabled={loadingData}
				/>
			</div>
		</form>
	)
}

export default Pinterest
