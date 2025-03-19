import React, { useState, useRef } from 'react'

import { navigate } from 'gatsby'

import axios from 'axios'

import * as styles from '../styles/modules/forgetPwd.module.scss'

const apiURL = process.env.GATSBY_BACKEND_URL

const ErrorMessage = ({ text }) => {
	return (
		<div className={styles.logerror}>
			<span>{text}</span>
		</div>
	)
}

const LoadingMessage = ({ text }) => {
	return (
		<div className={styles.loadingmsg}>
			<span>{text}</span>
		</div>
	)
}

const ForgetPwd = () => {
	const emailResetRef = useRef()

	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(null)

	const handleSubmitRegister = async e => {
		e.preventDefault()

		try {
			await axios.post(`${apiURL}/api/auth/forgot-password`, {
				email: emailResetRef.current.value
			})
			setLoading('Aan het laden')
			setError(null)
			navigate('/wachtwoord-reset/')
		} catch {
			setLoading(null)
			setError("Verkeerde invoer, probeer 't opnieuw")
			setTimeout(() => setError(null), 5000)
		}
	}

	return (
		<form onSubmit={handleSubmitRegister} className={styles.forgetPwdForm}>
			<input
				ref={emailResetRef}
				type="email"
				name="emailRes"
				placeholder="info@voorbeeld.nl"
				style={{ textTransform: 'lowercase' }}
				pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
			/>
			<button type="submit">Verstuur</button>

			{error && <ErrorMessage text={error} />}
			{loading && <LoadingMessage text={loading} />}
		</form>
	)
}

export default ForgetPwd
