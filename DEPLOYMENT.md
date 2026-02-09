# Deploying Travel Planner

Sharing your Travel Planner with friends is easy! Since this is a static website (HTML, CSS, JS), you can host it for free on many platforms.

## Prerequisites

1.  Make sure you have run the **build** command to generate the production files:
    ```bash
    npm run build
    ```
    This will create a `dist/` folder in your project directory. This folder contains everything needed to run the app.

---

## Option 1: Netlify Drop (Easiest)

**Netlify** allows you to simply drag and drop your build folder to put it online.

1.  Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2.  Open your file explorer and confirm you have a `dist` folder inside `TravelPlaner`.
3.  **Drag and drop the `dist` folder** onto the Netlify page.
4.  Wait a few seconds for it to upload.
5.  **Done!** Netlify will give you a unique URL (e.g., `silly-name-123456.netlify.app`).
6.  You can copy this link and send it to your friends!

---

## Option 2: Vercel

**Vercel** is another great option, especially if you want to connect it to a GitHub repository for automatic updates.

1.  Install Vercel CLI (optional) or just go to [vercel.com/new](https://vercel.com/new).
2.  Import your GitHub repository if you pushed your code to GitHub.
3.  Vercel will detect it's a **Vite** project and set up the build settings automatically.
4.  Click **Deploy**.

---

## Option 3: GitHub Pages

If you want to host it on GitHub Pages:

1.  Push your code to a GitHub repository.
2.  Go to **Settings** > **Pages**.
3.  Select standard Source (e.g. `main` branch) or use a GitHub Action to build the Vite app.
    *   *Note*: For Vite apps on GitHub Pages, you might need to set the `base` in `vite.config.js` if it's not at the root domain.

## Sharing with Friends

Once deployed, just send the link!
-   They can use the app on their phone or computer.
-   Data is saved to **their** browser's Local Storage (it's private to them).
-   If they want to share their plan with *you*, they can click **Export Plan** and send you the `.json` file.
