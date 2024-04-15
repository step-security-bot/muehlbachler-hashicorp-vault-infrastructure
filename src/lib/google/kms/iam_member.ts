import * as gcp from '@pulumi/gcp';

import { sanitizeText } from '../../util/string';

/**
 * Defines a new IAM member for a key.
 *
 * @param {string} keyRingId the id of the key
 * @param {string} member the id of the member
 * @param {string[]} role the role
 */
export const createKMSIAMMember = (
  keyRingId: string,
  member: string,
  role: string,
) => {
  new gcp.kms.KeyRingIAMBinding(
    `gcp-kms-iam-binding-${sanitizeText(keyRingId)}-${sanitizeText(member)}-${sanitizeText(role)}`,
    {
      keyRingId: keyRingId,
      role: role,
      members: [member],
    },
    {},
  );
};
