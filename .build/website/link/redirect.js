module.exports = {
  redirects: [
    // Sample
    // {
    //   to: '/develop/tools/everdev/guides/quick-start',
    //   from: '/develop/api-tools/everdev/guides/quick-start',
    // },
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
