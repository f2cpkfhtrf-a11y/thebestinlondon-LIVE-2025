# GitHub CLI Authentication Setup

This guide explains how to authenticate with GitHub CLI (`gh`) to enable full repository auditing capabilities.

## What You Need

### 1. GitHub CLI Installation

**Check if installed:**
```bash
gh --version
```

**Install on macOS:**
```bash
brew install gh
```

**Install on Linux:**
```bash
# Debian/Ubuntu
sudo apt-get update && sudo apt-get install gh

# Fedora
sudo dnf install gh

# Or via snap
sudo snap install gh
```

**Install on Windows:**
```bash
# Via Chocolatey
choco install gh

# Via Scoop
scoop bucket add github-gh https://github.com/cli/scoop-gh.git
scoop install gh
```

Or download from: https://github.com/cli/cli/releases

---

## 2. Authentication Methods

### Option A: Interactive Login (Recommended)

This is the easiest method:

```bash
gh auth login
```

**What happens:**
1. CLI will ask you to choose:
   - **GitHub.com** (for public/private repos)
   - **GitHub Enterprise Server** (for enterprise)
2. Choose authentication method:
   - **Login with a web browser** (recommended)
   - **Paste an authentication token** (if you have one)
3. If using browser:
   - You'll get a code to paste
   - Browser opens to GitHub
   - Authorize the CLI
   - Done!

**Permissions requested:**
- `repo` - Full control of private repositories
- `read:org` - Read org and team membership (if applicable)
- `workflow` - Update GitHub Action workflows

### Option B: Token-Based Authentication

If you prefer using a personal access token:

1. **Create a GitHub Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name: "GitHub CLI Audit"
   - Select scopes:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `read:org` (Read org membership)
     - ✅ `workflow` (Update GitHub Action workflows)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

2. **Login with token:**
   ```bash
   gh auth login --with-token < token.txt
   # Or paste directly:
   echo "YOUR_TOKEN_HERE" | gh auth login --with-token
   ```

### Option C: Environment Variable (for CI/CD)

For automated scripts:
```bash
export GH_TOKEN="your_personal_access_token_here"
```

---

## 3. Verify Authentication

```bash
# Check auth status
gh auth status

# Test with a simple command
gh repo view

# List your repositories
gh repo list
```

**Expected output:**
```
✓ Logged in to github.com as YOUR_USERNAME
✓ Git operations for github.com configured to use https
✓ Token: gho_********************
```

---

## 4. What This Enables

Once authenticated, you can:

✅ **View Pull Requests:**
```bash
gh pr list
gh pr view <number>
gh pr list --state all --limit 50
```

✅ **Check Workflow Runs:**
```bash
gh run list
gh run view <run-id>
gh workflow list
```

✅ **View Branch Protection:**
```bash
gh api repos/:owner/:repo/branches/main/protection
```

✅ **Complete Repository Audit:**
```bash
# Re-run the audit script after authentication
node scripts/github-audit.mjs
```

---

## 5. Common Issues

### Issue: "gh: command not found"
**Solution:** Install GitHub CLI (see Step 1)

### Issue: "authentication failed"
**Solution:** 
- Try `gh auth login` again
- Check if 2FA is enabled (use token method)
- Verify token has correct scopes

### Issue: "repository not found"
**Solution:**
- Verify you have access to the repository
- Check if repo is private and you're authenticated
- Verify repository name/path is correct

### Issue: "rate limit exceeded"
**Solution:**
- GitHub API has rate limits
- Authenticated users get 5,000 requests/hour
- Wait for rate limit to reset
- Check with: `gh api rate_limit`

---

## 6. Security Best Practices

✅ **Use Personal Access Tokens** for automation (not passwords)
✅ **Store tokens securely** (use password manager or encrypted storage)
✅ **Rotate tokens regularly** (every 90 days recommended)
✅ **Use minimum required scopes** (don't grant unnecessary permissions)
✅ **Don't commit tokens** to git repositories

---

## 7. After Authentication

Once authenticated, you can:

1. **Re-run the GitHub audit** to get complete PR/workflow data
2. **Use GitHub CLI commands** for repository management
3. **Access private repository data** via API

**Re-run audit:**
```bash
# The audit script will now have full access
node scripts/github-audit.mjs
```

---

## Quick Reference

```bash
# Login
gh auth login

# Check status
gh auth status

# Refresh token
gh auth refresh

# Logout
gh auth logout

# Switch accounts
gh auth switch

# View token
gh auth token
```

---

**For more information:**
- GitHub CLI Docs: https://cli.github.com/manual/
- Authentication Guide: https://cli.github.com/manual/gh_auth_login

