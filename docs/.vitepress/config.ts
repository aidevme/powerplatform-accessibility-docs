import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Power Platform Accessibility Docs',
  description:
    'A curated, community-driven knowledge base of accessibility (WCAG 2.1/2.2, EN 301 549, Section 508) guidance for the Microsoft Power Platform.',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Overview', link: '/index' },
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [{ text: 'Comparison across surfaces', link: '/index' }],
      },
      {
        text: 'Product areas',
        items: [
          { text: 'Power Pages', link: '/powerpages/index' },
          { text: 'Power Apps—Canvas apps', link: '/powerapps-canvas/index' },
          { text: 'Power Apps—Code Apps', link: '/powerapps-codeapps/index' },
          {
            text: 'Power Apps Component Framework (PCF)',
            link: '/powerapps-component-framework/index',
          },
          {
            text: 'Power Apps—Generative/AI-generated pages',
            link: '/powerapps-generative-pages/index',
          },
          { text: 'Fluent UI React (v9)', link: '/fluent-ui-react/index' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aidevme/powerplatform-accessibility-docs' },
    ],

    search: {
      provider: 'local',
    },
  },
})
