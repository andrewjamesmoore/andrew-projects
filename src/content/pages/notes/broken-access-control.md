---
title: "A01 Broken Access Control"
description: "Exploting OWASP A01 broken access control to gain unauthorized access to sensitive data or functionality"
---

# A01 Broken Access Control

Broken Access Control has consistently ranked as the #1 web application security risk in the [OWASP Top 10](https://owasp.org/www-project-top-ten/), and continues to be the most commonly observed risk in [recent OWASP guidance](https://owasp.org/Top10/2025/).

But what does Broken Access Control actually mean? What do these risks look like in real applications, and how do they happen?

I'm going to work through the OWASP Top 10 by building minimal, intentionally vulnerable prototypes, exploiting them, and understanding how to fix and prevent them. The goal isn't to build production-ready systems, but to understand how these vulnerabilities really work.

First up: Broken Access Control.


## Broken Access Control ≠ Broken Authentication

> **Tools**: Typescript, Node, Express, JWT, Curl

The OWASP risk here isn't about weak authentication. It's about what happens _after_ authentication succeeds. And so **I'm prefacing this with a note that this server is intentionally built to get the to core issue**, it doesn't check for passwords or additional auth other than an email address.

Here I've set up a simple Node server using Express that authenticates users, but does not properly authorize access to user-specific resources. **This allows a non-privileged user to access resources they do not own simply by changing the object ID in the URL.**

```ts
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";


const app = express();
app.use(express.json());

const JWT_SECRET = 'jwt_secret_key';

type User = {
    id: number;
    email: string;
    role: "user" | "admin";
};

type AuthTokenPayload = {
    userId: number;
    email: string;
    role: User["role"];
}

declare global {
    namespace Express {
        interface Request {
            user: AuthTokenPayload;
        }
    }
}

const users: User[] = [
    { id: 1, email: "user1@example.com", role: "user" },
    { id: 2, email: "user2@example.com", role: "user" },
    { id: 3, email: "user3@example.com", role: "admin" }
];

app.post("/login", (req: Request, res: Response) => {
    const { email } = req.body as { email: string };

    if (!email) {
        return res.status(400).json({ message: "A valid email address is required" });
    }

    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(401).json({ message: "No account found with that email" });
    }

    const payload: AuthTokenPayload = {
        userId: user.id,
        role: user.role,
        email: user.email
    };

    const token = jwt.sign(payload, JWT_SECRET);

    res.json({ token });
});

function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const decodedToken = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
            req.user = decodedToken;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
}

app.get("/users/:id", authenticate, (req: Request, res: Response) => {
  
    const requestedUserId = Number(req.params.id);

    const user = users.find(u => u.id === requestedUserId);
    if (!user) {
    return res.status(404).json({ message: "User ID not found" });
    }

    res.json(user);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
}); 
```
Authenticate as user1@example.com to obtain a JWT token that represents this user's identity.
```bash
# Request POST /login
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email":"user1@example.com"}'

# ✅ Server Response HTTP/1.1 200 OK
{
  "token": "eyJhbG..."
}
```
Use the issued JWT to request the authenticated user's own resource.

```bash
# Request GET /users/1
curl http://localhost:3000/users/1 -H "Authorization: Bearer eyJhbG..."

# ✅ Server Response HTTP/1.1 200 OK
{
  "id": 1,
  "email": "user1@example.com",
  "role": "user"
}

```

Reuse the same JWT to request a different user's resource by changing the ID in the URL (accessing admin role `user3`).

```bash
# Request GET /users/3
curl http://localhost:3000/users/3 -H "Authorization: Bearer eyJhbG..."

# ✅ Server Response HTTP/1.1 200 OK
{
  "id": 3,
  "email": "user3@example.com",
  "role": "admin"
}

```
Wait... it worked but should it have? This is Broken Access Control. 

Of course it's not the only place this can happen, but it demonstrates the core security risk. Maybe it's not user data, maybe it's order IDs, invoices, or files:

* `/api/orders/1234`
* `/api/invoices/8891`
* `/api/files/abc.pdf`

The risk is not login related it's that the server trusts the object ID without checking ownership. So what's the fix? In this case, we need to check if the requested user ID matches the user ID in the decoded JWT token. If they don't match, return a `403: Forbidden` error (perhaps a 404 if dealing with highly sensitive information to avoid enumeration).

**The Fix:** Add an authorization check to ensure the requested resource belongs to the authenticated user.

```ts
// app.get

if (requestedUserId !== req.user.userId) {
    return res.status(403).json({ 
        message: "Forbidden: You do not have permission to view this resource" 
    });
}


```

Attempt to access another user's resource after authorization is enforced.

```bash
# Request GET /users/3
curl http://localhost:3000/users/3 -H "Authorization: Bearer eyJhbG..."

# ❌ Server Response HTTP/1.1 403 Forbidden
{
  message: "Forbidden: You do not have permission to view this resource"
}
```

Working through this example forces you to think carefully about who should have access, which errors to return, and how to label them clearly. Even a small oversight can open a hole, so building these checks properly means considering every path, validating ownership, and being explicit about what's allowed.
