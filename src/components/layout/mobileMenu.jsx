import React, { useRef, useState, useEffect } from 'react'

import { Link, navigate } from 'gatsby'

import { isLoggedIn, logout, isBrowser, getUser } from '../../services/auth'

import Search from '../algolia/search'

import * as styles from '../../styles/modules/layout/mobilemenu.module.scss'

const MobileMenu = ({ isMenuOpen, setMenuOpen }) => {
	const adsUser = getUser()
	const initialScrollY = useRef(window.scrollY)
	const [searchVisible, setSearchVisible] = useState(false)
	const [hasFocus, setFocus] = useState(false)
	const searchIconRef = useRef(null)

	const toggleMenu = () => {
		if (!isMenuOpen) {
			initialScrollY.current = window.scrollY
		}
		setMenuOpen(!isMenuOpen)

		if (!isMenuOpen) {
			setTimeout(() => {
				setMenuOpen(false)
			}, 6000)
		}
	}

	const toggleSearchVisibility = event => {
		event.preventDefault()

		setSearchVisible(prevState => !prevState)
		setFocus(prevState => !prevState)

		const searchInput = document.querySelector('.ais-SearchBox-input')

		if (searchInput) {
			if (!searchVisible) {
				searchInput.focus()
			} else {
				searchInput.blur()
			}
		}
	}

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > initialScrollY.current + 250) {
				setMenuOpen(false)
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [isMenuOpen])

	return (
		<header className={styles.mobileMenuContainer}>
			<button className={styles.hamburger} onClick={toggleMenu}>
				<i className="fa-solid fa-bars fa-lg" />
			</button>

			<div className={`mobile-search ${searchVisible ? 'open' : ''}`}>
				<i
					className="fa-solid fa-search fa-lg"
					ref={searchIconRef}
					onClick={toggleSearchVisibility}
				/>
				<Search
					style={{ display: searchVisible ? 'block' : 'none' }}
					hasFocus={hasFocus}
					setFocus={setFocus}
					setSearchVisible={setSearchVisible}
					ignoreRef={searchIconRef}
				/>
			</div>

			<div className={styles.username} id="ads-username">
				{isLoggedIn() && isBrowser() ? (
					<Link to={`/${adsUser.user.username}/`} title="Ga naar jouw ADS page">
						{adsUser.user.username}{' '}
					</Link>
				) : (
					<Link to="/login/" title="Inloggen">
						Log in / Registreer
					</Link>
				)}
			</div>

			<div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
				<ul>
					<li>
						<Link to="/" title="Homepage" activeStyle={{ color: '#cc9932' }}>
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
				</ul>
			</div>

			<div className={styles.mobileMenuOverlay} />
		</header>
	)
}

export default MobileMenu
