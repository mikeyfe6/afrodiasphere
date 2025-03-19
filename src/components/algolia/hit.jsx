import * as React from 'react'

import { Link } from 'gatsby'

import { Highlight } from 'react-instantsearch'

import noavatar from '../../images/noavatar.png'

const Hit = ({ hit }) => {
	const avatarUrl = hit && hit.avatar ? hit.avatar.url : null

	return (
		<Link to={`/${hit.slug}`}>
			<article>
				<img
					src={!avatarUrl ? noavatar : avatarUrl}
					alt="Avatar"
					style={{ objectFit: !avatarUrl ? 'contain' : 'cover' }}
				/>

				<div className="hit-content">
					<div className="hit-profile">
						<Highlight attribute="profile" hit={hit} />
					</div>
					<div className="hit-occupate">
						<Highlight attribute="occupation" hit={hit} />
					</div>
					<div className="hit-biography">
						<Highlight attribute="biography" hit={hit} />
					</div>
				</div>
			</article>
		</Link>
	)
}

export default Hit
