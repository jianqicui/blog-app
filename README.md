# Blog App - Simple Blog Management

Welcome to Blog App, a simple blog management application built with Tailwind CSS, React, Next.js, Next-Auth, and Prisma. This project allows you to efficiently manage your blog.

## Getting Started

To get started with Blog App, follow these simple steps:

1. Clone the repository to your local machine.
2. Install npm dependencies with `npm i`.
3. Create a Postgres database and configure `DATABASE_URL` in file `.env`.
4. Generate database tables with `npx prisma db push`.
5. Initialize database tables with `npx prisma db seed`.
6. Use `openssl rand -base64 32` or https://generate-secret.vercel.app/32 to generate a random value, and configure `NEXTAUTH_SECRET` in file `.env`.
7. Run the application locally with `npm run dev`.
8. Open `http://localhost:3000/` in browser.

## Information

- **Blog Categories**: Science, Technology, Life, Sports and Entertainment.
- **User Login**: user1/pass1234, user2/pass1234, user3/pass1234 and user4/pass1234.

## Technologies Used

- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.
- [React](https://reactjs.org/): A popular JavaScript library for building user interfaces.
- [Next.js](https://nextjs.org/): A powerful framework for server-rendered React applications.
- [Next-Auth](https://next-auth.js.org/): A simple and flexible authentication library for Next.js applications.
- [Prisma](https://www.prisma.io/): Prisma provides the best experience for your team to work and interact with databases.
