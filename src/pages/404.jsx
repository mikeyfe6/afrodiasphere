import * as React from 'react'

import Layout from '../components/layout'
import Seo from '../components/seo'

const NotFoundPage = () => (
	<Layout>
		<div style={{ margin: '2.5em' }}>
			{' '}
			<h1>404: Not Found</h1>
			<p style={{ color: 'white' }}>
				You just hit a route that doesn&#39;t exist... the sadness.
			</p>
		</div>
	</Layout>
)

export default NotFoundPage

export const Head = () => {
	return <Seo title="404: Not found" pathname="/404/" />
}
