# Duka Ledger

Offline customer-credit ledger for small shops. All data stays on the phone.

Files: `index.html` (markup and styles), `app.js` (all app logic, loaded as a same-origin script so the page's Content-Security-Policy can forbid inline scripts), `manifest.webmanifest` and `sw.js` (make it installable and offline), four icon PNGs.

## Put it online with GitHub Pages
1. Create a repository (public), for example `duka-ledger`.
2. Upload all files in this folder to the top level of the repository.
3. Settings, Pages, Source: "Deploy from a branch", branch `main`, folder `/ (root)`, Save.
4. After a minute the app is at `https://<your-username>.github.io/duka-ledger/`.

## Install on the phone
Open that link in Chrome once with internet, then menu (three dots), "Install app" or "Add to Home screen". After that it opens from the home screen and works with no internet. Installing also makes the browser far less likely to clear the data.

## Updating
Replace the files in the repository. Phones that already have the app download the new version in the background and show an "A new version is ready. Update" banner; tapping it loads the new version.
If you add or rename files, add them to the `SHELL` list in `sw.js`. Always bump the `CACHE` name in `sw.js` (for example `duka-ledger-v4`) whenever any file changes, otherwise installed phones will not notice the update.

## Security notes
- **PIN lock encrypts the ledger.** With a PIN set, the ledger is stored on the phone as AES-GCM ciphertext; the key comes from the PIN through PBKDF2-SHA256 (200,000 rounds) with a random per-install salt. The PIN itself is never stored. Wrong tries are limited: after 5 mistakes the app makes you wait 30 s, then longer each time (up to 1 hour). A 4-digit PIN has only 10,000 combinations, so it stops casual snooping and slows a determined attacker, but it is not unbreakable; keep backups safe too.
- Older versions stored a simple PIN hash and the data in plain text. Those phones are upgraded to encryption automatically the first time the PIN is entered after the update.
- If the PIN is forgotten, the only way back in is "Forgot PIN?" on the lock screen and restoring a backup file; this replaces everything on the phone and removes the PIN. Restoring (also from the lock screen) always asks for confirmation first, since it cannot be undone.
- A restored backup is treated as untrusted: every field is validated, so a tampered backup file cannot inject anything into the app. Backup files themselves are plain text: store them somewhere safe.
- The page sends a strict Content-Security-Policy that allows only same-origin scripts (no inline script runs) and network calls only to this site and to api.web3forms.com (optional email backup).
- **Email backup is optional and uses the shopkeeper's own address.** Nothing is sent anywhere unless a Web3Forms key is entered in Settings. The app contains no developer email address. Backups emailed through Web3Forms pass through that service on their way to the shopkeeper's inbox, and the Settings text says so.
- Amounts must be plain numbers (for example `250` or `250.50`, up to 10,000,000). Anything else is rejected instead of being guessed at.
- The app asks the browser to keep its data (`navigator.storage.persist()`); Settings, Backup & restore says whether that was granted.
