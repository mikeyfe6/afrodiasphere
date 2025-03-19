import * as React from 'react'

import * as styles from '../styles/modules/spinner.module.scss' // Import your spinner styles

const Spinner = () => (
	<div className={styles.spinnerContainer}>
		<div className={styles.spinner}></div>
	</div>
)

export default Spinner
