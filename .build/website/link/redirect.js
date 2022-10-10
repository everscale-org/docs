module.exports = {
  redirects: [
    {
      to: '/community/explore/wallets',
      from: '/learn/everscale-overview/exchangewallets',
    },
    {
      to: '/develop/tools/everdev/command-line-interface/cpp',
      from: '/develop/tools/everdev/command-line-interface/c',
    },
    {
      to: '/concept',
      from: '/learn',
    },
    {
      to: '/concept/arch',
      from: '/arch',
    },
    {
      to: '/concept/standard',
      from: '/standard',
    },
  ],
  createRedirects(existingPath) {
    if (existingPath.includes('/develop/tools')) {
      return [
        existingPath.replace('/develop/tools', '/develop/api-tools'),
      ]
    }
    return undefined
  }
}
