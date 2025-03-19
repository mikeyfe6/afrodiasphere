import * as React from 'react'

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
	const setSlugHandler = e => {
		setSlug(e.target.value.toLowerCase())
	}

	const submitSlug = async e => {
		e.preventDefault()

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
		} catch {
			setError('Er gaat iets mis met het updaten van je slug')
			setTimeout(() => setError(null), 5000)
		}
	}

	return (
		<form onSubmit={submitSlug} className={styles.profileField} hidden>
			<label htmlFor="slug">Slug</label>
			<input
				onChange={setSlugHandler}
				value={slug}
				type="text"
				name="slug"
				id="slug"
				disabled={loadingData}
				// placeholder="*verplicht, bijv: 'jouw-profiel'"
				placeholder="*bijv: 'jouw-profiel'"
				maxLength="15"
				pattern="[^\s]+"
				title="geen spaties, alleen '-'"
			/>

			<button
				type="submit"
				title="Sla nieuwe slug op"
				className={styles.updateBtn}
				disabled={loadingData || slug === ''}
			>
				<i className="fa-solid fa-floppy-disk fa-lg" />
			</button>
		</form>
	)
}

export default Slug
