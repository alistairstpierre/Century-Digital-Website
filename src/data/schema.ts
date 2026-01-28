/**
 * Schema.org structured data for Century Digital
 * Used in Layout.astro for JSON-LD. Update values here to change schema site-wide.
 *
 * Optional fields (add when available):
 * - phone: Contact phone number
 * - address: { streetAddress, addressLocality, addressRegion, postalCode }
 * - bookingUrl: Calendly/Cal.com etc. for "Book a Call"
 * - sameAs: [ "https://linkedin.com/...", "https://facebook.com/..." ]
 * - logo: Uses /century-logo2.png
 */

export const siteUrl = 'https://centurydigital.net';

export const organization = {
	name: 'Century Digital',
	description: 'Century Digital is an annuity leads provider offering annuity marketing and annuity pay per lead for Independent Producers and Financial Advisors. High-intent annuity leads that answer the phone. ISA team, sales coaching, exclusive leads.',
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
	// optional: phone, address, sameAs, bookingUrl
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
	'Annuity Marketing',
	'Annuity Pay Per Lead',
	'Annuity Leads',
	'Social Media Advertising',
	'Internal Sales Team (ISA)',
	'Sales Coaching',
];

export const faq: { question: string; answer: string }[] = [
	{
		question: 'What makes you unique in a sea of insurance agencies?',
		answer: 'Unlike all the "just call the leads more bro" agencies out there, we put our money where our mouth is. We empower producers to go deeper and get better at the number 1 skill that will make them more money—sales. Let us do the monkey work, you do the selling. We understand the trenches. We know about suitability, Reg 187, and the Best Interest Standard. We get that you\'re not just selling plans—you\'re writing contracts with carriers like Allianz, Athene, Jackson National, and Corebridge.',
	},
	{
		question: 'If the leads are so good, why don\'t you close them yourself?',
		answer: "We do… a lot of them. Yes, we have partnerships with agencies that yield an extremely high return for us, and we just copy the same system into your business as well. We're producers too. We write FIAs, MYGAs, and understand the comp structure. We know what it's like to chase rates and navigate carrier relationships.",
	},
	{
		question: 'Are all the leads exclusive?',
		answer: "100%. No other agency or producer will ever see your leads. These are YOUR leads. We understand the frustration of IMOs promising \"warm transfers\" but delivering Facebook leads from people who just wanted a free PDF. That's not us. Every lead is exclusive to you.",
	},
	{
		question: "I'm a new producer. Should I use Century Digital?",
		answer: "I'm going to shoot straight—there is a 90% churn in the life insurance industry within the first year. That means 90% of producers quit in the first 12 months BECAUSE they cannot solve this issue. Your time is best spent writing policies and getting paid. If you want to be like the 90% of producers that quit, then any other marketing agency will do you just fine. But if you want to be like our producers that are protecting hundreds of families every year, and getting paid big bucks to do it, then please book a call!",
	},
	{
		question: 'Which carriers do your leads typically work with?',
		answer: 'Our contract owners are qualified for all major carriers. We work with producers writing paper with Allianz Life, Athene, Jackson National, Corebridge Financial, Nationwide, Prudential, F&G, North American, and MassMutual. Our leads understand the value of protecting their principal and are ready to have the conversation about FIAs, MYGAs, and the right chassis for their situation.',
	},
	{
		question: 'How do you handle suitability and compliance?',
		answer: "We understand the pain point. Every producer is drowning in suitability paperwork. Our leads are pre-qualified and understand their situation. We don't send you leads that will get kicked back by compliance because the concentration is too high or the age doesn't match. We do the heavy lifting upfront so you can focus on writing paper, not fighting with carriers over suitability questionnaires.",
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
			url: `${organization.url}/#contact`,
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
