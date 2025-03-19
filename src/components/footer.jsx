import * as React from 'react'

import { Link } from 'gatsby'

import menefexLogo from '../images/menefex-icon.png'

import * as styles from '../styles/modules/footer.module.scss'

const Footer = () => (
	<footer className={styles.adsFooter}>
		© 2022 - {new Date().getFullYear()} Afrodiasphere・{' '}
		<a href="mailto:feedback@menefex.nl" title="Stuur feedback naar Menefex">
			Feedback
		</a>{' '}
		・
		<Link to="/faq/" title="Veelgestelde vragen">
			FAQ
		</Link>{' '}
		・Powered by{' '}
		<a href="https://menefex.nl" rel="noopener noreferrer" target="_blank">
			{''}
			<b> Menefex </b> <img src={menefexLogo} alt="menefex logo" />
		</a>
	</footer>
)

export default Footer
