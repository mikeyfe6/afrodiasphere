import * as React from 'react'

import Layout from '../components/layout'
import Faqs from '../components/faqs'
import Seo from '../components/seo'

import mamaAfrica from '../images/mamafrica.png'

import * as faqStyles from '../styles/modules/faq.module.scss'

const faqs = [
	{
		question: 'Wat is Afrodiasphere?',
		answer:
			'Afrodiasphere is een webapplicatie die fungeert als een sociaal netwerkplatform. Het stelt gebruikers in staat om contactinformatie efficiënt te delen en hun netwerk uit te breiden. Gebruikers kunnen hun eigen profielpagina aanmaken, deze personaliseren en belangrijke links op één plek bewaren.'
	},
	{
		question: 'Wat is het doel van deze app?',
		answer:
			'Het doel van Afrodiasphere is om gebruikers te helpen hun sociale en professionele netwerken te vergroten door een platform te bieden waar ze makkelijk contactinformatie kunnen delen en in contact kunnen komen met anderen voor verschillende doeleinden zoals vacatures, boekingen, of gewoon een gesprek.'
	},
	{
		question: 'Voor wie is deze app bedoeld?',
		answer:
			'Afrodiasphere is bedoeld voor iedereen die zijn of haar netwerk wil uitbreiden, of het nu gaat om professionele connecties, artistieke samenwerking, of persoonlijke ontmoetingen'
	},
	{
		question: 'Hoe maak ik een account aan?',
		answer:
			'Ga naar de homepage van Afrodiasphere en klik op "Inloggen / Registreren". Volg de stappen om je account aan te maken en je profiel in te stellen.'
	},
	{
		question: 'Ik ben mijn wachtwoord vergeten, wat moet ik doen?',
		answer:
			'Op de inlogpagina kun je klikken op "Wachtwoord vergeten?" en de instructies volgen om je wachtwoord te resetten.'
	},
	{
		question: 'Hoe kan ik mijn accountgegevens wijzigen?',
		answer:
			'Log in op je account en ga naar je dashboard. Hier kun je je profiel en accountgegevens aanpassen.'
	},
	{
		question: 'Hoe werkt de profielpagina?',
		answer:
			'Na het aanmaken van een account krijg je een eigen publiekelijk zichtbare profielpagina (https://afrodiasphere.com/{jouwprofiel}). Je kunt deze pagina aanpassen naar jouw wensen binnen de mogelijkheden van de webapp.'
	},
	{
		question: 'Kan ik mijn content delen op sociale media?',
		answer:
			'Ja, Afrodiasphere biedt de mogelijkheid om links naar je profiel en content te delen op verschillende sociale media platforms.'
	},
	{
		question: 'Hoe kan ik een andere gebruiker contacteren?',
		answer:
			"Je kunt andere gebruikers vinden en contacteren via hun publiekelijke profielpagina's. Binnenkort komt er ook een openbare chatfunctie beschikbaar."
	},
	{
		question: 'Hoe wordt mijn persoonlijke informatie beschermd?',
		answer:
			'Afrodiasphere / Menefex neemt de bescherming van persoonlijke gegevens serieus. Specifieke details over hoe jouw informatie wordt beschermd zijn te vinden in het privacybeleid op de website'
	},
	{
		question: 'Hoe kan ik ongewenste gebruikers rapporteren?',
		answer:
			'Als je last hebt van ongewenste gebruikers, kun je dit melden via het feedbacksysteem of door contact op te nemen met de klantenservice.'
	},
	{
		question: 'Wat gebeurt er met mijn data?',
		answer:
			'Jouw data wordt gebruikt om de diensten van Afrodiasphere te optimaliseren en wordt niet gedeeld met derden zonder jouw toestemming. Meer informatie hierover vind je in het privacybeleid.'
	},
	{
		question: 'Ik ondervind een probleem met de app, wat moet ik doen?',
		answer:
			'Als je een probleem ondervindt, kun je dit melden via het feedbacksysteem op de website of een e-mail sturen naar feedback@menefex.nl.'
	},
	{
		question: 'Hoe neem ik contact op met de klantenservice?',
		answer:
			'Je kunt contact opnemen met de klantenservice door een e-mail te sturen naar info@menefex.nl of door gebruik te maken van de contactopties op de website.'
	},
	{
		question: 'Waar kan ik feedback geven?',
		answer:
			'Feedback kan worden gegeven door een e-mail te sturen naar feedback@menefex.nl'
	}
]

const FaqPage = () => (
	<Layout>
		<section className={faqStyles.faq}>
			<div>
				<h1>Hoe werkt Afrodiasphere..</h1>
				<p>
					Hieronder vind je alle veelgestelde vragen en desbetreffende
					antwoorden.
				</p>
				<Faqs faqs={faqs} />
			</div>
			<img src={mamaAfrica} alt="" />
		</section>
	</Layout>
)

export default FaqPage

export const Head = () => {
	return <Seo title="FAQ" pathname="/faq/" />
}
