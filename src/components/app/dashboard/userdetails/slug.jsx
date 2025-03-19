import React, { useState, useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/profileInfo.module.scss'

// TODO: bedenken wat ik met die slug ga doen voor end-users

const Slug = ({
	docId,
	apiURL,
	token,
	loadingData,
	setError,
	slug,
	setSlug
}) => {
	const [initialValue, setInitialValue] = useState(slug)
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		if (!initialValue) {
			setInitialValue(slug)
		}
	})

	const setSlugHandler = e => {
		setSlug(e.target.value.toLowerCase())
	}

	const submitSlug = async e => {
		e.preventDefault()

		setIsSubmitting(true)

		const params = {
			slug: slug
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

			setError(null)

			if (process.env.NODE_ENV === 'production') {
				await axios.post(
					`https://api.netlify.com/build_hooks/61fd35548a7a1a15735fd2b8`
				)
			}

			setInitialValue(slug)
		} catch {
			setError('Er gaat iets mis met het updaten van je slug')
			setTimeout(() => setError(null), 5000)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={submitSlug} className={styles.profileField}>
			<label htmlFor="slug">Slug</label>
			<input
				onChange={setSlugHandler}
				value={slug}
				type="text"
				name="slug"
				id="slug"
				disabled={loadingData || isSubmitting}
				// placeholder="*verplicht, bijv: 'jouw-profiel'"
				placeholder="*bijv: 'jouw-profiel'"
				maxLength="15"
				pattern="[^\s]+"
				title="geen spaties, alleen '-'"
			/>

			<button
				type="submit"
				title="Sla nieuwe slug op"
				disabled={slug === initialValue || isSubmitting}
			>
				<i className="fa-solid fa-floppy-disk fa-lg" />
			</button>
		</form>
	)
}

export default Slug
