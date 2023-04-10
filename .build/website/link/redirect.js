module.exports = {
  redirects: [
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
    if (existingPath.includes('/develop')) {
      return [existingPath.replace('/develop', '/develop/smart-contract'),];
    }
    return undefined
  }
}
