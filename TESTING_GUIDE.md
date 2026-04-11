# 🚀 Thunder Client Testing Guide - Ignita Backend

Complete guide to test all backend endpoints using Thunder Client.

---

## **Table of Contents**

1. [Server Setup](#server-setup)
2. [Thunder Client Setup](#thunder-client-setup)
3. [Authentication Flow](#authentication-flow)
4. [Testing Endpoints](#testing-endpoints)
5. [Error Handling](#error-handling)
6. [Checklist](#checklist)

---

## **Server Setup**

### **Prerequisites**

- PostgreSQL running locally
- Node.js installed
- Backend project dependencies installed

### **Start the Server**

```bash
# Install dependencies
pnpm install

# Start dev server (Watches for changes)
pnpm start:dev

# Expected output:
# [Nest] XXXXX - XX/XX/XXXX, XX:XX:XX LOG [NestFactory] Nest application successfully started
```

✅ Server runs on: **http://localhost:3000**

---

## **Thunder Client Setup**

### **Installation**

1. Install Thunder Client extension in VS Code
2. Open Thunder Client from the sidebar

### **Create a Collection**

1. Click **Collections** tab
2. Click **New Collection**
3. Name it: `Ignita API Tests`
4. Save

### **Create Environment Variables** (Optional but Recommended)

1. Right-click collection → **Add Environment**
2. Name: `Local Dev`
3. Add variables:
   ```
   baseUrl = http://localhost:3000
   token = (leave empty, will fill after login)
   ```

---

## **Authentication Flow**

### **Step 1: Register a New User**

**Request:**

```
POST http://localhost:3000/auth/register
```

**Headers:**

```
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123",
  "phone": "+1234567890"
}
```

**Expected Response: 201 Created**

```json
{
  "message": "user registered successfully"
}
```

✅ **What to verify:**

- Status code is `201`
- User is created in database
- You can now use this email to login

---

### **Step 2: Login & Get JWT Token**

**Request:**

```
POST http://localhost:3000/auth/login
```

**Headers:**

```
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Expected Response: 200 OK (or 201 Created)**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "user@example.com",
    "phone": "+1234567890"
  }
}
```

✅ **What to verify:**

- Status code is `200` or `201`
- `accessToken` is returned
- User data matches what you registered

### **Copy Token for Next Requests**

1. **Copy** the `accessToken` value (without quotes)
2. In Thunder Client, go to **Auth** tab
3. Select **Bearer Token** from dropdown
4. Paste the token in the field
5. The header will automatically be: `Authorization: Bearer YOUR_TOKEN_HERE`

---

## **Testing Endpoints**

### **📌 Important Notes Before Testing**

- ✅ All endpoints (except register & login) require JWT token
- ✅ Use Bearer Token authentication from Auth tab
- ✅ Use correct enum values for `category` and `type`

---

## **Events Endpoints**

### **Valid Enum Values**

**Event Categories (category field):**

- `HACKATHON`
- `INTERNSHIP`
- `CODING_FEST`
- `WORKSHOP`

**Event Types (type field):**

- `ONLINE`
- `OFFLINE`
- `HYBRID`

---

### **1. Create Event**

**Request:**

```
POST http://localhost:3000/events
```

**Auth:** ✅ Bearer Token Required

**Headers:**

```
Content-Type: application/json
Authorization: Bearer {{your_jwt_token}}
```

**Body (JSON):**

```json
{
  "title": "AI Conference 2026",
  "description": "Annual AI and Machine Learning conference",
  "startDate": "2026-05-20T09:00:00Z",
  "endDate": "2026-05-20T17:00:00Z",
  "category": "HACKATHON",
  "type": "ONLINE",
  "organizer": "Ignita",
  "registrationLink": "https://example.com/register"
}
```

**Expected Response: 201 Created**

```json
{
  "id": "730b2c91-3372-4d8a-90c0-46f0f09557dc",
  "title": "AI Conference 2026",
  "description": "Annual AI and Machine Learning conference",
  "category": "HACKATHON",
  "type": "ONLINE",
  "organizer": "Ignita",
  "registrationLink": "https://example.com/register",
  "startDate": "2026-05-20T09:00:00.000Z",
  "endDate": "2026-05-20T17:00:00.000Z",
  "createdAt": "2026-04-11T07:30:22.588Z",
  "updatedAt": "2026-04-11T07:30:22.588Z"
}
```

⚠️ **Common Errors:**

- ❌ `500 Internal Server Error` - Check enum values (TECHNOLOGY not valid)
- ❌ `401 Unauthorized` - Token missing or expired

✅ **Save the event ID for next tests!**

---

### **2. Get All Events**

**Request:**

```
GET http://localhost:3000/events
```

**Auth:** ✅ Bearer Token Required

**Headers:**

```
Authorization: Bearer {{your_jwt_token}}
```

**Body:** (Leave empty)

**Expected Response: 200 OK**

```json
[
  {
    "id": "730b2c91-3372-4d8a-90c0-46f0f09557dc",
    "title": "AI Conference 2026",
    "description": "Annual AI and Machine Learning conference",
    "category": "HACKATHON",
    "type": "ONLINE",
    "organizer": "Ignita",
    "registrationLink": "https://example.com/register",
    "startDate": "2026-05-20T09:00:00.000Z",
    "endDate": "2026-05-20T17:00:00.000Z",
    "createdAt": "2026-04-11T07:30:22.588Z",
    "updatedAt": "2026-04-11T07:30:22.588Z"
  }
]
```

✅ **What to verify:**

- Status code is `200`
- Returns array of events
- All event details are present

---

### **3. Get Single Event by ID**

**Request:**

```
GET http://localhost:3000/events/{id}
```

**Replace `{id}` with actual event ID example:**

```
GET http://localhost:3000/events/730b2c91-3372-4d8a-90c0-46f0f09557dc
```

**Auth:** ✅ Bearer Token Required

**Headers:**

```
Authorization: Bearer {{your_jwt_token}}
```

**Body:** (Leave empty)

**Expected Response: 200 OK**

```json
{
  "id": "730b2c91-3372-4d8a-90c0-46f0f09557dc",
  "title": "AI Conference 2026",
  "description": "Annual AI and Machine Learning conference",
  "category": "HACKATHON",
  "type": "ONLINE",
  "organizer": "Ignita",
  "registrationLink": "https://example.com/register",
  "startDate": "2026-05-20T09:00:00.000Z",
  "endDate": "2026-05-20T17:00:00.000Z",
  "createdAt": "2026-04-11T07:30:22.588Z",
  "updatedAt": "2026-04-11T07:30:22.588Z"
}
```

⚠️ **Common Errors:**

- ❌ `404 Not Found` - Event ID doesn't exist
- ❌ `401 Unauthorized` - Token missing

---

### **4. Update Event**

**Request:**

```
PATCH http://localhost:3000/events/{id}
```

**Example:**

```
PATCH http://localhost:3000/events/730b2c91-3372-4d8a-90c0-46f0f09557dc
```

**Auth:** ✅ Bearer Token Required

**Headers:**

```
Content-Type: application/json
Authorization: Bearer {{your_jwt_token}}
```

**Body (JSON):** _(Only send fields you want to update)_

```json
{
  "title": "Updated AI Conference 2026",
  "description": "Updated description",
  "category": "WORKSHOP",
  "type": "HYBRID"
}
```

**Expected Response: 200 OK**

```json
{
  "generatedMaps": [],
  "raw": [],
  "affected": 1
}
```

✅ **What to verify:**

- Status code is `200`
- `affected: 1` means update was successful

---

### **5. Delete Event**

**Request:**

```
DELETE http://localhost:3000/events/{id}
```

**Example:**

```
DELETE http://localhost:3000/events/730b2c91-3372-4d8a-90c0-46f0f09557dc
```

**Auth:** ✅ Bearer Token Required

**Headers:**

```
Authorization: Bearer {{your_jwt_token}}
```

**Body:** (Leave empty)

**Expected Response: 200 OK**

```json
{
  "raw": [],
  "affected": 1
}
```

✅ **What to verify:**

- Status code is `200`
- `affected: 1` means deletion was successful
- Event no longer appears in GET all events

---

## **Error Handling**

### **Common Errors & Solutions**

| Error                       | Cause                    | Solution                             |
| --------------------------- | ------------------------ | ------------------------------------ |
| `Status: 0, Time: 0 ms`     | Server not running       | Run `pnpm start:dev`                 |
| `401 Unauthorized`          | Missing/Invalid token    | Copy fresh token from login response |
| `500 Internal Server Error` | Invalid enum value       | Use valid category/type values       |
| `404 Not Found`             | Event/User doesn't exist | Check ID is correct                  |
| `400 Bad Request`           | Missing required field   | Add all required fields in body      |
| `409 Conflict`              | Email already registered | Use different email                  |

---

### **Testing Without Authentication (Should Fail)**

**Request:**

```
GET http://localhost:3000/events
```

**Auth:** ❌ No Bearer Token

**Expected Response: 401 Unauthorized**

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

✅ **Verify that protected routes reject requests without token**

---

## **Testing Workflow Order**

Follow this sequence for complete testing:

| Step | Endpoint         | Method        | Purpose             |
| ---- | ---------------- | ------------- | ------------------- |
| 1    | `/auth/register` | POST          | Create user account |
| 2    | `/auth/login`    | POST          | Get JWT token       |
| 3    | `/events`        | POST          | Create new event    |
| 4    | `/events`        | GET           | Get all events      |
| 5    | `/events/{id}`   | GET           | Get specific event  |
| 6    | `/events/{id}`   | PATCH         | Update event        |
| 7    | `/events/{id}`   | DELETE        | Delete event        |
| 8    | `/events`        | GET           | Verify deletion     |
| 9    | `/events`        | GET (no auth) | Test 401 error      |

---

## **Checklist**

### **Authentication Tests** ✅

- [ ] Register endpoint returns 201
- [ ] Login endpoint returns JWT token
- [ ] Token format is valid (starts with `ey`)
- [ ] Can copy and use token in Bearer field

### **Event Creation Tests** ✅

- [ ] Create event with HACKATHON category
- [ ] Create event with WORKSHOP category
- [ ] Create event with ONLINE type
- [ ] Create event with HYBRID type
- [ ] All returned fields are present
- [ ] Event ID is auto-generated UUID
- [ ] createdAt and updatedAt timestamps are set

### **Event Retrieval Tests** ✅

- [ ] Get all events returns array
- [ ] Get all events returns 200 status
- [ ] Get single event returns correct event
- [ ] Get single event by wrong ID returns 404
- [ ] Get events without token returns 401

### **Event Update Tests** ✅

- [ ] Update event title successfully
- [ ] Update event category successfully
- [ ] Update event type successfully
- [ ] Update multiple fields at once
- [ ] Response shows affected: 1
- [ ] Verify changes with GET request

### **Event Deletion Tests** ✅

- [ ] Delete event returns 200
- [ ] Response shows affected: 1
- [ ] Deleted event not in GET all list
- [ ] Getting deleted event by ID returns 404

### **Error Handling Tests** ✅

- [ ] Invalid enum value returns 500 error
- [ ] Missing required field returns 400
- [ ] Request without token returns 401
- [ ] Invalid event ID returns 404
- [ ] Duplicate email registration returns 409

---

## **Quick Reference - Request Templates**

### **Register**

```
POST http://localhost:3000/auth/register
Body: {"email":"user@example.com","name":"John","password":"pass123","phone":"+1234567890"}
```

### **Login**

```
POST http://localhost:3000/auth/login
Body: {"email":"user@example.com","password":"pass123"}
Auth: None
```

### **Create Event**

```
POST http://localhost:3000/events
Body: {"title":"Event","description":"Desc","startDate":"2026-05-20T09:00:00Z","endDate":"2026-05-20T17:00:00Z","category":"HACKATHON","type":"ONLINE"}
Auth: Bearer {token}
```

### **Get All Events**

```
GET http://localhost:3000/events
Auth: Bearer {token}
```

### **Get Event by ID**

```
GET http://localhost:3000/events/{eventId}
Auth: Bearer {token}
```

### **Update Event**

```
PATCH http://localhost:3000/events/{eventId}
Body: {"title":"Updated Title"}
Auth: Bearer {token}
```

### **Delete Event**

```
DELETE http://localhost:3000/events/{eventId}
Auth: Bearer {token}
```

---

## **Tips & Best Practices**

1. **Save Requests** - Save each request in the collection for reuse
2. **Save Token** - After login, copy token to environment variable
3. **Test Errors** - Always test error cases (invalid data, missing auth, etc.)
4. **Check Timestamps** - Verify createdAt and updatedAt are auto-generated
5. **Use Real Data** - Use realistic emails and data in tests
6. **Monitor Console** - Check backend terminal for SQL queries and errors
7. **Clear Between Tests** - Delete test data before running again
8. **Automate** - Create a testing script if testing frequently

---

## **Troubleshooting**

### **Port Already in Use**

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Restart server
pnpm start:dev
```

### **Database Connection Error**

```bash
# Verify PostgreSQL is running
# Windows: Check Services for PostgreSQL
# Update DATABASE_URL in .env file
# Restart server
```

### **Token Expired**

- Login again to get fresh token
- Copy new token to Bearer field
- Try request again

---

**Last Updated:** April 11, 2026
**Backend Version:** NestJS 11.0.1
**Database:** PostgreSQL
