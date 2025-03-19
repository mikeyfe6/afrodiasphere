import React, { useState, useRef } from 'react'

import { navigate } from 'gatsby'

import axios from 'axios'

import * as styles from '../styles/modules/resetPwd.module.scss'

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

const ResetPwd = () => {
	const confCodeRef = useRef()
	const passwordResetRef = useRef()
	const confPasswordResetRef = useRef()

	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(null)

	const handleSubmitRegister = async e => {
		e.preventDefault()

		try {
			await axios.post(`${apiURL}/api/auth/reset-password`, {
				code: confCodeRef.current.value,
				password: passwordResetRef.current.value,
				passwordConfirmation: confPasswordResetRef.current.value
			})
			setLoading('Aan het laden')
			setError(null)
			navigate('/login')
		} catch {
			setLoading(null)
			setError("Verkeerde invoer, probeer 't opnieuw")
			setTimeout(() => setError(null), 5000)
		}
	}

	return (
		<form onSubmit={handleSubmitRegister} className={styles.resetPwdForm}>
			<input
				ref={confCodeRef}
				type="text"
				name="code"
				placeholder="Verificatiecode"
			/>
			<br />
			<input
				ref={passwordResetRef}
				size="35"
				type="password"
				name="password"
				placeholder="Voer een nieuw wachtwoord in"
				pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
				autoComplete="new-password"
				title="Moet op z'n minst 1 nummer, 1 hoofdletter, 1 klein letter en 8 karakters lang zijn."
			/>
			<br />
			<input
				ref={confPasswordResetRef}
				size="35"
				type="password"
				name="confirmpassword"
				placeholder="Voer jouw nieuwe wachtwoord opnieuw in"
			/>
			<button>Verstuur</button>
			{error && <ErrorMessage text={error} />}
			{loading && <LoadingMessage text={loading} />}
		</form>
	)
}

export default ResetPwd
