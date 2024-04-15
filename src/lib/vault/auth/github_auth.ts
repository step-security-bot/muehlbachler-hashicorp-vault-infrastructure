import * as vault from '@pulumi/vault';

/**
 * Enables the GitHub authentication method.
 *
 * @param {vault.Provider} provider the Vault provider
 * @returns {vault.jwt.AuthBackend} the GitHub authentication method
 */
export const enableGithubAuth = (
  provider: vault.Provider,
): vault.jwt.AuthBackend =>
  new vault.jwt.AuthBackend(
    'vault-auth-jwt-github',
    {
      path: 'github',
      boundIssuer: 'https://token.actions.githubusercontent.com',
      oidcDiscoveryUrl: 'https://token.actions.githubusercontent.com',
      description: 'GitHub JWT Trust for Actions',
    },
    {
      provider: provider,
    },
  );
