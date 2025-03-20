import React, { useState } from 'react'

import * as faqStyles from '../../styles/modules/pages/faq.module.scss'

const FAQItem = ({ question, answer }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleFAQ = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className={faqStyles.faqItem}>
			<div className={faqStyles.faqQuestion} onClick={toggleFAQ}>
				{question}
			</div>
			{isOpen && (
				<div className={faqStyles.faqAnswer}>
					<i className="fa-solid fa-arrow-right-long fa-lg" />
					<span>{answer}</span>
				</div>
			)}
		</div>
	)
}

const FAQ = ({ faqs }) => {
	return (
		<div className={faqStyles.faqContainer}>
			{faqs.map((faq, index) => (
				<FAQItem key={index} question={faq.question} answer={faq.answer} />
			))}
		</div>
	)
}

export default FAQ
