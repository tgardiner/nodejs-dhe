/*
  Author: tgardiner
  Node Version: v20.17.0
*/

const {
  createECDH,
  createCipheriv,
  createDecipheriv,
  randomBytes
} = require('node:crypto');

// Alice's generates her keys
const alice = createECDH('secp256k1');
const alicePubKey = alice.generateKeys();

// Bob's generates his keys
const bob = createECDH('secp256k1');
const bobPubKey = bob.generateKeys();

// Alice & Bob Exchange pubkeys and generate the secret key
const aliceSecret = alice.computeSecret(bobPubKey);
const bobSecret = bob.computeSecret(alicePubKey);

// Alice creates the message iv (do this for each new message)
const aliceIv = randomBytes(16);

// Alice encrypts the message
const aliceMessage = Buffer.from('Hello World!');
const cipher = createCipheriv('aes-256-cbc', aliceSecret, aliceIv);
const encrypted = Buffer.concat([cipher.update(aliceMessage), cipher.final()]);

// Alice prepends the iv to the message, and sends it to Bob
encryptedMessage = Buffer.concat([aliceIv, encrypted]);

// Bob splits the encrypted message into the iv and message
messageIv = Buffer.copyBytesFrom(encryptedMessage, 0, 16);
message = Buffer.copyBytesFrom(encryptedMessage, 16);

// Bob decrypts the message
const decipher = createDecipheriv('aes-256-cbc', bobSecret, messageIv);
const decrypted = Buffer.concat([decipher.update(message), decipher.final()]);
console.log(`decrypted: ${decrypted.toString()}`);
