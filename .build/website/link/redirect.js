module.exports = {
  redirects: [
    {
      to: '/ecosystem/explore/wallets',
      from: '/learn/everscale-overview/exchangewallets',
    },
    {
      to: '/develop/tools/everdev/command-line-interface/cpp',
      from: '/develop/tools/everdev/command-line-interface/c',
    },
    {
      to: '/develop/client-api/js-api/ever-sdk-js',
      from: '/develop/client-api/js-api/ever-sdk-js/samples',
    },
    {
      to: '/develop/tutorial/everdev-sc',
      from: '/develop/smart-contract/getting-started',
    },
    {
      to: '/develop/tutorial/smart-digital-assets',
      from: '/develop/smart-digital-assets',
    },
    {
      to: '/ecosystem/explore/projects',
      from: '/learn/everscale-overview/ecosystem',
    },
    {
      to: '/gs/welcome',
      from: '/learn/welcome',
    },
    {
      to: '/develop/debots',
      from: '/smart-contract/debots',
    },
    {
      to: '/validate/getting-started',
      from: '/validate/tutorial/getting-started',
    },
  ],
  createRedirects(existingPath) {
    if (existingPath.includes('/ecosystem/contribute')) {
      return [existingPath.replace('/ecosystem/contribute', '/contribute'),];
    }
    if (existingPath.includes('/ecosystem/explore')) {
      return [
        existingPath.replace('/ecosystem/explore', '/learn/everscale-overview'),
        existingPath.replace('/ecosystem/explore', '/learn/tutorial'),
      ];
    }
    if (existingPath.includes('/learn/everscale-overview')) {
      return [existingPath.replace('/learn/everscale-overview', '/learn'),];
    }
    if (existingPath.includes('/develop/tools')) {
      return [existingPath.replace('/develop/tools', '/develop/api-tools'),];
    }
    if (existingPath.includes('/develop/smart-contracts')) {
      return [existingPath.replace('/develop/smart-contracts', '/develop/smart-contract/learn'),];
    }
    if (existingPath.includes('/develop/tutorial/smart-digital-assets')) {
      return [existingPath.replace('/develop/tutorial/smart-digital-assets', '/develop/smart-digital-assets'),];
    }
    if (existingPath.includes('/develop')) {
      return [existingPath.replace('/develop', '/develop/smart-contract'),];
    }
    return undefined
  }
}
