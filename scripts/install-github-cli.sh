#!/bin/bash
# GitHub CLI Installation Script for macOS

set -e

echo "🔧 Installing GitHub CLI (gh)..."

# Detect architecture
ARCH=$(uname -m)
if [ "$ARCH" = "x86_64" ]; then
    ARCH="amd64"
elif [ "$ARCH" = "arm64" ] || [ "$ARCH" = "aarch64" ]; then
    ARCH="arm64"
fi

# Set version (update this to latest)
VERSION="2.49.0"

echo "📦 Architecture: $ARCH"
echo "📦 Version: $VERSION"

# Create temp directory
TMPDIR=$(mktemp -d)
cd "$TMPDIR"

echo "⬇️  Downloading GitHub CLI..."

# Download the appropriate version
if [ "$ARCH" = "arm64" ]; then
    URL="https://github.com/cli/cli/releases/download/v${VERSION}/gh_${VERSION}_macOS_arm64.tar.gz"
else
    URL="https://github.com/cli/cli/releases/download/v${VERSION}/gh_${VERSION}_macOS_amd64.tar.gz"
fi

# Download
if command -v curl &> /dev/null; then
    curl -L -o gh.tar.gz "$URL"
elif command -v wget &> /dev/null; then
    wget -O gh.tar.gz "$URL"
else
    echo "❌ Error: Need curl or wget to download"
    exit 1
fi

# Extract
echo "📂 Extracting..."
tar -xzf gh.tar.gz

# Install
echo "📥 Installing to /usr/local/bin..."
sudo cp gh_${VERSION}_macOS_${ARCH}/bin/gh /usr/local/bin/gh || {
    echo "⚠️  Could not install to /usr/local/bin, trying ~/bin..."
    mkdir -p ~/bin
    cp gh_${VERSION}_macOS_${ARCH}/bin/gh ~/bin/gh
    echo "✅ Installed to ~/bin/gh"
    echo "📝 Add to PATH: export PATH=\"\$HOME/bin:\$PATH\""
}

# Cleanup
cd -
rm -rf "$TMPDIR"

# Verify
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI installed successfully!"
    gh --version
    echo ""
    echo "🔐 Next step: Run authentication:"
    echo "   gh auth login"
else
    echo "⚠️  Installation complete but 'gh' not in PATH"
    echo "   Try adding ~/bin to your PATH or restart terminal"
fi

