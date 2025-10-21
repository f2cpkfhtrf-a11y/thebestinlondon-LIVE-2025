# Install GitHub CLI - Quick Guide

## ✅ Easiest Method: Download Installer

### Step 1: Download
1. **Visit:** https://github.com/cli/cli/releases/latest
2. **Download:** Click on `gh_*_macOS_arm64.pkg` (for Apple Silicon)
   - If you have Intel Mac, download `gh_*_macOS_amd64.pkg`
3. The file will download to your Downloads folder

### Step 2: Install
1. **Open:** Double-click the `.pkg` file you downloaded
2. **Follow installer:** Click through the installation wizard
3. **Restart Terminal:** Close and reopen your terminal

### Step 3: Verify
```bash
gh --version
```

### Step 4: Authenticate
```bash
gh auth login
```
- Choose: "GitHub.com"
- Choose: "Login with a web browser"
- Follow the prompts in your browser

---

## Alternative: Command Line Install

If you prefer command line, run this in your terminal:

```bash
# Get latest version
VERSION=$(curl -s https://api.github.com/repos/cli/cli/releases/latest | grep '"tag_name"' | cut -d '"' -f 4 | sed 's/v//')

# Download (Apple Silicon)
curl -L https://github.com/cli/cli/releases/download/v${VERSION}/gh_${VERSION}_macOS_arm64.tar.gz -o /tmp/gh.tar.gz

# Extract
cd /tmp && tar -xzf gh.tar.gz

# Install to your home directory
mkdir -p ~/bin
cp gh_${VERSION}_macOS_arm64/bin/gh ~/bin/gh
chmod +x ~/bin/gh

# Add to PATH (add to ~/.zshrc)
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verify
gh --version
```

---

## After Installation

### Authenticate:
```bash
gh auth login
```

### Test it works:
```bash
gh repo view
gh auth status
```

---

## Need Help?

If installation fails, you can always:
1. Use the manual download method (Step 1 above)
2. Or install Homebrew first, then: `brew install gh`

