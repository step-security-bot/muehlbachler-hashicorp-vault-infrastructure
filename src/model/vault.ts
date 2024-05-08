import * as gcp from '@pulumi/gcp';
import * as vault from '@pulumi/vault';

import { ServiceAccountData } from './google/service_account_data';
import { ServerData } from './server';

/**
 * Defines Vault data.
 */
export interface VaultData {
  readonly serviceAccount: ServiceAccountData;
  readonly bucket: gcp.storage.Bucket;
}

/**
 * Defines Vault instance data.
 */
export interface VaultInstanceData {
  readonly bucket: string;
  readonly server: ServerData;
  readonly address: string;
  readonly keys: VaultKeysData;
  readonly ownedSecrets: VaultOwnedSecretsData;
}

/**
 * Defines Vault keys data.
 */
export interface VaultKeysData {
  readonly rootToken: string;
  readonly recoveryKeys: string[];
}

/**
 * Defines Vault owned secrets data.
 */
export interface VaultOwnedSecretsData {
  readonly mount: vault.Mount;
  readonly keys: vault.kv.SecretV2;
}
