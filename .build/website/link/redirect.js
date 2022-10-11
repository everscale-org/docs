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
