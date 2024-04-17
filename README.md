## FWCCN Automation

---

### Tech Stack
* Next.js / React
* MongoDB
* Mongoose
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
DB_URI = "mongodb://localhost:<port>/<database>"
MONGO_DB_COL = "<collection>"
```

If you would like to connect to MongoDB Atlas replace the ```DB_URI``` string with
the connection string. 
```env
DB_URI = "mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority"
```

If you choose to do something similar the environment variables are located in these two files:

[./lib/connectMongo.js](./lib/connectMongo.js)

[./models/applicant_schema.js](./models/applicant_schema.js) (Very bottom of file)

---

### Second in the terminal run 
```npm install```

After the dependencies are done installing then...

---

### Third, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.</br>
This project currently uses API routes to insert form inputs as a document into a local Mongo database.

See file here:

[./src/pages/api/add.js](./src/pages/api/add.js)

---

### See demo branch deployed on Vercel here
 [FWCCN Form Automation](https://fwccn-automation.vercel.app/)

> DO NOT ENTER ANY PERSONAL INFORMATION. THIS IS PUBLIC FACING ANYONE CAN VIEW IT.
