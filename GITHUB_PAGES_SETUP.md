# Setting Up GitHub Pages for PuppyRewind

Follow these steps to make your GitHub Pages site load the PuppyRewind app page instead of the README:

## Steps:

1. **Push the `docs` folder to your GitHub repository:**
   ```bash
   git add docs/
   git commit -m "Add GitHub Pages landing page"
   git push
   ```

2. **Enable GitHub Pages in your repository settings:**
   - Go to your repository on GitHub
   - Click on **Settings** tab
   - Scroll down to the **Pages** section (in the left sidebar under "Code and automation")
   - Under **Source**, select **Deploy from a branch**
   - Under **Branch**, select:
     - Branch: `main` (or `master` if that's your default branch)
     - Folder: `/docs`
   - Click **Save**

3. **Wait a few minutes** for GitHub to build and deploy your site

4. **Access your site** at: `https://YOUR_USERNAME.github.io/PuppyRewind`

## What was created:

- A `docs/index.html` file with a professional landing page for your app
- The page explains what PuppyRewind is and how to run it
- It includes links back to your GitHub repository

## Note about React Native apps:

React Native apps (like PuppyRewind) are designed to run on mobile devices or through Expo. They can't be directly deployed to GitHub Pages the same way a regular web app can. The landing page provides information about your app and directs users to the repository where they can:

- Clone and run the app locally
- Use Expo Go to test it on their phone
- Learn more about the project

If you want to make a true web version of your app, you would need to use Expo's web export feature, but that requires additional configuration and may not support all React Native features.
