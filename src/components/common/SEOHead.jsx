import React, { useEffect } from 'react';
import { NGO_DETAILS } from '../../utils/constants';

/**
 * Reusable SEO Engine Component for Page-Level Meta Tags, Canonical URLs,
 * Open Graph, Twitter Cards, and JSON-LD Structured Data Schemas.
 */
export const SEOHead = ({
  title,
  description,
  canonicalUrl = 'https://mbks-cg.org',
  ogImage = 'https://mbks-cg.org/logo.jpeg',
  ogType = 'website',
  keywords,
  schemaData = null,
}) => {
  const defaultTitle = `${NGO_DETAILS.nameHi} | ${NGO_DETAILS.nameEn}`;
  const pageTitle = title ? `${title} | ${NGO_DETAILS.shortName}` : defaultTitle;

  const defaultDesc = `${NGO_DETAILS.nameHi} (पंजीयन जावक क्रमांक 347, नवागढ़, जांजगीर-चांपा, छत्तीसगढ़)। शिक्षा, स्वास्थ्य, महिला सशक्तिकरण, रक्तदान एवं जल संरक्षण हेतु समर्पित जनसेवा संस्था।`;
  const metaDescription = description || defaultDesc;

  const defaultKeywords = 'मां-बाबूजी जनकल्याण समिति, MBKS Chhattisgarh, Nawagarh NGO, Janjgir-Champa Social Welfare, NGO Chhattisgarh, शिक्षा, स्वास्थ्य, महिला सशक्तिकरण, रक्तदान शिविर, जल संरक्षण';
  const metaKeywords = keywords || defaultKeywords;

  useEffect(() => {
    // 1. Update Document Title
    document.title = pageTitle;

    // Helper: Create or update meta tag
    const updateMeta = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper: Create or update link canonical
    const updateCanonical = (href) => {
      let element = document.querySelector('link[rel="canonical"]');
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Core Meta Tags
    updateMeta('name', 'description', metaDescription);
    updateMeta('name', 'keywords', metaKeywords);
    updateMeta('name', 'author', NGO_DETAILS.nameEn);
    updateMeta('name', 'robots', 'index, follow');

    // Local SEO Geo Meta Tags
    updateMeta('name', 'geo.region', 'IN-CT');
    updateMeta('name', 'geo.placename', 'Nawagarh, Janjgir-Champa');
    updateMeta('name', 'geo.position', '21.8447;82.5714');
    updateMeta('name', 'ICBM', '21.8447, 82.5714');

    // 3. Open Graph Meta Tags (Facebook/WhatsApp/LinkedIn)
    updateMeta('property', 'og:site_name', NGO_DETAILS.nameHi);
    updateMeta('property', 'og:title', title || defaultTitle);
    updateMeta('property', 'og:description', metaDescription);
    updateMeta('property', 'og:type', ogType);
    updateMeta('property', 'og:url', canonicalUrl);
    updateMeta('property', 'og:image', ogImage);
    updateMeta('property', 'og:locale', 'hi_IN');

    // 4. Twitter Card Meta Tags
    updateMeta('name', 'twitter:card', 'summary_large_image');
    updateMeta('name', 'twitter:title', title || defaultTitle);
    updateMeta('name', 'twitter:description', metaDescription);
    updateMeta('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    updateCanonical(canonicalUrl);

    // 6. Inject JSON-LD Schema
    const scriptId = 'json-ld-schema';
    let scriptElem = document.getElementById(scriptId);
    if (!scriptElem) {
      scriptElem = document.createElement('script');
      scriptElem.id = scriptId;
      scriptElem.type = 'application/ld+json';
      document.head.appendChild(scriptElem);
    }

    const defaultNgoSchema = {
      '@context': 'https://schema.org',
      '@type': 'NGO',
      'name': NGO_DETAILS.nameHi,
      'alternateName': [NGO_DETAILS.nameEn, NGO_DETAILS.shortName],
      'url': 'https://mbks-cg.org',
      'logo': 'https://mbks-cg.org/logo.jpeg',
      'identifier': NGO_DETAILS.regNo,
      'description': metaDescription,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': `${NGO_DETAILS.address.ward}, ${NGO_DETAILS.address.village}, ${NGO_DETAILS.address.post}`,
        'addressLocality': NGO_DETAILS.address.tehsil,
        'addressRegion': NGO_DETAILS.address.state,
        'postalCode': NGO_DETAILS.address.pincode,
        'addressCountry': 'IN',
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 21.8447,
        'longitude': 82.5714,
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+91-98261XXXXX',
        'contactType': 'customer support',
        'areaServed': 'Janjgir-Champa',
        'availableLanguage': ['Hindi', 'English'],
      },
    };

    const finalSchema = schemaData ? [defaultNgoSchema, schemaData] : defaultNgoSchema;
    scriptElem.textContent = JSON.stringify(finalSchema);
  }, [pageTitle, metaDescription, metaKeywords, canonicalUrl, ogImage, ogType, schemaData]);

  return null;
};
