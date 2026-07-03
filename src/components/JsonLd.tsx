// Structured data for Classic Towing & Storage.
// Emits a graph of LocalBusiness/AutomotiveBusiness nodes (one per location)
// plus an Organization parent so search engines can connect them.
// This is the highest-leverage SEO asset for a 24/7 towing brand —
// it powers Google's Local Pack, emergency-service rich results,
// and "open now" badges.

import { FAQS } from '@/data/faqs'

const LOCATIONS = [
  {
    id: 'toronto',
    name: 'Classic Towing & Storage — Toronto',
    street: '41 Westside Drive',
    locality: 'Etobicoke',
    region: 'ON',
    postal: 'M9C 1B3',
    phone: '+1-416-604-3222',
    hours: '24/7',
  },
  {
    id: 'ajax',
    name: 'Classic Towing & Storage — Ajax',
    street: '91 Notion Road',
    locality: 'Ajax',
    region: 'ON',
    postal: 'L1S 6K8',
    phone: '+1-905-427-0903',
    hours: 'Mo-Su',
  },
  {
    id: 'barrie',
    name: 'Classic Towing & Storage — Barrie',
    street: '257 Tiffin St',
    locality: 'Barrie',
    region: 'ON',
    postal: 'L4N 2N4',
    phone: '+1-705-970-0481',
    hours: '24/7',
  },
  {
    id: 'hamilton',
    name: 'Classic Towing & Storage — Hamilton',
    street: '858 Nebo Road',
    locality: 'Hamilton',
    region: 'ON',
    postal: 'L0R 1P0',
    phone: '+1-905-570-0111',
    hours: 'Mo-Su',
  },
] as const

const SITE = 'https://classictowing.ca'

const SERVICES = [
  'Light Duty Towing',
  'Medium Duty Towing',
  'Heavy Duty Towing',
  'Lockout Service',
  'Battery Boost',
  'Fuel Delivery',
  'Tire Service',
  'Accident Recovery',
]

export function JsonLd() {
  const organization = {
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'Classic Towing & Storage',
    legalName: '1105729 Ontario Inc.',
    url: SITE,
    logo: `${SITE}/images/classic-logo.png`,
    telephone: '+1-416-604-3222',
    email: 'careers@classictowing.ca',
    areaServed: [
      'Toronto', 'Mississauga', 'Brampton', 'Oakville', 'Ajax',
      'Barrie', 'Hamilton', 'Huntsville', 'Oshawa', 'Southern Ontario',
    ],
    sameAs: [],
  }

  const locations = LOCATIONS.map((loc) => ({
    '@type': 'AutomotiveBusiness',
    '@id': `${SITE}/#${loc.id}`,
    name: loc.name,
    parentOrganization: { '@id': `${SITE}/#organization` },
    url: `${SITE}/#locations`,
    image: `${SITE}/images/classic-logo.png`,
    telephone: loc.phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.street,
      addressLocality: loc.locality,
      addressRegion: loc.region,
      postalCode: loc.postal,
      addressCountry: 'CA',
    },
    // Only emit openingHours for 24/7 branches; we don't have confirmed
    // schedules for the others, so we omit rather than misrepresent.
    ...(loc.hours === '24/7' ? { openingHours: 'Mo-Su 00:00-23:59' } : {}),
    areaServed: 'Southern Ontario',
    makesOffer: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s },
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '98',
    },
  }))

  // FAQPage schema — powers Google FAQ rich results and gives AI answer
  // engines quotable, factual answers about the business.
  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${SITE}/#faq`,
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [organization, ...locations, faqPage],
  }

  return (
    <script
      type="application/ld+json"
      // Inline JSON-LD: Next.js serializes safely; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
