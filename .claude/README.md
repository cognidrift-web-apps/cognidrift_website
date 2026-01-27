# Claude Code Plugins Setup

This project is configured to use Claude Code plugins for enhanced development workflows.

## Installed Plugins

### 1. **code-review** - Automated PR Code Review
- Command: `/code-review`
- Uses 5 specialized agents for comprehensive PR analysis
- Checks CLAUDE.md compliance, detects bugs, analyzes context

### 2. **commit-commands** - Git Workflow Automation
- Commands: 
  - `/commit` - Stage and commit changes
  - `/commit-push-pr` - Commit, push, and create PR
  - `/clean_gone` - Clean up deleted remote branches

### 3. **feature-dev** - Feature Development Workflow
- Command: `/feature-dev`
- Structured 7-phase approach for building features
- Includes code-explorer, code-architect, and code-reviewer agents

### 4. **frontend-design** - Production-Grade UI Design
- Auto-invoked for frontend work
- Provides guidance on bold design, typography, and animations
- Helps avoid generic AI aesthetics

### 5. **security-guidance** - Security Warnings
- Monitors for security issues in code edits
- Checks for XSS, command injection, eval usage, etc.

## Usage

### Start Claude Code
```bash
claude
```

### Install Additional Plugins
```bash
# Use the /plugin command in Claude Code session
/plugin install <plugin-name>
```

### Available Commands
Once in a Claude Code session, type `/` to see all available commands from your plugins.

## Plugin Configuration

Edit [.claude/settings.json](.claude/settings.json) to:
- Enable/disable plugins
- Change model settings
- Adjust output style

## Learn More
- [Claude Code Plugins Documentation](https://docs.claude.com/en/docs/claude-code/plugins)
- [Plugin Repository](https://github.com/anthropics/claude-code/tree/main/plugins)
