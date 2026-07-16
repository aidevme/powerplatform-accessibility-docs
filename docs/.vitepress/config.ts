import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Power Platform Accessibility Docs',
  base: '/powerplatform-accessibility-docs/',
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
          { text: 'Fluent UI React (v9)', link: '/fluent-ui-react/index' },
          { text: 'Power Pages', link: '/power-pages/index' },
          { text: 'Power Apps—Canvas apps', link: '/canvas-apps/index' },
          { text: 'Power Apps—Code Apps', link: '/code-apps/index' },
          {
            text: 'Power Apps Component Framework (PCF)',
            link: '/powerapps-component-framework/index',
          },
          {
            text: 'Power Apps—Generative pages',
            link: '/generative-pages/index',
          },
          { text: 'Power Apps—MCP App widgets', link: '/mcp-apps/index' },
          { text: 'Power Apps—Model-driven apps', link: '/model-apps/index' },
          { text: 'Power Apps—Mobile client', link: '/mobile-apps/index' },
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
