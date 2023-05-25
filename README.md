## FWCCN Automation

---

### Tech Stack
* Next.js / React
* MongoDB
* Tailwind

### Requirements
* node.js
* mongodb: cloud or local server

---

### First, create an .env.local file in the root directory of the project
_If you just want to review the form. Skip this step._ 
>Note Attempting to submit form data without env variables with give an error

Include the following environment variables:
```env
LOCAL_URI = "mongodb://localhost:<port>/<database>"
MONGO_DB_COL = "<collection>"
```

If you would like to connect to MongoDB Atlas replace the ```LOCAL_URI``` string with
the connection string. 
```env
LOCAL_URI = "mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority"
```

> For dev purposes currently there is a LOCAL_URI and MONGO_URI to easily switch back and forth in our dev teams .env.local file

If you choose to do something similar the environment variables are located in these two files:
[./lib/connectMongo.js](https://github.com/theGaryLarson/fwccn-automation/blob/demo_branch/lib/connectMongo.js)
[./models/applicant_schema.js](https://github.com/theGaryLarson/fwccn-automation/blob/demo_branch/models/applicant_schema.js)

---

### Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
This project currently uses API routes to insert form inputs as a document into a local Mongo database.

---

### See demo branch deployed here
 [FWCCN Form Automation](https://fwccn-automation-fr1wq3ih7-thegarylarson.vercel.app/)

> Current Issue | Production build does not submit data as expected. If you try to submit on vercel will get an error.
