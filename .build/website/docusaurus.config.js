// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const math = require('remark-math');
const katex = require('rehype-katex');
const simplePlantUML = require("@akebifiky/remark-simple-plantuml");
const link = require('./link');

const plugins = [
  require.resolve('docusaurus-lunr-search'),
  [
    '@docusaurus/plugin-client-redirects',
    {
      ...link.redirect,
    },
  ],
];

if (process.env.APP_GA_MEASUREMENT_ID) {
  plugins.push([
    '@docusaurus/plugin-google-gtag',
    {
      trackingID: process.env.APP_GA_MEASUREMENT_ID,
      anonymizeIP: true,
    },
  ])
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Docs of Everscale',
  url: process.env.SITE_URL || 'https://docs.everscale.network',
  baseUrl: process.env.SITE_BASE_URL || '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'everscale-docs',
  projectName: 'docs',
  markdown: {
    mermaid: true,
  },
  themes: [
    '@docusaurus/theme-mermaid',
  ],
  scripts: [
  ],
  plugins,
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/everscale-org/docs/edit/main/.build/website',
          remarkPlugins: [
            math,
            simplePlantUML,
          ],
          rehypePlugins: [katex],
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          path: "../../src",
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      }),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Everscale Docs',
        logo: {
          alt: 'Everscale Docs',
          src: 'img/logo.svg',
        },
        items: link.navbar,
      },
      footer: {
        style: 'dark',
        links: link.footer,
        copyright: `Copyright © 2020—${new Date().getFullYear()}
 <a href="https://everscale.network/">Everscale</a> All rights reserved
  <a href="https://t.me/everscale">Touch</a>
 <br/>
 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
    <img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" />
 </a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: [
          "rust",
          "solidity"
        ]
      },
    }),
};

module.exports = config;
