# Contributing

A big welcome and thank you for considering contributing to a Vueless open source project! 
It’s people like you that make it a reality for users in our community.

Reading and following these guidelines will help us make the contribution process easy and effective for everyone involved. 
It also communicates that you agree to respect the time of the developers managing and developing these open source projects. 
In return, we will reciprocate that respect by addressing your issue, assessing changes, and helping you finalize your pull requests.

## Code of Conduct

We take our open source community seriously and hold ourselves and other contributors to high standards of communication. 
By participating and contributing to this project, you agree to uphold our [Code of Conduct](CODE-OF-CONDUCT.md).

## Getting Started

Contributions are made to this repo via Issues and Pull Requests (PRs). A few general guidelines that cover both:

- To report security vulnerabilities, please use this email: [report@vueless.com](mailto:report@vueless.com) which is monitored by our security team.
- Search for existing Issues and PRs before creating your own.
- We work hard to make sure issues are handled in a timely manner but, depending on the impact, it could take a while to investigate the root cause. A friendly ping in the comment thread to the submitter or a contributor can help draw attention if your issue is blocking.

## Issues

Issues should be used to report problems with the library, request a new feature, or to discuss potential changes before a PR is created. 
When you create a new Issue, a template will be loaded that will guide you through collecting and providing the information we need to investigate.

If you find an Issue that addresses the problem you're having, please add your own reproduction information to the existing issue rather than creating a new one. 
Adding a [reaction](https://github.blog/2016-03-10-add-reactions-to-pull-requests-issues-and-comments/) can also help be indicating to our maintainers 
that a particular problem is affecting more than just the reporter.

## Commit Message Format

We have very precise rules over how our Git commit messages must be formatted which based on [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) and [Angular Commits](https://github.com/angular/angular/blob/main/contributing-docs/commit-message-guidelines.md) specifications.
This format leads to **easier to read commit history** and makes it analyzable for changelog generation.

Each commit message consists of a **header**, a **body**, and a **footer** separated by blank lines.

```
<header>

<body>

<footer>
```

The `header` is mandatory and must conform to the [Commit Message Header](#commit-header) format.

The `body` is optional. When the body is present, it must be at least 20 characters long and must conform to the [Commit Message Body](#commit-body) format.

The `footer` is optional. The [Commit Message Footer](#commit-footer) format describes what the footer is used for and the structure it must have.


### <a name="commit-header"></a>Commit Message Header

```
<type>: <short summary>
  │       │
  │       └─⫸ Summary in present tense. Not capitalized. No period (.) at the end.
  │ 
  └─⫸ Commit Type: feat | fix | perf | refactor | test | build | chore | ci | docs
```

The `<type>` and `<summary>` fields are mandatory.


#### Type

Must be one of the following:

| Type         | Description                                                                                                                |
|--------------|----------------------------------------------------------------------------------------------------------------------------|
| **feat**     | A new feature                                                                                                              |
| **fix**      | A bug fix                                                                                                                  |
| **perf**     | A code change that improves performance                                                                                    |
| **refactor** | A code change that neither fixes a bug nor adds a feature                                                                  |
| **test**     | Adding missing tests or correcting existing tests                                                                          |
| **build**    | Changes that affect the build system or external dependencies (example: Update npm packages)                               |
| **chore**    | Other maintenance tasks that don’t affect the build system or app code (example: update .gitignore, add editorconfig file) |
| **ci**       | Changes to our CI configuration files and scripts (example: Github Actions)                                                |
| **docs**     | Documentation only changes                                                                                                 |

#### Summary

Use the summary field to provide a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end


### <a name="commit-body"></a>Commit Message Body

Just as in the summary, use the imperative, present tense: "fix" not "fixed" nor "fixes".

Explain the motivation for the change in the commit message body. This commit message should explain **why** you are making the change.
You can include a comparison of the previous behavior with the new behavior to illustrate the impact of the change.


### <a name="commit-footer"></a>Commit Message Footer

The footer can contain information about breaking changes and deprecations and is also the place to reference GitHub issues and other PRs that this commit closes or is related to.
For example:

```
BREAKING CHANGE: <breaking change summary>

<breaking change description + migration instructions>

Fixes #<issue number>
```

or

```
DEPRECATED: <what is deprecated>

<deprecation description + recommended update path>

Closes #<pr number>
```

Breaking Change section should start with the phrase `BREAKING CHANGE: ` followed by a *brief* summary of the breaking change, a blank line, and a detailed description of the breaking change that also includes migration instructions.

Similarly, a Deprecation section should start with `DEPRECATED: ` followed by a short description of what is deprecated, a blank line, and a detailed description of the deprecation that also mentions the recommended update path.

### Revert commits

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit.

The content of the commit message body should contain:

- information about the SHA of the commit being reverted in the following format: `This reverts commit <SHA>`,
- a clear description of the reason for reverting the commit message.

### Pull Requests

PRs to our libraries are always welcome and can be a quick way to get your fix or improvement slated for the next release. 
In general, PRs should:

- Only fix/add the functionality in question **OR** address wide-spread whitespace/style issues, not both.
- Add unit or integration tests for fixed or changed functionality (if a test suite already exists).
- Address a single concern in the least number of changed lines as possible.
- Be accompanied by a complete Pull Request template (loaded automatically when a PR is created).

For changes that address core functionality or would require breaking changes (e.g. a major release), 
it's best to open an Issue to discuss your proposal first. 
This is not required but can save time creating and reviewing changes.

In general, we follow the ["fork-and-pull" Git workflow](https://github.com/susam/gitpr).

1. Fork the repository to your own Github account.
2. Clone the project to your machine.
3. Create a branch locally with a succinct but descriptive name.
4. Commit changes to the branch.
5. Following any formatting and testing guidelines specific to this repo.
6. Push changes to your fork.
7. Open a PR in our repository and follow the PR template so that we can efficiently review the changes.
