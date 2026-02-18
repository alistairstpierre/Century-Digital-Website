/**
 * Schema.org structured data for Century Digital
 * Used in Layout.astro for JSON-LD. Update values here to change schema site-wide.
 *
 * Optional fields (add when available):
 * - phone: Contact phone number
 * - address: { streetAddress, addressLocality, addressRegion, postalCode }
 * - bookingUrl: Lead Connector (or Calendly/Cal.com) for "Book a Call"
 * - sameAs: [ "https://linkedin.com/...", "https://facebook.com/..." ]
 * - logo: Uses /century-logo2.png
 */

export const siteUrl = 'https://centurydigital.net';

export const organization = {
	name: 'Century Digital',
	description: 'Century Digital gets Independent Producers and Financial Advisors consistent $100K+ annuity opportunities. AI annuity opportunity finder: age 55–77, $100K+ rollover‑eligible assets, verified real people, opt-in only. Exclusive daily prospects, state-matched. Built for top producers who contact leads fast.',
	url: siteUrl,
	logo: `${siteUrl}/century-logo2.png`,
	email: 'support@centurydigital.net',
	phone: '+64277266282',
	address: {
		streetAddress: '503/20 Hanson Street',
		addressLocality: 'Wellington',
		addressRegion: 'Wellington',
		postalCode: '6021',
		addressCountry: 'NZ',
	},
	// We operate in the US market (states listed for clarity)
	areaServed: 'US',
	bookingUrl: 'https://api.leadconnectorhq.com/widget/booking/TkuYjNB6MiVU90uJMYJ4',
	// optional: sameAs (social links)
};

// Key US states where annuities are commonly marketed/served (used for schema areaServed)
export const usServiceStates = [
	'Arizona',
	'Florida',
	'Texas',
	'California',
	'North Carolina',
	'South Carolina',
	'Georgia',
	'Tennessee',
	'Ohio',
	'Pennsylvania',
	'Illinois',
	'Iowa',
	'Michigan',
	'Minnesota',
	'Wisconsin',
	'Colorado',
];

export const rating = {
	ratingValue: '4.8',
	reviewCount: '900',
	bestRating: '5',
	worstRating: '1',
};

export const services = [
	'AI Annuity Opportunity Finder',
	'Qualified Annuity Prospects',
	'Annuity Leads (55–77, $100K+ assets)',
	'Verified & Opt-In Leads',
	'State-Matched Exclusive Prospects',
	'Triggered prospects (warmed up before you get them)',
];

export const faq: { question: string; answer: string }[] = [
	{
		question: 'How does the system work?',
		answer: "It comes down to two things. One is AI: we've built an AI annuity opportunity finder that finds people age 55–77, near or at retirement, with $100K+ rollover‑eligible assets and a recent life event that's triggered them to think about annuities. Two is the market: more people moving into retirement, worried about volatility, wanting to roll assets into an annuity, the timing is right. We don't send you raw AI leads: we verify they're real people (OTP), get them to opt in and confirm assets and state, and we only send you prospects in the states you're licensed in. You get consistent qualified annuity prospects daily, exclusive to you.",
	},
	{
		question: 'Why is speed to lead so important?',
		answer: "We're triggering these prospects to think about annuities. If you don't contact them as soon as possible, they'll go to someone else. So you have to be onto it, contact them quickly and consistently. We work with producers who do that.",
	},
	{
		question: 'Are all the prospects exclusive? Do you only send prospects in my licensed states?',
		answer: "100% exclusive. No other agency or producer will ever see your prospects. And yes, we only send you prospects in the states you're licensed for. We check state as part of our opt-in process so you never get leads you can't work.",
	},
	{
		question: 'Who are you looking to work with?',
		answer: "We're looking for high-performing salespeople, or people who want to be. We can send you a lead, but if you're not contacting them quickly and consistently, you won't get the most out of these annuity opportunities. We want producers who are serious about working leads and who want to help people protect their assets.",
	},
	{
		question: "If the prospects are so good, why don't you close them yourself?",
		answer: "We do, a lot of them. We have partnerships with agencies that yield an extremely high return, and we copy the same system into your business. We're producers too. We write FIAs, MYGAs, and understand the comp structure. The system works; we're just scaling it to more producers.",
	},
	{
		question: 'Which carriers do your prospects typically work with?',
		answer: 'Our prospects are qualified for all major carriers. We work with producers writing paper with Allianz Life, Athene, Jackson National, Corebridge Financial, Nationwide, Prudential, F&G, North American, and MassMutual. They have the assets and are ready to have the conversation about FIAs, MYGAs, and the right chassis for their situation.',
	},
	{
		question: 'How do you handle suitability and compliance?',
		answer: "We do the heavy lifting upfront. Our prospects are pre-qualified, we confirm assets, retirement window, and state. We don't send you prospects that will get kicked back by compliance. You can focus on writing paper, not fighting with carriers over suitability questionnaires.",
	},
];

export function buildOrganizationSchema() {
	const org: Record<string, unknown> = {
		'@type': 'Organization',
		name: organization.name,
		description: organization.description,
		url: organization.url,
		logo: organization.logo,
		areaServed: [
			{ '@type': 'Country', name: 'United States' },
			...usServiceStates.map((state) => ({
				'@type': 'AdministrativeArea',
				name: state,
				containedInPlace: { '@type': 'Country', name: 'United States' },
			})),
		],
		address: {
			'@type': 'PostalAddress',
			streetAddress: organization.address.streetAddress,
			addressLocality: organization.address.addressLocality,
			addressRegion: organization.address.addressRegion,
			postalCode: organization.address.postalCode,
			addressCountry: organization.address.addressCountry,
		},
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'Sales',
			email: organization.email,
			telephone: organization.phone,
			url: (organization as { bookingUrl?: string }).bookingUrl || `${organization.url}/#contact`,
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: rating.ratingValue,
			reviewCount: rating.reviewCount,
			bestRating: rating.bestRating,
			worstRating: rating.worstRating,
		},
	};
	return org;
}

export function buildFAQPageSchema() {
	return {
		'@type': 'FAQPage',
		mainEntity: faq.map(({ question, answer }) => ({
			'@type': 'Question',
			name: question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: answer,
			},
		})),
	};
}

export function buildWebSiteSchema() {
	return {
		'@type': 'WebSite',
		'@id': `${organization.url}/#website`,
		name: organization.name,
		url: organization.url,
		description: organization.description,
		publisher: { '@id': `${organization.url}/#organization` },
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${organization.url}/?q={search_term_string}`,
			},
			'query-input': 'required name=search_term_string',
		},
	};
}

export function buildServiceSchema() {
	return {
		'@type': 'Service',
		serviceType: 'Annuity Leads Provider',
		provider: { '@id': `${organization.url}/#organization` },
		areaServed: [
			{ '@type': 'Country', name: 'United States' },
			...usServiceStates.map((state) => ({
				'@type': 'AdministrativeArea',
				name: state,
				containedInPlace: { '@type': 'Country', name: 'United States' },
			})),
		],
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Century Digital Services',
			itemListElement: services.map((service, index) => ({
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: service,
				},
				position: index + 1,
			})),
		},
	};
}

export function buildBreadcrumbSchema(currentPage: string, currentPageName: string) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: organization.url,
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: currentPageName,
				item: `${organization.url}${currentPage}`,
			},
		],
	};
}

export function buildWebPageSchema(
	pageUrl: string,
	pageName: string,
	description: string,
	lastModified?: string,
	isArticle?: boolean
) {
	const baseSchema: Record<string, unknown> = {
		'@type': isArticle ? 'Article' : 'WebPage',
		'@id': `${pageUrl}#webpage`,
		url: pageUrl,
		headline: pageName,
		description: description,
		inLanguage: 'en-US',
		isPartOf: { '@id': `${organization.url}/#website` },
		about: { '@id': `${organization.url}/#organization` },
		primaryImageOfPage: {
			'@type': 'ImageObject',
			url: organization.logo,
		},
		datePublished: '2026-01-27',
		dateModified: lastModified || '2026-01-27',
		breadcrumb: {
			'@id': `${pageUrl}#breadcrumb`,
		},
		publisher: {
			'@id': `${organization.url}/#organization`,
		},
	};

	if (isArticle) {
		baseSchema.author = {
			'@id': `${organization.url}/#organization`,
		};
		baseSchema.mainEntityOfPage = {
			'@type': 'WebPage',
			'@id': pageUrl,
		};
	} else {
		baseSchema.name = pageName;
	}

	return baseSchema;
}

export function buildSchemaGraph(pageUrl?: string, pageName?: string, pageDescription?: string) {
	const organizationSchema = buildOrganizationSchema();
	(organizationSchema as Record<string, unknown>)['@id'] = `${organization.url}/#organization`;

	const graph: unknown[] = [
		organizationSchema,
		buildWebSiteSchema(),
		buildServiceSchema(),
	];

	// Add FAQPage schema only for homepage
	if (!pageUrl || pageUrl === organization.url || pageUrl === `${organization.url}/`) {
		graph.push(buildFAQPageSchema());
	}

	// Add page-specific schema for other pages
	if (pageUrl && pageName && pageDescription && pageUrl !== organization.url && pageUrl !== `${organization.url}/`) {
		const isLegalPage = pageUrl.includes('privacy-policy') || pageUrl.includes('terms-of-use');
		const webPageSchema = buildWebPageSchema(
			pageUrl, 
			pageName, 
			pageDescription, 
			'2026-01-27',
			isLegalPage
		);
		graph.push(webPageSchema);
		graph.push(buildBreadcrumbSchema(
			pageUrl.replace(organization.url, ''),
			pageName
		));
	}

	return {
		'@context': 'https://schema.org',
		'@graph': graph,
	};
}
