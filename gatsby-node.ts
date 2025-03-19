import { GatsbyNode } from 'gatsby'

import path from 'path'

import axios from 'axios'

const apiURL = process.env.GATSBY_BACKEND_URL

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
	actions
}) => {
	actions.setWebpackConfig({
		resolve: {
			alias: {
				'@components': path.resolve(__dirname, 'src/components'),
				'@styles': path.resolve(__dirname, 'src/styles'),
				'@images': path.resolve(__dirname, 'src/images'),
				'@hooks': path.resolve(__dirname, 'src/hooks'),
				'@utils': path.resolve(__dirname, 'src/utils'),
				'@templates': path.resolve(__dirname, 'src/templates')
			}
		}
	})
}

export const createPages: GatsbyNode['createPages'] = async ({ actions }) => {
	const { createPage } = actions

	try {
		const {
			data: { data: getPages }
		} = await axios.get(`${apiURL}/api/pages?populate[0]=avatar`)

		await Promise.all(
			getPages.map(async ({ documentId, slug, profile, biography, avatar }) => {
				createPage({
					path: `/${slug}`,
					component: path.resolve('./src/templates/page.jsx'),
					context: {
						documentId,
						slug,
						profile,
						biography,
						avatar
					}
				})
			})
		)
	} catch (error) {
		console.error('Error fetching data for creating pages:', error)
		throw error
	}
}
