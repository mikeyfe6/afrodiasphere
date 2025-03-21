import type { GatsbyConfig } from 'gatsby'

require('dotenv').config({
	// path: `.env.${process.env.NODE_ENV}`,
	path: '.env'
})

const config: GatsbyConfig = {
	graphqlTypegen: true,
	siteMetadata: {
		siteUrl: `https://afrodiasphere.com`,
		title: `Afrodiasphere`,
		author: 'Michael Fransman',
		description: `Een efficiente oplossing voor het delen van contactinformatie`,
		image: '/ads-logo.png'
	},
	plugins: [
		{
			resolve: 'gatsby-plugin-google-tagmanager',
			options: {
				id: 'GTM-PRN53H8',
				includeInDevelopment: false,
				defaultDataLayer: { platform: 'gatsby' }

				// Specify optional GTM environment details.
				// gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
				// gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`
			}
		},
		{
			resolve: 'gatsby-plugin-nprogress',
			options: {
				color: `white`,
				showSpinner: true,
			},
		},
		`gatsby-plugin-image`,
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				policy: [
					{
						userAgent: '*',
						disallow: ['/[...]/']
					},
					{
						userAgent: '*',
						allow: '/'
					}
				]
			}
		},
		`gatsby-plugin-sitemap`,
		`gatsby-plugin-catch-links`,
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				implementation: require('sass'),
				sassOptions: {
					silenceDeprecations: ['legacy-js-api']
				}
			}
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Afrodiasphere`,
				short_name: `Afrodiasphere`,
				description: `Een veilige en duurzame oplossing voor het delen van contactinformatie`,
				start_url: `/`,
				background_color: `#a9a9a9`,
				lang: `nl`,
				theme_color: `#cc9932`,
				display: `standalone`,
				icon: 'src/images/logo/ads-icon-inverted.png',
				icon_options: {
					purpose: `any maskable`
				},
				crossOrigin: `use-credentials`
			}
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		`gatsby-plugin-offline`
	]
}

export default config
