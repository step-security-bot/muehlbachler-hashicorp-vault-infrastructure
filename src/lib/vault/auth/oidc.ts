// import * as vault from '@pulumi/vault';

// /**
//  * Enables the OIDC authentication method.
//  *
//  * @param {vault.Provider} provider the Vault provider
//  */
// export const enableOidc = (
//   provider: vault.Provider,
// ) => {

// };

//     # oidc
//     echo "Enabling OIDC..."
//     docker exec vault / bin / sh - c "vault auth enable oidc"
//     docker exec vault / bin / sh - c "vault write auth/oidc/config oidc_discovery_url={{ oidc.discoveryUrl }} oidc_client_id={{ oidc.clientId }} oidc_client_secret={{ oidc.clientSecret }} default_role=reader"
//     docker exec vault / bin / sh - c "vault write auth/oidc/role/default allowed_redirect_uris={{ oidc.redirectUris }} user_claim=email groups_claim=roles token_policies=reader"
//     docker exec vault / bin / sh - c "vault write identity/group name=admin type=external policies=admin"
//     docker exec vault / bin / sh - c "apk add jq; GROUP_ID=\$(vault read -field=id identity/group/name/admin); OIDC_AUTH_ACCESSOR=\$(vault auth list -format=json | jq -r '.\"oidc/\".accessor'); vault write identity/group-alias name=admin mount_accessor=\$OIDC_AUTH_ACCESSOR canonical_id=\$GROUP_ID"
