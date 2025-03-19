import * as React from 'react'

import Layout from '../components/layout'
import Intro from '../components/intro'
import Slider from '../components/slider'
import Maps from '../components/maps'
import Seo from '../components/seo'

const IndexPage = () => {
	return (
		<Layout>
			<Intro />
			<Slider />
			<Maps />
		</Layout>
	)
}

export default IndexPage

export const Head = () => {
	return <Seo title="Home" />
}
