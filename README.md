# Duka Ledger

Offline customer-credit ledger for small shops. All data stays on the phone.

Files: `index.html` (the app), `manifest.webmanifest` and `sw.js` (make it installable and offline), four icon PNGs.

## Put it online with GitHub Pages
1. Create a repository (public), for example `duka-ledger`.
2. Upload all files in this folder to the top level of the repository.
3. Settings, Pages, Source: "Deploy from a branch", branch `main`, folder `/ (root)`, Save.
4. After a minute the app is at `https://<your-username>.github.io/duka-ledger/`.

## Install on the phone
Open that link in Chrome once with internet, then menu (three dots), "Install app" or "Add to Home screen". After that it opens from the home screen and works with no internet.

## Updating
Replace `index.html` in the repository. Installed phones pick up the new version the next time the app is opened (twice, the first open refreshes the saved copy).
If you add or rename files, also add them to the `SHELL` list in `sw.js`.
