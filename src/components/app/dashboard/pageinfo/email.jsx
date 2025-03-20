import React, { useState, useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/profileInfo.module.scss'

const Mail = ({
	docId,
	apiURL,
	token,
	setSuccess,
	mail,
	setMail,
	loadingData,
	setValidationMessage
}) => {
	const [initialValue, setInitialValue] = useState(mail)
	const [validationError, setValidationError] = useState(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		if (!initialValue) {
			setInitialValue(mail)
		}
	})

	const setMailHandler = e => {
		setMail(e.target.value.toLowerCase())
		setValidationError(null)
		setValidationMessage(null)
	}

	const validateInput = value => {
		if (value.length < 2) {
			const errorMessage = 'Minstens 2 karakters'
			setValidationError(errorMessage)
			setValidationMessage(errorMessage)
			return false
		}
		const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

		if (!regex.test(value)) {
			const errorMessage = 'Voer een geldig e-mailadres in.'
			setValidationError(errorMessage)
			setValidationMessage(errorMessage)
			return false
		}

		setValidationError(null)
		setValidationMessage(null)
		return true
	}

	const submitMail = async e => {
		e.preventDefault()

		if (!validateInput(mail)) {
			return
		}

		setIsSubmitting(true)

		const params = {
			email: mail
		}
		try {
			await axios.put(
				`${apiURL}/api/pages/${docId}`,
				{ data: params },
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)

			setSuccess('E-mailadres succesvol geüpdatet')
			setTimeout(() => setSuccess(null), 5000)
			setInitialValue(mail)
		} catch (error) {
			console.error('Error updating telephone:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={submitMail} className={styles.profileField} noValidate>
			<label htmlFor="mail">E-mailadres</label>
			<input
				id="mail"
				type="email"
				name="telephone"
				placeholder="voorbeeld@email.nl"
				value={mail}
				onChange={setMailHandler}
				disabled={loadingData || isSubmitting}
				style={{ color: validationError ? '#CA231E' : 'inherit' }}
			/>
			<button
				type="submit"
				title="Sla e-mailadres op"
				disabled={mail === initialValue || isSubmitting}
			>
				<i className="fa-solid fa-floppy-disk fa-lg" />
			</button>
		</form>
	)
}

export default Mail
