/**
 * Defines configuration data for OIDC.
 */
export interface OIDCConfig {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly discoveryUrl: string;
  readonly redirectUrls: readonly string[];
}
