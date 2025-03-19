import { useEffect } from 'react'

import { algoliasearch } from 'algoliasearch'
import axios from 'axios'

import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME } from './keys'

const apiURL = process.env.GATSBY_BACKEND_URL

const Algolia = () => {
	useEffect(() => {
		const indexData = async () => {
			const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY)

			try {
				const response = await axios.get(
					`${apiURL}/api/pages?populate[0]=avatar`
				)
				const records = response.data.data

				const objectsWithID = records.map(record => ({
					objectID: record.documentId,
					...record
				}))

				await client.saveObjects({
					indexName: ALGOLIA_INDEX_NAME,
					objects: objectsWithID
				})
			} catch (error) {
				console.error('Error during indexing:', error)
			}
		}

		indexData()
	}, [])

	return null
}

export default Algolia
