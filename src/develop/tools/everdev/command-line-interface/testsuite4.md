---
sidebar_position: 5
---

# TestSuite4

TestSuite4 is a framework designed to simplify development and testing of TON Contracts. It contains lightweight blockchain emulator making it easy to develop contracts in a TDD-friendly style.

For more information, visit [TestSuite4's documentation](https://tonlabs.github.io/TestSuite4/).

:information_source: `Python 3.6 - 3.9` and `pip` required.

## Version

This command shows the currently installed and available TestSuite4 framework versions.

```
everdev ts4 version
```

## Install

This command installs (using `pip`) TestSuite4's latest or selected version and downloads them if needed.

```bash
everdev ts4 install # install latest version

everdev ts4 install 0.2.0 # install version 0.2.0
```

## Update

This command updates TestSuite4 to the latest version.

```
everdev ts4 update
```

## Create

This command creates a TestSuite4's template of the test (`TestName.py`).

```bash
everdev ts4 create TestName

everdev ts4 create TestName --folder tests # creates tests/TestName.py (folder must exist)
```

## Run

This command runs selected test (`TestName.py`).

```
everdev ts4 run TestName
```

>  The documentation in Everscale repository is a community effort. Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development.
Please be informed that our documentation can be [edited via GitHub](https://github.com/everscale-org/docs/issues).  
  Also please make sure to consult our rules and rewards policy via [this link](https://docs.everscale.network/contribute/hot-streams/documentations).  
  Feel free to join [Everscale Documentation Development Telegram chat](https://t.me/+C2IpQXWZtCwxYzEy) and [Everscale Developers Onboarding Telegram chat](https://t.me/+Vca1Gs6uPzIyNWVi)!