// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Docs of Everscale',
  url: 'https://everscale-org.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'everscale-docs',
  projectName: 'docs',
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "src",
          routeBasePath: "/",
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/everscale-org/docs/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
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
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorial',
          },
          //{to: '/blog', label: 'Blog', position: 'left'},
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
            title: 'Docs',
            items: [
              {
                label: 'White Paper',
                href: 'https://mitja.gitbook.io/everscale-white-paper/',
              },
              {
                label: 'Lite Paper',
                href: 'https://mitja.gitbook.io/everscale-lite-paper/',
              },
              {
                label: 'Tutorial',
                to: '/intro',
              },
              {
                label: 'Visual Brand Identity',
                href: 'https://gramkit.org/en/branding',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Grants',
                href: 'https://l1.tonalliance.org/',
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
                label: 'deBots Chat',
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
              {
                label: 'Subgovernances',
                href: 'https://gov.gramkit.org/',
              },
            ],
          },
          {
            title: 'Workshop',
            items: [
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
        copyright: `Copyright © ${new Date().getFullYear()} Everscale`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
