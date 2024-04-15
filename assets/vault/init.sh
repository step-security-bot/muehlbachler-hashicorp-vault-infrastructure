#!/bin/bash


ADDRESS="http://127.0.0.1:8200"


# wait for vault to start
until sudo docker inspect vault --format "{{.State.Status}}" | grep "running" > /dev/null; do
    echo "Waiting for vault to start..."
    sleep 5
done
while [[ ! `curl -s ${ADDRESS}` ]]; do
    echo "Waiting for vault to be reachable..."
    sleep 5
done


# initialize vault
echo "Initializing vault..."
sudo docker exec vault /bin/sh -c "vault operator init --address '${ADDRESS}'" > /tmp/vault-init.txt


# check if vault was already initialized or not
if [[ $? -eq 0 ]]; then
    # parse token and recovery keys
    echo "Vault initialized successfully. Parsing keys..."
    VAULT_TOKEN=$(sudo grep 'Initial Root Token:' /tmp/vault-init.txt | awk '{print $4}')
    VAULT_RECOVERY_KEY_1=$(sudo grep 'Recovery Key 1:' /tmp/vault-init.txt | awk '{print $4}')
    VAULT_RECOVERY_KEY_2=$(sudo grep 'Recovery Key 2:' /tmp/vault-init.txt | awk '{print $4}')
    VAULT_RECOVERY_KEY_3=$(sudo grep 'Recovery Key 3:' /tmp/vault-init.txt | awk '{print $4}')
    VAULT_RECOVERY_KEY_4=$(sudo grep 'Recovery Key 4:' /tmp/vault-init.txt | awk '{print $4}')
    VAULT_RECOVERY_KEY_5=$(sudo grep 'Recovery Key 5:' /tmp/vault-init.txt | awk '{print $4}')

    # output for parsing
    echo "--START TOKENS--"
    echo "---"
    echo "root_token: $VAULT_TOKEN"
    echo "recovery_keys: $VAULT_RECOVERY_KEY_1"
    echo "  - ${VAULT_RECOVERY_KEY_1}"
    echo "  - ${VAULT_RECOVERY_KEY_2}"
    echo "  - ${VAULT_RECOVERY_KEY_3}"
    echo "  - ${VAULT_RECOVERY_KEY_4}"
    echo "  - ${VAULT_RECOVERY_KEY_5}"
    echo "--END TOKENS--"

    # cleanup
    echo "Cleaning up..."
    sudo rm /tmp/vault-init.txt || true
else
    echo "Vault already initialized. Skipping..."
fi
