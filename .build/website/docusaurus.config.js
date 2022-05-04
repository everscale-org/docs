// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Docs of Everscale',
  url: 'https://docs.everscale.network',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'everscale-docs',
  projectName: 'docs',
  scripts: [
  ],
  plugins: [require.resolve('docusaurus-lunr-search')],
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
          remarkPlugins: [math],
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
        title: 'Everscale Documentation',
        logo: {
          alt: 'Everscale Documentation',
          src: 'img/logo.svg',
        },
        items: [
          {
            label: 'Standards',
            to: 'standard'
          },
          {
            label: 'Develop',
            to: 'develop'
          },
          {
            label: 'Validate',
            to: 'validate'
          },
          {
            label: 'Integrate',
            to: 'integrate'
          },
          {
            label: 'Contribute',
            to: 'contribute'
          },
          {
            label: 'Learn',
            to: 'learn'
          },
          {
            label: 'Blog',
            href: 'https://blog.everscale.network/',
            position: 'right',
          },
          {
            label: 'Status',
            href: 'https://everos.dev/status',
            position: 'right',
          },
          {
            href: 'https://github.com/everscale-org/docs/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'About',
            items: [
              {
                label: 'Event Calendar',
                href: 'https://everscale-org.github.io/Calendar/',
              },
              {
                label: 'Jobs and Vacancy',
                href: 'https://github.com/everscale-org/job/issues',
              },
              {
                label: 'White Paper',
                href: 'https://mitja.gitbook.io/everscale-white-paper/',
              },
              {
                label: 'Lite Paper',
                href: 'https://mitja.gitbook.io/everscale-lite-paper/',
              },
              {
                label: 'Weekly Meetup',
                href: 'https://www.youtube.com/c/Everscale_community/search?query=Weekly%20Meetup',
              },
              {
                label: 'Visual Brand Identity',
                href: 'https://everscale.network/about/brand',
              },
              {
                label: 'Subgovernances',
                href: 'https://gov.gramkit.org/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Grants',
                href: 'https://everscale.network/developers/grants',
              },
              {
                label: 'Bounties',
                href: 'https://github.com/EverscaleGuild/bounties/issues',
              },
              {
                label: 'Smart Contracts Chat',
                href: 'https://t.me/EverscaleSmartContracts',
              },
              {
                label: 'Incubator Chat',
                href: 'https://t.me/EverscaleIncubator',
              },
              {
                label: 'DeBots Chat',
                href: 'https://t.me/everscaledebots',
              },
              {
                label: 'SDK Chat',
                href: 'https://t.me/ever_sdk',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/everscale',
              },
            ],
          },
          {
            title: 'Workshop',
            items: [
              {
                label: 'Tutorial',
                to: 'develop/smart-contract/getting-started/',
              },
              {
                label: 'Smart contract-architecture',
                href: 'https://youtu.be/XKMnroPWXek',
              },
              {
                label: 'Smart-contract development',
                href: 'https://youtu.be/YBIaFeaksMY',
              },
              {
                label: 'Developer Course',
                href: 'https://www.youtube.com/playlist?list=PLPj4C8ti8UaSPAP6afsy0wQ53lihBT5l1',
              },
              {
                label: 'Development of DeBots',
                href: 'https://youtu.be/vFAatJO6cBM',
              },
              {
                label: 'Voice Chat',
                href: 'https://t.me/EverVoice',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Sample smart-contracts',
                href: 'https://github.com/tonlabs/samples',
              },
              {
                label: 'Sample SDK',
                href: 'https://github.com/tonlabs/sdk-samples',
              },
              {
                label: 'JS Application Kit',
                href: 'https://tonlabs.gitbook.io/appkit-js/',
              },
              {
                label: 'Solidity API',
                href: 'https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md',
              },
              {
                label: 'ABI Specification',
                href: 'https://docs.ton.dev/86757ecb2/p/40ba94-abi-specification-v2',
              },
              {
                label: 'NFT',
                href: 'https://github.com/tonlabs/True-NFT',
              },
              {
                label: 'CLI',
                href: 'https://github.com/tonlabs/tonos-cli',
              },
              {
                label: 'SDK',
                href: 'https://tonlabs.gitbook.io/ton-sdk/',
              },
            ],
          },
        ],
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
          "solidity"
        ]
      },
    }),
};

module.exports = config;
