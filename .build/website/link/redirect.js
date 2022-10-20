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
      to: '/ecosystem/explore/projects',
      from: '/learn/everscale-overview/ecosystem',
    },
    {
      to: '/gs/welcome',
      from: '/learn/welcome',
    },
  ],
  createRedirects(existingPath) {
    if (existingPath.includes('/develop/tools')) {
      return [existingPath.replace('/develop/tools', '/develop/api-tools'),];
    }
    if (existingPath.includes('/ecosystem/contribute')) {
      return [existingPath.replace('/ecosystem/contribute', '/contribute'),];
    }
    if (existingPath.includes('/ecosystem/explore')) {
      return [
        existingPath.replace('/ecosystem/explore', '/learn/everscale-overview'),
        existingPath.replace('/ecosystem/explore', '/learn/tutorial'),
      ];
    }
    return undefined
  }
}
