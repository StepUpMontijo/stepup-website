# StepUp English School Website

This is the repository for the StepUp website, an English language school located in Montijo, Portugal.

## About the Project

This website is a modern and engaging platform for the StepUp language school, optimized for SEO and featuring strategic Call-to-Actions (CTAs) for lead capture. The design has been carefully developed to provide an intuitive and attractive experience for visitors, reflecting the quality of education offered by the school.

## Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework with Server-Side Rendering (SSR)
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript superset
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Next Intl](https://next-intl-docs.vercel.app/) - Internationalization (i18n)
- [Next Themes](https://github.com/pacocoursey/next-themes) - Light/dark theme support
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications
- [Zod](https://zod.dev/) - Schema validation
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide React](https://lucide.dev/) - Icon library

## Key Features

- Multilingual website (Portuguese and English)
- Responsive design for all devices
- Optimized lead capture forms
- Enhanced SEO
- Direct integration with Zoho Bigin CRM
- Toast notifications for form feedback

## Zoho Bigin CRM Integration

The contact form is directly integrated with Zoho Bigin CRM. The implementation uses the Zoho Bigin web form API to submit data directly to the CRM system without requiring environment variables.

The `BiginForm` component supports:

- Required fields validation
- Custom error messages
- Success/error notifications
- Customizable appearance (transparent mode)
- Optional title and subtitle

## How to Run the Project

1. Clone this repository:

```bash
git clone https://github.com/your-username/stepupidiomas.git
cd stepupidiomas
```

2. Install dependencies:

```bash
npm install
# or
yarn
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
project/
├── app/                   # Main Next.js directory
│   ├── [locale]/          # Routes with language support
│   │   ├── page.tsx       # Home page
│   │   └── layout.tsx     # Layout with providers
│   └── globals.css        # Global CSS styles
├── components/            # Reusable React components
├── messages/              # Translation files (i18n)
│   ├── en.json            # English translations
│   └── pt.json            # Portuguese translations
├── public/                # Static files
│   └── images/            # Website images
└── middleware.ts          # Middleware for internationalization
```

## Contact

For more information about this project, please [get in touch](mailto:107703258+rsoaresdev@users.noreply.github.com).
