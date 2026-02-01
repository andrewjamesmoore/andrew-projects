---
title: "A04 Cryptographic Failures"
description: "Exploration of OWASP Top 10 A04 Cryptographic Failures through minimal TypeScript prototypes, covering password hashing with Argon2id and authenticated encryption with AES-GCM"
---

# A04 Cryptographic Failures

This document summarizes my exploration of **OWASP Top 10 [A04 Cryptographic Failures](https://owasp.org/Top10/2021/A04_2021-Cryptographic_Failures/)** through small, minimal prototypes in TypeScript. The goal was to understand common pitfalls and how to implement safer cryptographic practices. Note I am not a cryptographer or expert in this area, I believe the best way to understand security is to build (and break) things yourself. These prototypes for the most part represent available methods from Node's `crypto` module.

## From Plaintext to Proven Patterns

Consistently listed as a primary concern in the OWASP Top 10, cryptographic failures occur when sensitive data is left exposed by poor implementation or outdated protocols.

OWASP provides a number of examples around crypto failures, but rather than just listing best practices like token rotation, I wanted to dive a *little* deeper into securing data through hashing and encryption. The goal here isn't to build production-ready systems, but to understand how these vulnerabilities work so I can apply them later.

> **Tools**: TypeScript, `node:crypto`, `argon2`

## 1. Passwords, Hashing, and Salting

### ❌ Plaintext Storage
Storing passwords in plaintext is the most basic failure. There is no layer of protection between a database leak and a total account compromise.

```ts
type UserRecord = Record<string, any>;
const users: UserRecord = {};

function register(username: string, password: string) {
    users[username] = { username, password };
}

function login(username: string, password: string) {
    return users[username]?.password === password;
}

register("alice", "password123");
console.log(users);
```
The issue: any database leak results in an instant, total compromise of every user

### ❌ Simple Hash
This example touches on specific failure points mentioned by OWASP: using the wrong algorithm and omitting a salt

```ts
import crypto from "node:crypto";

function hashPassword(password: string) {
    return crypto.createHash("sha256").update(password).digest("hex");
}

function register(username: string, password: string) {
    users[username] = { username, passwordHash: hashPassword(password) };
}

register("alice", "password123");
register("bob", "password123");

console.log(users);
```
The Issues:
- unsalted: identical passwords result in identical hashes, allowing for pattern recognition
- vulnerable to rainbow tables: attackers use precomputed lists of hashes to "de-hash" common passwords instantly
- too Fast: OWASP recommends "slow and memory-hard" algorithms. SHA-256 is designed for speed, allowing attackers to guess billions of passwords per second

### ☑️ Salted Hash with Argon2id

The modern fix is shifting the burden from the CPU to the RAM
```ts
import argon2 from "argon2";

async function register(username: string, password: string) {
    const passwordHash = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
    });

    users[username] = { username, passwordHash };
}

await register("alice", "password123");
await register("bob", "password123");

console.log(users);
```
Why it works:
- unique salts: argon2 generates a salt automatically and encodes it into the result string
- memory-hard: attackers can't just throw raw CPU power at this; they need to dedicate physical RAM to every guess
- non-blocking: argon2.hash() is async, which prevents blocking the Node.js event loop

## 2. Encrypting and Decrypting Data

### ❌ Fixed IV (Deterministic Encryption)

If the same key and same iv are used to encrypt the same data twice, the resulting ciphertext is identical

```ts
import crypto from 'node:crypto';

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = Buffer.alloc(16, 0);

function encrypt(text: string) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}

console.log(encrypt("Sensitive Data"));
console.log(encrypt("Sensitive Data"));
```
The issue: using a fixed iv allows pattern recognition. It makes the encryption deterministic, making it easier for attackers to identify and decrypt repeated data

### ❌ Random IV Without Auth (CBC Mode)
In modern security audits, AES-CBC is often flagged as a failure because it doesn't provide a way to verify the data hasn't been tampered with

```ts
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
```
The issue: without an integrity check (like an HMAC or Auth Tag), an attacker can manipulate bits of the ciphertext without you knowing

### ☑️ AES-GCM with Nonce (Authenticated Encryption)
Modern standards prefer AEAD (Authenticated Encryption with Associated Data). This uses a nonce and an authentication tag

```ts
import crypto from "node:crypto";

const algorithm = 'aes-256-gcm';
const key = crypto.randomBytes(32);

function encrypt(text: string) {
    const nonce = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(algorithm, key, nonce);

    const ciphertext = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();

    return Buffer.concat([nonce, tag, ciphertext]).toString("base64");
}

function decrypt(combinedBase64: string) {
    const combined = Buffer.from(combinedBase64, "base64");

    const nonce = combined.subarray(0, 12);
    const tag = combined.subarray(12, 28);
    const ciphertext = combined.subarray(28);

    const decipher = crypto.createDecipheriv(algorithm, key, nonce);
    decipher.setAuthTag(tag);

    try {
        const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
        return decrypted.toString("utf8");
    } catch (err) {
        throw new Error("Authentication failed: Data was tampered with!");
    }
}

const encrypted = encrypt("New England Clam Chowder... The White");
console.log("Decrypted:", decrypt(encrypted));
```
Why it works:
- nonce ensures uniqueness per message so identical data produces different ciphertext
- auth tag provides integrity. If an attacker changes even one bit of the stored data, the decipher.final() call will throw an error
- only the key must remain secret. The nonce and tag are safe to store with the data

## Summary / Key Takeaways
- Passwords: move beyond simple hashes. use memory-hard KDFs like Argon2id or scrypt
- Data Encryption: never use fixed IVs. always aim for Authenticated Encryption (AES-GCM) to ensure data hasn't been tampered with
- Async over Sync: in node.js, always use the asynchronous versions of crypto functions to keep the event loop responsive and avoid DoS vulnerabilities
- Key Management: security should rely on the secrecy of the key, not the secrecy of the algorithm

By prototyping these small examples, I've moved from seeing crypto as a "black box" to understanding the specific parameters (salts, nonces, costs) that actually keep data safe.
