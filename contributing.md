# Project Personnel

PantryNode was started by [Subhed Chavan](https://github.com/subhed), [Jayesh Sathe](https://github.com/Jayesh-sathe),
and [Gopal Singh](https://github.com/gopalsingh112) in the Spring of 2020 under the supervision of
[Dr. Kevin Buffardi](https://github.com/kbuffardi).

It was then picked up by a class of about 40 during the Spring of 2023 which included the following students
(alphabetically listed):
* [James Krepelka](https://github.com/Jooms)

It is a [Free and Open Source Software project](LICENSE).

# Contributing

As an open source project, we welcome all contributors. Contributors shall abide by the policies described in the [Code of Conduct](Code_of_Conduct.md) and adopt the following protocol for contributing:

* Log issues and engage in constructive discussion within the [issue tracker](/Issues)
* To volunteer to work on an issue (either independently or in collaboration), assign yourself to the issue and follow the steps:

    1. Create a feature branch with a concise 1-3 word name that adopts `snake_case` formatting and is descriptive enough to make its purpose clear without reviewing its source.
    2. Commit discrete steps in resolving the issue with concise but descriptive commit messages. Any commit that completes resolving an issue should use [GitHub keywords for automating closing the issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) (e.g. "Adds main menu, **closes #1**). If anyone made meaningful contributions to the work (such as participating in pair programming), credit them with a mention in the commit message (e.g. "Correct segfault error; @username contributed") and they should be added as an "Assigned to" contributor if they are not already.
    3. Push your changes to your feature branch and create a Pull Request. If your Pull Requests does not pass automated checks and/or contains unresolved conflicts, the person who submitted the PR is expected to address the problems before the PR will be reviewed.
    4. Any large text files, images, or other big files need to be tracked using git LFS. Setup instruction can be found [here](https://docs.github.com/en/repositories/working-with-files/managing-large-files/configuring-git-large-file-storage).
    5. All PR containing procedural code should also include associated and thorough [Jest unit tests](https://jestjs.io/) that document and test the expected behavior. All new tests (both existing regression tests and new tests) should run and pass on the feature branch. Branch coverage should be 100\%. If there is a compelling reason why that threshold cannot be reached, a detailed explanation should be provided along with the PR description.
    6. A minimum of two other team members will review the Pull Request and provide discussion and/or constructive feedback. Engage in communication within the Issue comments.
    7. If at least two other team members have reviewed and approved the Pull Request, it will be merged into the `main` branch using **Rebase and Merge**, unless the commits are too granular (according to the concensus of the reviewers) in which case **Squash and Merge** will summarize the commits into a single commit.
    8. Once the Pull Request has been accepted and merged, the feature branch should be deleted from the repository