---
title: "Encrypted Cloud Backup"
description: "Experiments in encrypted syncing and cloud storage"
---

# Experiments in encrypted syncing

### Preface

I went down a rabbit hole this week. It started with encrypting my notes locally with Cryptomator and ended with a multi-device encrypted cloud backup. What I wanted was simple: sync notes and photos between devices, make them accessible everywhere (primarily as a homemade obsidian sync), and keep an encrypted backup on Google Drive so nothing in plaintext ever touches the cloud.

Totally overkill? Absolutely. But it works. And at the end of the day, it was really just a fun experiment disguised as infrastructure learning.


### Requirements

Here's what I set out to do:
- Sync notes, documents, and photos between my devices.
- Only store what's needed locally (my laptop doesn't need every photo).
- Have a full, always-on machine at home to act as the server/hub.
- Back everything up to Google Drive encrypted.
- Stay cross-platform: Linux, macOS, Android.
- Keep my notes readable in Obsidian everywhere.

### Tools

- Google Drive – off-site backup, nothing stays plaintext.
- rclone – encrypts and syncs to Drive.
- Syncthing – live peer-to-peer sync between all my devices.
- Termux – brings Linux tools to Android for scheduled backups and file access.
- Along the way, I flirted with Cryptomator as well. It's great, just not practical for constant file editing across devices.

### Architecture

At the heart of this setup is my tower PC — the always-on hub.
It keeps the full dataset and runs an encrypted nightly backup to Google Drive.

#### 🖥️ Tower PC

- Stores everything: notes, documents, photos, media.
- Runs a nightly cron job to sync encrypted copies to Drive.
- Serves as the Syncthing hub for all other devices.

#### 💻 Laptops

- Sync only the notes folder bi-directionally for Obsidian.
- Keeps things light but always up to date.

#### 📱 Pixel

- Syncs notes (bi-directional) and photos (one-way from camera).
- Uses Termux for optional encrypted Drive backups.

That's it: one main remote node that does the heavy lifting, and smaller devices that only hold what they actually need.

### The setup (and challenges)

#### Step 1: Rclone: the encrypted remote

This part took longer than I want to admit. After confusing myself with rclone bisync, --max-delete, and crypt remotes, the working config ended up simple:

\`\`\`ini
[gdrive]
type = drive
scope = drive

[gcrypt]
type = crypt
remote = gdrive:gcrypt
filename_encryption = standard
directory_name_encryption = true
password = ...
password2 = ...
\`\`\`
On my Tower, I run this nightly via cron:
\`\`\`bash
rclone sync ~/Documents/gcrypt gcrypt: \
  --fast-list \
  --check-access \
  --log-file ~/rclone-backup.log \
  --log-level INFO
\`\`\`
Cron job (crontab -e):
\`\`\`bash
0 3 * * * rclone sync ~/Documents/gcrypt gcrypt: --fast-list --check-access --log-file ~/rclone-backup.log --log-level INFO
\`\`\`
---
#### Step 2: Syncthing — making everything talk

I started by trying rclone bisync for device sync. That lasted one day.
Syncthing is just better for this. It's real-time, local-first, and requires no cloud.

Every device runs it, but the Tower is the hub.
- Tower: full sync of ~/Documents/gcrypt
- Mac + Linux laptops: only sync ~/Documents/gcrypt/notes
- Pixel: sync notes + media/photos
- Pixel DCIM/Camera: Send-Only → Tower gcrypt/media/photos

Ignore patterns make this possible:
##### Mac
\`\`\`
!notes/**
*
\`\`\`
##### Pixel
\`\`\`
!notes/**
!media/photos/**
*
\`\`\`
This way, each device only pulls what it needs.

#### Step 3: Termux to rescue

Android was the biggest hurdle.
Termux stores everything under /data/data/com.termux/... — completely private, meaning no other app can see it.

The fix:
\`\`\`
termux-setup-storage
\`\`\`
That mounts shared folders like this:
\`\`\`
~/storage/Documents → /storage/emulated/0/Documents
\`\`\`
Now Obsidian vaults, Syncthing, and Termux all point at the same path if I need to sync and backup if I want:
/storage/emulated/0/Documents/gcrypt

#### Step 4: Dealing with photos (DCIM problem)

The Pixel camera dumps photos into /storage/emulated/0/DCIM/Camera, which isn't inside the Syncthing folder.
Instead of moving them, I added it as its own Syncthing folder:

Pixel: /storage/emulated/0/DCIM/Camera → Send-Only

Tower: ~/Documents/gcrypt/media/photos → Receive-Only

This way, every photo gets safely copied to my tower, encrypted at night, and never leaves the ecosystem unencrypted automatically - I can disable Google Photo, view Libraries on Aves and still back up on the cloud.

#### Cryptomator: the alternate path

I explored Cryptomator we well. It's very cool and will likely use it locally, but was less ideal when you're editing files constantly in Obsidian or syncing between Android and desktop.

For now, I use it as an extra vault for especially sensitive documents, not part of my main sync flow.

### What I learned

- Syncthing beats rclone bisync for local sync. rclone bisync is fantastic for two endpoints, but not for a multi-device world.

- rclone sync (one-way) is enough for cloud backups. It's simpler, faster, and safer.
- Android is weird. Always use /storage/emulated/0/... for anything shared.
- Hub-and-spoke wins. My Tower is the single source of truth.
- Encrypted doesn't mean complex. Once it's set, it's basically invisible.

### Final Stack
| Layer               | Tool             | Function                            |
| ------------------- | ---------------- | ----------------------------------- |
| Device ↔ Device     | **Syncthing**    | Real-time sync (hub-and-spoke)      |
| Device → Cloud      | **rclone crypt** | Nightly encrypted backup            |
| Android integration | **Termux**       | Mobile file managent                |
| Extras              | **Cryptomator**  | Local vaults only                   |
| Editing             | **Obsidian**     | Notes in plaintext on local storage |

### Closing thoughts

This setup is way beyond what I need — but that's what made it fun.
I ended up with a fully private, redundant, encrypted storage ecosystem that doesn't depend on any single provider, and everything just hums along in the background now.

My photos flow to my tower. My notes update everywhere. Google Drive holds an encrypted snapshot every night.
No subscriptions, no vendor lock-in — just a bunch of open-source tools stitched together into something quietly powerful.

If you ever feel like taking the long way to understand how your files move and how encryption fits into everyday use — build your own "Dropbox." It's worth it.
