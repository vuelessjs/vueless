## How to run the project locally

- Install **node.js 16.XX** version (see [instructions](https://nodejs.org/en/download/package-manager/) for your OS).

- Install globally [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable):

```bash
npm install --global yarn
```

- Create project folder and clone files from Git into:

```bash
# download project from remote repository
git clone origin git@gitlab.com:<project_name>.git

# go to project folder
cd <project_name>
```

- Install project dependencies (node_modules):

```bash
yarn install
```

- Create environment file:

```bash
#  for local environment
cp .env.local.example .env.local
```

- Run the app in **development** mode:

```bash
yarn dev
```

- The project is ready!

## REST API

- Public URL: https://fine.gitbook.io/api/

- Development URL (same but editable):

  - URL: https://app.gitbook.com/s/-MAVM-6BL-A_fpwuMsE1/
  - Login: i.ivan.gridnev@gmail.com
  - Password: XZQnUtFEZ4v9PML

Section **AUTH & APPS** contains **Main** application endpoints, while section **APP INSTANCE** contains **Business** application endpoints.


## Additional commands

- Open Storybook (frontend base UI components documentation):

```bash
# run Storybook in development mode (with docs and stories):
# It's good for debugging components.
yarn sb:dev-full

# run Storybook in development mode (with docs only):
yarn sb:dev

# build Storybook (to publish in the web):
yarn sb:build

# Run the built application from a `/storybook-static` folder in production mode:
yarn sb:preview
```

- Run code-style check / formatting:

```bash
# check code style (only show errors)
yarn lint

# check code style and fix all possible errors
yarn lint:fix

# check code style of given file paths (fail pipeline if at least 1 error or warning appears)
yarn lint:ci
```

- Run auto tests:

```bash
# start unit tests
yarn test:unit

# start end to end tests
yarn test:e2e

# start end to end tests in headless mode (no UI)
yarn test:e2e-ci
```

- Build application:

```bash
# for the dev / test / production servers
cp .env.example .env

yarn build
# TIP: 📐
# to analise and reduce the build size see the report.html in a project root folder.
```

- Run the built application from a `/dist` folder in **production mode**:

```bash
yarn preview
```

- Automated releases (new app release in GitLab and increase app version number):

```bash
# increase third app version number (0.0.X).
yarn release

# increase second app version number (0.X.0).
yarn release:production

# increase first app version number (X.0.0).
release:production-major
```

- Update browserslist DB to the latest version (it changes yarn.lock only):

```bash
npx browserslist@latest --update-db
```

- **Note**: `yarn` automatically calls the` postinstall` command,
  which generate components web-types for IDE (props autocomplete).
If you need to do this manually, just use the command below:

```bash
node .mono/our.library.web-types-gen
```

## Capacitor (iOS & Android apps)

- Update app src after `dist` or `capacitor.config.js` file changes:

```bash
npx cap copy
```

- Open iOS app locally:

```bash
npx cap open ios
```

- Open Android app locally:

```bash
npx cap open android
```

- Sync the app after new capacitor plugin installation:

```bash
npx cap sync
```

- Generate app icons and splash screens ([docs](https://github.com/ionic-team/capacitor-assets)):

```bash
npx @capacitor/assets generate --assetPath 'public/static/capacitor' --iconBackgroundColor '#FFFFFF' --iconBackgroundColorDark '#111827' --splashBackgroundColor '#F3F4F6' --splashBackgroundColorDark '#1F2937' --ios --android
```
