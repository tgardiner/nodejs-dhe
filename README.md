# nodejs-dhe

An end-to-end example of:
* Using diffie-hellman to generate a shared secret key.
* Deriving an encryption/decryption key from the shared secret key.
* Using that encryption key to encrypt a message with `aes-256-cbc`.
* Decrypting that same message with the decryption key.

The code is written in a similar style to the official [Crypto](https://nodejs.org/api/crypto.html) docs, from the point of view of **Alice** & **Bob**.

Tested with Node `v20.17.0`.
