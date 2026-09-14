# FFans Threadmarks

[![许可证](https://img.shields.io/packagist/l/ffans/threadmarks.svg?label=许可证)](https://raw.githubusercontent.com/FFans/threadmarks/2.x/LICENSE) [![Flarum](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FFFans%2Fthreadmarks%2F1.x%2Fcomposer.json&query=%24.require%5B%22flarum%2Fcore%22%5D&label=Flarum)](https://docs.flarum.org/1.x/) [![最新版本](https://img.shields.io/github/v/tag/FFans/threadmarks?filter=v1.*&sort=semver&label=最新版本)](https://github.com/FFans/threadmarks/releases) [![Flarum](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FFFans%2Fthreadmarks%2F2.x%2Fcomposer.json&query=%24.require%5B%22flarum%2Fcore%22%5D&label=Flarum)](https://docs.flarum.org/2.x/) [![最新版本](https://img.shields.io/github/v/tag/FFans/threadmarks?filter=v2.*&sort=semver&label=最新版本)](https://github.com/FFans/threadmarks/releases) [![发布日期](https://img.shields.io/github/release-date/ffans/threadmarks.svg?display_date=published_at&label=发布日期)](https://github.com/ffans/threadmarks/releases/latest) [![总下载量](https://img.shields.io/packagist/dt/ffans/threadmarks.svg?label=总下载量)](https://packagist.org/packages/ffans/threadmarks/stats) [![月下载量](https://img.shields.io/packagist/dm/ffans/threadmarks.svg?label=月下载量)](https://packagist.org/packages/ffans/threadmarks/stats)

[Flarum](https://flarum.org) 扩展程序。为你的讨论标记关键内容。

## 功能

- 私人标记：用户可以在任意讨论中，标记其中的重要帖子，每个帖子限一个标记，标记仅自己可见。
- 公共标记：讨论发起者和管理人员可以为读者标记其中的重要帖子，每个帖子限一个标记，标记公开可见。
- **标记列表**：快捷跳转到标记内容。

## 要求

| Flarum 版本 | 扩展版本 | 分支  |
|-------------|----------|-------|
| 2.x         | `2.x`    | `2.x` |
| 1.8+        | `1.x`    | `1.x` |

## 安装

使用 Composer:

```sh
composer require ffans/threadmarks:"*"
```

## 更新

```sh
composer update ffans/threadmarks:"*"
php flarum migrate
php flarum cache:clear
```

## 权限

- `ffans-threadmarks.managePersonalThreadmarks`: 用户用，管理仅自己可见的标记。
- `ffans-threadmarks.manageOwnDiscussionThreadmarks`: 楼主用，管理公共标记。
- `ffans-threadmarks.manageDiscussionThreadmarks`: 管理人员用，管理公共标记。

## GDPR 集成

可选。启用 `flarum/gdpr` 后自动集成。

- **导出**：包含用户的全部个人帖标记录（包括指向隐藏或已删除帖子的记录），以及作为创建者或最后编辑者的公共帖标。不重复导出帖子正文。
- **匿名化**：删除要匿名化的用户的个人帖标、清空公共帖标中属于该用户的 `created_by` / `updated_by` 值。
- **删除**：删除要抹除的用户的个人帖标，清空公共帖标中属于该用户的 `created_by` / `updated_by` 值。GDPR 自身会处理帖子和用户账号，帖标外键可能清空指向已删除帖子。

## 翻译

帮助翻译本扩展，请前往 Robert Korulczyk 的 [Weblate 平台](https://weblate.rob006.net/projects/flarum2/ffans-threadmarks/)。

## 链接

- [GitHub](https://github.com/ffans/threadmarks)
- [Packagist](https://packagist.org/packages/ffans/threadmarks)
- [英文社区](https://discuss.flarum.org/d/39857)
- [中文社区](https://discuss.flarum.org.cn/d/16563)
