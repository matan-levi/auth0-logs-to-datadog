# Auth0 - Logs to DataDog

This extension will take all of your Auth0 logs and export them to [DataDog](https://www.datadoghq.com).

[![CircleCI](https://circleci.com/gh/BetaProjectWave/auth0-logs-to-datadog.svg?style=svg)](https://circleci.com/gh/BetaProjectWave/auth0-logs-to-datadog)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b60ef9948cea43cebea99dc8b0c1721e)](https://www.codacy.com/app/BetaProjectWave/auth0-logs-to-datadog?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=BetaProjectWave/auth0-logs-to-datadog&amp;utm_campaign=Badge_Grade)

## Installation

This custom extension can be installed from the [Extensions Gallery](https://manage.auth0.com/#/extensions).

[![Auth0 Extensions](http://cdn.auth0.com/extensions/assets/badge.svg)](https://sandbox.it.auth0.com/api/run/auth0-extensions/extensions-badge?webtask_no_cache=1)

### Assets

Because this is not an official extension, the assets are not hosted in the Auth0 CDN but on GitHub Pages.

## Usage

Go to the `logs` section of your [DataDog](https://app.datadoghq.com/logs) account and filter by `source: auth0`.

## Build

In order to build the extension locally you have to have NodeJS 6+ installed and run:

To install dependencies:

```bash
yarn install --ignore-engines
```

To bundle the app:

```bash
yarn build
```

## Webtask

If you haven't configured Webtask on your machine run this first:

```bash
npm install -g wt-cli
wt init
```

### Deploy to Webtask.io

To run it on a schedule (run every 5 minutes for example):

```bash
yarn install && yarn build
wt cron create \
    --name auth0-logs-to-datadog \
    --secret AUTH0_DOMAIN="YOUR_AUTH0_DOMAIN" \
    --secret AUTH0_GLOBAL_CLIENT_ID="YOUR_AUTH0_GLOBAL_CLIENT_ID" \
    --secret AUTH0_GLOBAL_CLIENT_SECRET="YOUR_AUTH0_GLOBAL_CLIENT_SECRET" \
    --secret DATADOG_API_KEY="YOUR_DATADOG_API_KEY" \
    --schedule "*/5 * * * *" \
    build/bundle.js
```

The following settings are optional:

 - `LOG_LEVEL`: This allows you to specify the log level of events that need to be sent.
 - `LOG_TYPES`: If you only want to send events with a specific type (eg: failed logins). This needs to be a comma separated list.

> You can get your Global Client Id/Secret here: https://auth0.com/docs/api/v2

## Filters

The `LOG_LEVEL` can be set to (setting it to a value will also send logs of a higher value):

 - `1`: Debug messages
 - `2`: Info messages
 - `3`: Errors
 - `4`: Critical errors

The `LOG_TYPES` filter can be set to:

- `s`: Success Login (level: 1)
- `ssa`: Success Silent Auth (level: 1)
- `fsa`: Failed Silent Auth (level: 3)
- `seacft`: Success Exchange (level: 1)
- `feacft`: Failed Exchange (level: 3)
- `f`: Failed Login (level: 3)
- `w`: Warnings During Login (level: 2)
- `du`: Deleted User (level: 1)
- `fu`: Failed Login (invalid email/username) (level: 3)
- `fp`: Failed Login (wrong password) (level: 3)
- `fc`: Failed by Connector (level: 3)
- `fco`: Failed by CORS (level: 3)
- `con`: Connector Online (level: 1)
- `coff`: Connector Offline (level: 3)
- `fcpro`: Failed Connector Provisioning (level: 4)
- `ss`: Success Signup (level: 1)
- `fs`: Failed Signup (level: 3)
- `cs`: Code Sent (level: 0)
- `cls`: Code/Link Sent (level: 0)
- `sv`: Success Verification Email (level: 0)
- `fv`: Failed Verification Email (level: 0)
- `scp`: Success Change Password (level: 1)
- `fcp`: Failed Change Password (level: 3)
- `sce`: Success Change Email (level: 1)
- `fce`: Failed Change Email (level: 3)
- `scu`: Success Change Username (level: 1)
- `fcu`: Failed Change Username (level: 3)
- `scpn`: Success Change Phone Number (level: 1)
- `fcpn`: Failed Change Phone Number (level: 3)
- `svr`: Success Verification Email Request (level: 0)
- `fvr`: Failed Verification Email Request (level: 3)
- `scpr`: Success Change Password Request (level: 0)
- `fcpr`: Failed Change Password Request (level: 3)
- `fn`: Failed Sending Notification (level: 3)
- `limit_wc`: Blocked Account (level: 4)
- `limit_ui`: Too Many Calls to /userinfo (level: 4)
- `api_limit`: Rate Limit On API (level: 4)
- `sdu`: Successful User Deletion (level: 1)
- `fdu`: Failed User Deletion (level: 3)

So, for example, if I want to filter on a few events I would set the `LOG_TYPES` filter to: `sce,fce,scu,fcu`.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section.

## Author

Paul Pop <ppop@and.digital>

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
