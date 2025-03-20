import * as React from 'react'

import PropTypes from 'prop-types'

import ResponsiveTag from '../components/helpers/respoTag'

const AdsLayout = ({ children }) => {
	return (
		<>
			<div style={{ height: '100vh', marginBottom: '-58px' }}>
				<main>{children}</main>
			</div>

			{process.env.NODE_ENV === 'development' && <ResponsiveTag />}
		</>
	)
}

AdsLayout.propTypes = {
	children: PropTypes.node.isRequired
}

export default AdsLayout
