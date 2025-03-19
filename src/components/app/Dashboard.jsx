import React, { useState, useEffect, useCallback } from 'react'

import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'

import axios from 'axios'

import Seo from '../seo'

import { getUser, logout, isLoggedIn } from '../../services/auth'

import Sidebar from './dashboard/sidebar'
import Preview from './dashboard/preview'
import Avatar from './dashboard/userinfo/avatar'
import Profile from './dashboard/userinfo/profile'
import Username from './dashboard/userdetails/username'
import Email from './dashboard/userdetails/email'
import Slug from './dashboard/userdetails/slug'
import Password from './dashboard/userdetails/password'
import Terminate from './dashboard/userdetails/terminate'
import Occupation from './dashboard/userinfo/occupation'
import Biography from './dashboard/userinfo/biography'
import Telephone from './dashboard/userinfo/telephone'
import Mail from './dashboard/userinfo/email'
import Address from './dashboard/userinfo/address'
import Facebook from './dashboard/socials/facebook'
import Twitter from './dashboard/socials/twitter'
import Instagram from './dashboard/socials/instagram'
import Whatsapp from './dashboard/socials/whatsapp'
import TikTok from './dashboard/socials/tiktok'
import Linkedin from './dashboard/socials/linkedin'
import Pinterest from './dashboard/socials/pinterest'
import Snapchat from './dashboard/socials/snapchat'
import Youtube from './dashboard/socials/youtube'
import Patreon from './dashboard/socials/patreon'
import Links from './dashboard/userinfo/links'
import Themes from './dashboard/themes'
import AdsLink from './dashboard/adslink'

import noavatar from '../../images/noavatar.png'

import * as styles from '../../styles/modules/dashboard.module.scss'

const SuccessMessage = ({ text }) => {
	return (
		<div className={styles.logsuccess}>
			<span>{text}</span>
		</div>
	)
}

const ErrorMessage = ({ text }) => {
	return (
		<div className={styles.logerror}>
			<span>{text}</span>
		</div>
	)
}

const DashboardPage = () => {
	useEffect(() => {
		if (!isLoggedIn()) {
			navigate('/login/')
		}
	}, [])

	const location = useLocation()

	const apiURL = process.env.GATSBY_BACKEND_URL
	const baseURL = location.origin

	const adsUser = getUser()
	const token = adsUser.jwt

	const [userId, setUserId] = useState(null)
	const [pageId, setPageId] = useState(null)
	const [docId, setDocId] = useState(null)

	const [avatar, setAvatar] = useState(null)
	const [avatarId, setAvatarId] = useState(null)
	const [preview, setPreview] = useState(noavatar)

	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(null)
	const [linkError, setLinkError] = useState(null)
	const [loadingData, setLoadingData] = useState(false)

	const [profile, setProfile] = useState('')
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [slug, setSlug] = useState('')

	const [occupation, setOccupation] = useState('')
	const [biography, setBiography] = useState('')

	const [telephone, setTelephone] = useState('')
	const [mail, setMail] = useState('')
	const [address, setAddress] = useState({
		location: '',
		latitude: '',
		longitude: ''
	})

	const [fbLink, setFbLink] = useState('')
	const [twLink, setTwLink] = useState('')
	const [igLink, setIgLink] = useState('')
	const [waLink, setWaLink] = useState('')
	const [tkLink, setTkLink] = useState('')
	const [liLink, setLiLink] = useState('')
	const [piLink, setPiLink] = useState('')
	const [snLink, setSnLink] = useState('')
	const [ytLink, setYtLink] = useState('')
	const [paLink, setPaLink] = useState('')

	const [smLinks, setSmLinks] = useState({
		facebook: '',
		twitter: '',
		instagram: '',
		whatsapp: '',
		tiktok: '',
		linkedin: '',
		pinterest: '',
		snapchat: '',
		youtube: '',
		patreon: ''
	})

	const [changedSmLinks, setChangedSmLinks] = useState({})

	const [links, setLinks] = useState([])

	const [color, setColor] = useState('')

	axios.interceptors.response.use(
		response => {
			return response
		},
		error => {
			if (error.response.status === 401) {
				logout(() => navigate('/login/'))
				console.log('unauthorized, logging out ...')
			}
		}
	)

	const getUserData = useCallback(async () => {
		setLoadingData(true)

		try {
			const res = await axios.get(
				`${apiURL}/api/users/me?populate[page][populate][0]=address&populate[page][populate][1]=avatar`,
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			)

			setUserId(res.data.id)
			setPageId(res.data.page.id)
			setDocId(res.data.page.documentId)

			setProfile(res.data.page.profile)
			setUsername(res.data.username)
			setEmail(res.data.email)

			setSlug(res.data.page.slug)

			setOccupation(res.data.page.occupation || '')
			setBiography(res.data.page.biography || '')
			setTelephone(res.data.page.telephone || '')
			setMail(res.data.page.email || '')

			setFbLink(res.data.page.facebook || '')
			setIgLink(res.data.page.instagram || '')
			setLiLink(res.data.page.linkedin || '')
			setTkLink(res.data.page.tiktok || '')
			setTwLink(res.data.page.twitter || '')
			setWaLink(res.data.page.whatsapp || '')
			setPiLink(res.data.page.pinterest || '')
			setSnLink(res.data.page.snapchat || '')
			setYtLink(res.data.page.youtube || '')
			setPaLink(res.data.page.patreon || '')

			setColor(res.data.page.theme)

			if (res.data.page.address) {
				setAddress({
					location: res.data.page.address.location || '',
					latitude: res.data.page.address.latitude || 0,
					longitude: res.data.page.address.longitude || 0
				})
			}

			if (!res.data.page.avatar) {
				setPreview(noavatar)
				setAvatar(null)
			} else {
				setAvatar(res.data.page.avatar.url)
				setPreview(res.data.page.avatar.url)
				setAvatarId(res.data.page.avatar.id)
			}
		} catch (error) {
			console.error('Error fetching user ID:', error)
			setError('Er gaat iets mis met het ophalen van je gegevens')
		} finally {
			setLoadingData(false)
		}
	}, [apiURL, token])

	useEffect(() => {
		getUserData()
	}, [getUserData])

	const handleSmLinkChange = (name, value) => {
		setSmLinks(prevLinks => ({ ...prevLinks, [name]: value }))

		setChangedSmLinks(prevChangedLinks => ({
			...prevChangedLinks,
			[name]: true
		}))
	}

	const handleSaveSocials = async () => {
		let allUpdatesSuccessful = true

		for (const [name, hasChanged] of Object.entries(changedSmLinks)) {
			if (hasChanged) {
				const params = { [name]: smLinks[name] }

				try {
					await axios.put(
						`${apiURL}/api/pages/${docId}`,
						{ data: params },
						{ headers: { Authorization: `Bearer ${token}` } }
					)
					setError(null)
				} catch {
					setError(`Something went wrong updating your ${name} link`)
					setTimeout(() => setError(null), 5000)
					allUpdatesSuccessful = false
				}

				setChangedSmLinks(prevChangedLinks => ({
					...prevChangedLinks,
					[name]: false
				}))
			}
		}

		if (allUpdatesSuccessful) {
			setSmLinks({
				facebook: '',
				twitter: '',
				instagram: '',
				whatsapp: '',
				tiktok: '',
				linkedin: '',
				pinterest: '',
				snapchat: '',
				youtube: '',
				patreon: ''
			})
		}
	}

	const areAllSmLinksEmpty = () => {
		for (const link of Object.values(smLinks)) {
			if (link.trim() !== '') {
				return false
			}
		}
		return true
	}

	return (
		<div className={`${styles.gridContainer}`}>
			{/* SIDEBAR SIDEBAR SIDEBAR SIDEBAR SIDEBAR <--------------------------------------------------------------------------------> SIDEBAR SIDEBAR SIDEBAR SIDEBAR SIDEBAR */}

			<aside id="ads-sidebar" className={styles.sidebar}>
				<Sidebar profile={profile} loadingData={loadingData} />
			</aside>

			{/* PREVIEW PREVIEW PREVIEW PREVIEW PREVIEW <--------------------------------------------------------------------------------> PREVIEW PREVIEW PREVIEW PREVIEW PREVIEW */}

			<section id="ads-preview" className={styles.preview}>
				<Preview
					preview={preview}
					profile={profile}
					occupation={occupation}
					biography={biography}
					telephone={telephone}
					mail={mail}
					links={links}
					fbLink={fbLink}
					twLink={twLink}
					igLink={igLink}
					waLink={waLink}
					tkLink={tkLink}
					liLink={liLink}
					piLink={piLink}
					snLink={snLink}
					ytLink={ytLink}
					paLink={paLink}
					color={color}
					loadingData={loadingData}
				/>
			</section>

			{/* DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD <-------------------------------------------------------> DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD */}

			<section id="ads-dashboard" className={styles.dashboard}>
				<h2>Profiel Info</h2>

				<div className={styles.avatarWProfileInfo}>
					<Avatar
						pageId={pageId}
						docId={docId}
						avatarId={avatarId}
						apiURL={apiURL}
						token={token}
						noavatar={noavatar}
						preview={preview}
						setPreview={setPreview}
						avatar={avatar}
						setAvatar={setAvatar}
						setSuccess={setSuccess}
						loadingData={loadingData}
					/>

					{/* PROFILE INFO ROFILE INFO PROFILE INFO PROFILE INFO <-----------------------------------------------------------> PROFILE INFO PROFILE INFO PROFILE INFO PROFILE INFO */}

					<div className={styles.profileInfo}>
						<Profile
							docId={docId}
							apiURL={apiURL}
							token={token}
							profile={profile}
							setProfile={setProfile}
							setSuccess={setSuccess}
							setValidationMessage={setError}
							loadingData={loadingData}
						/>

						<Username
							userId={userId}
							apiURL={apiURL}
							token={token}
							username={username}
							setUsername={setUsername}
							setSuccess={setSuccess}
							setValidationMessage={setError}
							loadingData={loadingData}
						/>

						<Email
							userId={userId}
							apiURL={apiURL}
							token={token}
							email={email}
							setEmail={setEmail}
							setSuccess={setSuccess}
							setValidationMessage={setError}
							loadingData={loadingData}
						/>

						<Slug
							docId={docId}
							apiURL={apiURL}
							token={token}
							slug={slug}
							setSlug={setSlug}
							setError={setError}
							loadingData={loadingData}
						/>

						{/* TODO: setSucces toevoegen */}
						<Password
							userId={userId}
							apiURL={apiURL}
							token={token}
							password={password}
							setPassword={setPassword}
							setError={setError}
							loadingData={loadingData}
						/>

						{/* TODO: gehele delete functie nog aanpakken */}
						<Terminate
							pageId={pageId}
							setPageId={setPageId}
							docId={docId}
							userId={userId}
							setUserId={setUserId}
							apiURL={apiURL}
							token={token}
							links={links}
							username={username}
							loadingData={loadingData}
							setError={setError}
						/>
					</div>
				</div>

				{success && <SuccessMessage text={success} />}
				{error && <ErrorMessage text={error} />}

				<div className={styles.occupationWBio}>
					<Occupation
						docId={docId}
						apiURL={apiURL}
						token={token}
						occupation={occupation}
						setOccupation={setOccupation}
						setError={setError}
					/>

					<Biography
						docId={docId}
						apiURL={apiURL}
						token={token}
						biography={biography}
						setBiography={setBiography}
						setSuccess={setSuccess}
						setValidationMessage={setError}
						loadingData={loadingData}
					/>
				</div>

				<hr />

				<h2>Contact Info</h2>

				<div className={styles.contactInfo}>
					<Telephone
						docId={docId}
						apiURL={apiURL}
						token={token}
						telephone={telephone}
						setTelephone={setTelephone}
						setSuccess={setSuccess}
						setValidationMessage={setError}
						loadingData={loadingData}
					/>

					<Mail
						docId={docId}
						apiURL={apiURL}
						token={token}
						mail={mail}
						setMail={setMail}
						setSuccess={setSuccess}
						setValidationMessage={setError}
						loadingData={loadingData}
					/>
				</div>

				<Address
					docId={docId}
					apiURL={apiURL}
					token={token}
					preview={preview}
					address={address}
					setAddress={setAddress}
					setSuccess={setSuccess}
					setValidationMessage={setError}
					loadingData={loadingData}
				/>

				<hr />

				{/* SOCIAL CONT SOCIAL CONT SOCIAL CONT SOCIAL CONT <-------------------------------------------------------> SOCIAL CONT SOCIAL CONT SOCIAL CONT SOCIAL CONT SOCIAL CONT */}

				<h2>Social Links</h2>

				<div className={styles.socials}>
					<Facebook
						fbLink={fbLink}
						setFbLink={setFbLink}
						handleSmLinkChange={handleSmLinkChange}
						loadingData={loadingData}
					/>

					<Twitter
						twLink={twLink}
						setTwLink={setTwLink}
						handleSmLinkChange={handleSmLinkChange}
						loadingData={loadingData}
					/>

					<Instagram
						igLink={igLink}
						setIgLink={setIgLink}
						handleSmLinkChange={handleSmLinkChange}
						loadingData={loadingData}
					/>

					<Whatsapp
						waLink={waLink}
						setWaLink={setWaLink}
						handleSmLinkChange={handleSmLinkChange}
						loadingData={loadingData}
					/>

					<TikTok
						tkLink={tkLink}
						setTkLink={setTkLink}
						handleSmLinkChange={handleSmLinkChange}
						loadingData={loadingData}
					/>

					<Linkedin
						liLink={liLink}
						setLiLink={setLiLink}
						handleSmLinkChange={handleSmLinkChange}
						loadingData={loadingData}
					/>

					<Pinterest
						piLink={piLink}
						setPiLink={setPiLink}
						handleSmLinkChange={handleSmLinkChange}
						loadingData={loadingData}
					/>

					<Snapchat
						snLink={snLink}
						setSnLink={setSnLink}
						handleSmLinkChange={handleSmLinkChange}
						loadingData={loadingData}
					/>

					<Youtube
						ytLink={ytLink}
						setYtLink={setYtLink}
						handleSmLinkChange={handleSmLinkChange}
						loadingData={loadingData}
					/>

					<Patreon
						paLink={paLink}
						setPaLink={setPaLink}
						handleSmLinkChange={handleSmLinkChange}
						loadingData={loadingData}
					/>
				</div>

				<button
					className={styles.dashBtn}
					onClick={handleSaveSocials}
					disabled={areAllSmLinksEmpty()}
				>
					Opslaan
				</button>

				<hr />

				{/* ADD LINK SECTIE ADD LINK SECTIE ADD LINK SECTIE ADD LINK SECTIE <--------------------------------------------------> ADD LINK SECTIE ADD LINK SECTIE ADD LINK SECTIE */}

				<h2>Link Lijst</h2>

				<Links
					userId={userId}
					pageId={pageId}
					docId={docId}
					apiURL={apiURL}
					token={token}
					setError={setError}
					links={links}
					setLinks={setLinks}
					setTkLink={setTkLink}
					linkError={linkError}
					setLinkError={setLinkError}
				/>

				<hr />

				{/* CHOOSE COLOR CHOOSE COLOR CHOOSE COLOR CHOOSE COLOR <------------------------------------------------------>  CHOOSE COLOR CHOOSE COLOR CHOOSE COLOR CHOOSE COLOR*/}

				<h2>Thema's</h2>

				<Themes
					docId={docId}
					apiURL={apiURL}
					token={token}
					color={color}
					setColor={setColor}
					links={links}
				/>
			</section>

			{/* SLUG LINK SLUG LINK SLUG LINK SLUG LINK SLUG LINK <-----------------------------------------------> SLUG LINK SLUG LINK SLUG LINK SLUG LINK SLUG LINK */}

			<aside className={`${styles.slug}`}>
				<AdsLink slug={slug} baseURL={baseURL} />
			</aside>
		</div>
	)
}

export default DashboardPage

export const Head = () => {
	return <Seo title="Dashboard" />
}
