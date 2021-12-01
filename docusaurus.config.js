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
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/everscale-org/docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/everscale-org/docs/tree/main/blog/',
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
        title: 'Docs of Everscale',
        logo: {
          alt: 'Docs of Everscale',
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
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/ton',
              },
            ],
          },
          {
            title: 'Workshop',
            items: [
              {
                label: 'Smart contract-architecture',
                href: 'https://t.me/BroadcastArchive/16',
              },
              {
                label: 'Smart-contract development',
                href: 'https://t.me/BroadcastArchive/14',
              },
              {
                label: 'Developer Course',
                href: 'https://www.youtube.com/watch?v=ngD88UraMmU&list=PLPj4C8ti8UaSPAP6afsy0wQ53lihBT5l1',
              },
              {
                label: 'Development of DeBots',
                href: 'https://t.me/BroadcastArchive/15',
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
                label: 'Solidity API',
                href: 'https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md',
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
