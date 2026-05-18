/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'f4visa.net' }],
        destination: 'https://www.f4visa.net/:path*',
        permanent: true,
      },
      // Duplicate content 301 redirects
      { source: '/blog/f4-domestic-residence-report-procedure', destination: '/blog/f4-domestic-residence-filing-steps', permanent: true },
      { source: '/blog/f4-domestic-residence-registration', destination: '/blog/f4-domestic-residence-filing-steps', permanent: true },
      { source: '/blog/f4-domestic-residence-report', destination: '/blog/f4-domestic-residence-filing-steps', permanent: true },
      { source: '/blog/f4-residence-report-guide', destination: '/blog/f4-domestic-residence-filing-steps', permanent: true },
      { source: '/blog/overseas-korean-domestic-residence-report', destination: '/blog/f4-domestic-residence-filing-steps', permanent: true },
      { source: '/blog/f4-residence-card-issuance-documents-timeline', destination: '/blog/f4-residence-card-application-guide-2026', permanent: true },
      { source: '/blog/f4-residence-card-issuance', destination: '/blog/f4-residence-card-application-guide-2026', permanent: true },
      { source: '/blog/f4-residence-card-reissue-lost-damaged', destination: '/blog/f4-residence-card-application-guide-2026', permanent: true },
      { source: '/blog/f4-residence-card-reissue', destination: '/blog/f4-residence-card-application-guide-2026', permanent: true },
      { source: '/blog/residence-card-guide', destination: '/blog/f4-residence-card-application-guide-2026', permanent: true },
      { source: '/blog/f4-visa-applicant-eligibility-korean-heritage-scope', destination: '/blog/f4-eligibility-overseas-korean-scope', permanent: true },
      { source: '/blog/f4-visa-eligibility-scope', destination: '/blog/f4-eligibility-overseas-korean-scope', permanent: true },
      { source: '/blog/f4-visa-eligibility-check-guide', destination: '/blog/f4-eligibility-overseas-korean-scope', permanent: true },
      { source: '/blog/f4-visa-eligibility-documents-2026', destination: '/blog/f4-eligibility-overseas-korean-scope', permanent: true },
      { source: '/blog/f4-visa-employment-field-summary', destination: '/blog/f4-visa-allowed-jobs-restricted-industries', permanent: true },
      { source: '/blog/f4-visa-employment-occupations', destination: '/blog/f4-visa-allowed-jobs-restricted-industries', permanent: true },
      { source: '/blog/f4-male-age-25-military-rule', destination: '/blog/f4-visa-military-service', permanent: true },
      { source: '/blog/f4-visa-military-service-note', destination: '/blog/f4-visa-military-service', permanent: true },
      { source: '/blog/f4-visa-military-service-unfulfilled-restriction', destination: '/blog/f4-visa-military-service', permanent: true },
      { source: '/blog/f4-visa-extension-deadline-compliance', destination: '/blog/f4-visa-renewal-procedure', permanent: true },
      { source: '/blog/f4-visa-renewal-cycle-documents', destination: '/blog/f4-visa-renewal-procedure', permanent: true },
      { source: '/blog/f4-visa-renewal-procedure-2026', destination: '/blog/f4-visa-renewal-procedure', permanent: true },
      { source: '/blog/f4-visa-renewal-procedure-guide', destination: '/blog/f4-visa-renewal-procedure', permanent: true },
      { source: '/blog/f4-visa-business-registration-guide', destination: '/blog/f4-visa-business-registration', permanent: true },
      { source: '/blog/f4-visa-chinese-korean-eligibility-restrictions', destination: '/blog/f4-visa-chinese-koreans', permanent: true },
      { source: '/blog/f4-visa-us-citizen-application-procedure', destination: '/blog/f4-visa-us-citizens', permanent: true },
      { source: '/blog/us-citizenship-korea-nationality-auto-loss', destination: '/blog/f4-visa-us-citizens', permanent: true },
      { source: '/blog/us-citizenship-korean-nationality-loss-guide', destination: '/blog/f4-visa-us-citizens', permanent: true },
      { source: '/blog/nationality-recovery-application', destination: '/blog/nationality-recovery', permanent: true },
      { source: '/blog/nationality-recovery-minors', destination: '/blog/nationality-recovery', permanent: true },
      { source: '/blog/nationality-recovery-review', destination: '/blog/nationality-recovery', permanent: true },
      { source: '/blog/overseas-korean-nationality-recovery-procedure', destination: '/blog/nationality-recovery', permanent: true },
      { source: '/blog/f4-residence-address-change', destination: '/blog/f4-address-change-notification', permanent: true },
      { source: '/blog/f4-visa-to-f5-permanent-residency', destination: '/blog/f4-to-f5-permanent-residency-conversion', permanent: true },
    ]
  },
}

export default nextConfig
