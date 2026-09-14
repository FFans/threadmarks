# FFans Threadmarks

[![License](https://img.shields.io/packagist/l/ffans/threadmarks.svg?label=license)](https://raw.githubusercontent.com/FFans/threadmarks/2.x/LICENSE) [![Flarum](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FFFans%2Fthreadmarks%2F1.x%2Fcomposer.json&query=%24.require%5B%22flarum%2Fcore%22%5D&label=Flarum)](https://docs.flarum.org/1.x/) [![Version](https://img.shields.io/github/v/tag/FFans/threadmarks?filter=v1.*&sort=semver&label=version)](https://github.com/FFans/threadmarks/releases) [![Flarum](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FFFans%2Fthreadmarks%2F2.x%2Fcomposer.json&query=%24.require%5B%22flarum%2Fcore%22%5D&label=Flarum)](https://docs.flarum.org/2.x/) [![Version](https://img.shields.io/github/v/tag/FFans/threadmarks?filter=v2.*&sort=semver&label=version)](https://github.com/FFans/threadmarks/releases) [![Release Date](https://img.shields.io/github/release-date/ffans/threadmarks.svg?display_date=published_at&label=release%20date)](https://github.com/ffans/threadmarks/releases/latest) [![Total Downloads](https://img.shields.io/packagist/dt/ffans/threadmarks.svg?label=downloads)](https://packagist.org/packages/ffans/threadmarks/stats) [![Monthly Downloads](https://img.shields.io/packagist/dm/ffans/threadmarks.svg?label=downloads)](https://packagist.org/packages/ffans/threadmarks/stats)

A [Flarum](https://flarum.org) extension. Add threadmarks to discussions for organizing and navigating important posts.

## Features

- **Personal threadmarks**: Users can mark important posts in any discussion. Each user can add one personal threadmark per post, visible only to themselves.
- **Public threadmarks**: Discussion authors and moderators can mark important posts for readers. Each post can have one public threadmark, visible to everyone.
- **Threadmark directory**: Quickly jump to marked posts.

## Requirements

| Flarum Version | Extension Version | Branch |
|----------------|-------------------|--------|
| 2.x            | `2.x`             | `2.x`  |
| 1.8+           | `1.x`             | `1.x`  |

## Installation

Install with composer:

```sh
composer require ffans/threadmarks:"*"
```

## Updating

```sh
composer update ffans/threadmarks:"*"
php flarum migrate
php flarum cache:clear
```

## Permissions

- `ffans-threadmarks.managePersonalThreadmarks`: for users, manage personal threadmarks.
- `ffans-threadmarks.manageOwnDiscussionThreadmarks`: for authors, manage public threadmarks.
- `ffans-threadmarks.manageDiscussionThreadmarks`: for moderators, co-manage public threadmarks.

## GDPR integration

GDPR is optional. Integration is enabled automatically when `flarum/gdpr` is enabled.

- **Export** includes all personal threadmark records owned by the user, including hidden/deleted-post references, and public threadmarks whose creator or last editor is the user. Without duplicating post content.
- **Anonymize** deletes the user's personal threadmarks and clears their `created_by` / `updated_by` references on public threadmarks.
- **Delete** deletes the user's personal threadmarks and clears their `created_by` / `updated_by` references on public threadmarks. GDPR's own handlers still process posts and the user account, existing foreign keys may clear references to deleted posts.

## Translations

Want to help translate this extension? Visit Robert Korulczyk's [Weblate](https://weblate.rob006.net/projects/flarum2/ffans-threadmarks/).

## Links

- [GitHub](https://github.com/ffans/threadmarks)
- [Packagist](https://packagist.org/packages/ffans/threadmarks)
- [Discuss](https://discuss.flarum.org/d/39857)
- [Discuss in Chinese](https://discuss.flarum.org.cn/d/16563)
