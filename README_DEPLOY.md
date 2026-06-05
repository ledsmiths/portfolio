# GitHub Pages Deployment

This portfolio is a static website. GitHub Pages can publish it directly from the repository root.

## Before Publishing

- The homepage entry file is `index.html`.
- The VitaPaw live demo is included at `assets/Vitapaw/vitapawdemo/index.html`.
- Keep the `assets` folder in the repository so project images and demo media continue to load.

## GitHub Pages Settings

1. Push this folder to a GitHub repository.
2. Open the repository on GitHub.
3. Go to `Settings` -> `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select branch `main` and folder `/root`.
6. Save.

GitHub will publish the site after a short build. The live demo link will work as long as the `assets/Vitapaw/vitapawdemo` folder is committed.
