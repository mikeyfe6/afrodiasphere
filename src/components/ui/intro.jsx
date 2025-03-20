import * as React from 'react'

import { Link } from 'gatsby'

import mamaAfrica from '../../images/mamafrica.png'

import * as styles from '../../styles/modules/ui/intro.module.scss'

const Intro = () => (
	<section className={styles.intro}>
		<div>
			<h1>Afrodiasphere</h1>
			<h2>Een efficiente oplossing voor het delen van contactinformatie</h2>
			<p>
				<small>
					Creeer jouw ADS-account & JOIN THE MOVEMENT <span>!</span>
				</small>{' '}
				Klik{' '}
				<Link to="/login/">s
					<button title="Ga naar inloggen / registreren" type="button">
						hier
					</button>
				</Link>{' '}
				om in te loggen <span>/</span> registreren..
			</p>
		</div>
		<img src={mamaAfrica} alt="" />
	</section>
)

export default Intro
