This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Prompts from ChatGpt:

1. Okay i need to create a context for storing data gotten from the backend so i can use it in other pages do you understand? Also the data should stay on refresh of the page thats all it should do Give me that and expain the code for it This is the fetch function that i have // Function to send data to backend const sendPhoneNumber = async () => { const fullPhone = +234-${phone}; try { const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; const url = ${baseUrl}/score_and_generate_pdf/${fullPhone}; const res = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json", }, }); if (!res.ok) { throw new Error("Request failed with status " + res.status); } const data = await res.json(); setBackendData(data); console.log("Backend Response:", data); } catch (error) { console.error("Error sending phone:", error.message); } ;

2. For all the numbers here, I want to make it so that if its from 0-39, its yellow If its from 40 -50 its blue then if its 50 and above till 100, its green <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12 w-full px-6"> <ProgressCard icon="/images/group.png" title="Mobile Money Patterns" label="Loading transactions..." targetValue={p1} speed={10} /> <ProgressCard icon="/images/group (1).png" title="Loan App History" label="Verifying loan records..." targetValue={p2} speed={10} /> <ProgressCard icon="/images/group (2).png" title="Sim Top-up Pattern" label="Analyzing top-up trends..." targetValue={p3} speed={10} /> <ProgressCard icon="/images/group (3).png" title="SIM Stability Check" label="Evaluating SIM usage..." targetValue={p4} speed={10} /> <ProgressCard icon="/images/streamline-cyber-color_network.png" title="Income Pattern" label="Evaluating income flow..." targetValue={p5} speed={10} /> <ProgressCard icon="/images/betting.png" title="Betting App Usuage" label="Verifying Betting Frequency..." targetValue={p6} speed={10} /> </div>

3. What I want is, when the user tries a new number, the animation starts from 0 and on refresh too, it should start from 0
   It already does tho
   Even the other progress cards too
   Do you understand, it should no animate to the previous numbers score but animating to the current numbers score

4. If backend sends a pdf file encoded in byte 64, how can i receive it in frontend and enable the user down load it on click of a button

5. I need to create something like this
   The circle fills up to 100 and the texts there too fill up 100/100 and when it finishes filling up a new page that ive aleady created should open
   Can you do that?
