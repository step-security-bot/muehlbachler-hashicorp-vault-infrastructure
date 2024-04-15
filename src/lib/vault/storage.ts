import * as gcp from '@pulumi/gcp';
import { all, Output } from '@pulumi/pulumi';

import { commonLabels, gcpConfig } from '../configuration';
import { createGCSIAMMember } from '../google/storage/iam_member';

/**
 * Creates the Hashicorp Vault storage bucket.
 *
 * @param {Output<string>} serviceAccountEmail the service account email
 * @returns {gcp.storage.Bucket} the Hashicorp Vault IAM resources
 */
export const createStorageBucket = (
  serviceAccountEmail: Output<string>,
): gcp.storage.Bucket => {
  const bucket = new gcp.storage.Bucket('gcp-bucket-vault', {
    location: gcpConfig.region,
    publicAccessPrevention: 'enforced',
    uniformBucketLevelAccess: true,
    forceDestroy: true,
    labels: commonLabels,
  });

  all([serviceAccountEmail, bucket.id]).apply(([email, bucketId]) =>
    createGCSIAMMember(
      bucketId,
      `serviceAccount:${email}`,
      'roles/storage.objectAdmin',
    ),
  );

  return bucket;
};
