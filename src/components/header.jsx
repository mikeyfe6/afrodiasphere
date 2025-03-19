import React, { useState } from 'react'

import { Link, navigate } from 'gatsby'

import PropTypes from 'prop-types'

import { isLoggedIn, logout, isBrowser, getUser } from '../services/auth'

import Search from './algolia/search'

import afroLogo from '../images/afrodiasphere-logo.png'

import * as styles from '../styles/modules/header.module.scss'

const Header = () => {
	const adsUser = getUser()
	const [hasFocus, setFocus] = useState(false)

	return (
		<header className={styles.navbar}>
			<div className={styles.navbarWrapper}>
				{/* <Link to="/" title="Ga naar homepagina">
					<AfroLogo fill="#cc9932" width="75" />
				</Link> */}

				<Link to="/">
					<img src={afroLogo} alt="" />
				</Link>

				{isLoggedIn() && isBrowser() && (
					<div className={styles.loggedUser}>
						<Link
							to={`/${adsUser.user.username}/`}
							title="Ga naar jouw ADS page"
							activeStyle={{ color: '#cc9932' }}
						>
							{adsUser.user.username}{' '}
						</Link>
					</div>
				)}

				<nav>
					<Search hasFocus={hasFocus} setFocus={setFocus} />

					<ul>
						<li>
							<Link
								to="/"
								title="Afrodiasphere"
								activeStyle={{ color: '#cc9932' }}
							>
								Home
							</Link>
						</li>

						{isLoggedIn() && isBrowser() && (
							<li>
								<Link
									to="/dashboard/"
									activeStyle={{ color: '#cc9932' }}
									title="Dashboard"
								>
									Dashboard
								</Link>
							</li>
						)}

						<li>
							{isLoggedIn() && isBrowser() ? (
								<button
									onClick={e => {
										e.preventDefault()
										logout(() => navigate('/login/'))
									}}
									href="#"
									title="Uitloggen"
								>
									Log uit
								</button>
							) : (
								<Link
									to="/login/"
									title="Inloggen"
									activeStyle={{ color: '#cc9932' }}
								>
									Inloggen
								</Link>
							)}
						</li>

						<li>
							<a
								href="https://menefex.nl"
								rel="noopener noreferrer"
								target="_blank"
								title="Menefex WMB"
							>
								<strong>
									<i style={{ fontStyle: 'italic' }}>MNFX</i>
								</strong>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

Header.propTypes = {
	siteTitle: PropTypes.string
}

Header.defaultProps = {
	siteTitle: ``
}

export default Header
