# Duka Ledger

Offline customer-credit ledger for small shops. All data stays on the phone.

Files: `index.html` (the app shell/markup) and `app.js` (the app logic — kept as a separate file so the page's Content-Security-Policy can allow only same-origin scripts, with no inline script permitted), `manifest.webmanifest` and `sw.js` (make it installable and offline), four icon PNGs.

## Put it online with GitHub Pages
1. Create a repository (public), for example `duka-ledger`.
2. Upload all files in this folder to the top level of the repository.
3. Settings, Pages, Source: "Deploy from a branch", branch `main`, folder `/ (root)`, Save.
4. After a minute the app is at `https://<your-username>.github.io/duka-ledger/`.

## Install on the phone
Open that link in Chrome once with internet, then menu (three dots), "Install app" or "Add to Home screen". After that it opens from the home screen and works with no internet.

## Updating
Replace `index.html` and/or `app.js` in the repository. Installed phones pick up the new version the next time the app is opened (twice, the first open refreshes the saved copy).
If you add or rename files, also add them to the `SHELL` list in `sw.js`, and bump the `CACHE` version there so installed phones actually fetch the new files instead of serving their old cached copy.

## Security notes
- A PIN (Settings → PIN lock) encrypts the ledger on the phone (AES-GCM, key derived from the PIN with PBKDF2) rather than just hiding the screen; without the correct PIN the stored file is unreadable.
- Restoring a backup — including via "Forgot PIN" on the lock screen — always asks for confirmation first, since it replaces everything on the phone and cannot be undone.
- A restored backup is treated as untrusted: every customer/entry gets a freshly generated ID and all fields are validated, so a tampered backup file can't inject anything into the app.
- The page sends a strict Content-Security-Policy that only allows same-origin scripts (no inline script of any kind runs), which is also why the app logic lives in `app.js` instead of inline in `index.html`.
