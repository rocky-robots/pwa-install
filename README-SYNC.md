Keeping Your Fork Synchronized with Upstream
Great question! Here's how to keep your fork updated with changes from the original repository:

One-Time Setup: Add Upstream Remote


# Navigate to your cloned fork
cd pwa-install

# Add the original repository as "upstream"
git remote add upstream https://github.com/khmyznikov/pwa-install.git

# Verify your remotes
git remote -v

You should see:

origin → your fork (rocky-robots/pwa-install)
upstream → original repo (khmyznikov/pwa-install)


Regular Workflow: Sync Changes
# Fetch latest changes from upstream
git fetch upstream

# Switch to your main branch
git checkout main

# Merge upstream changes into your main
git merge upstream/main

# Push updated main to your fork
git push origin main


Handling Conflicts
If your changes conflict with upstream updates, Git will ask you to resolve them manually. You'll need to:

Edit the conflicting files
Mark them as resolved: git add <file>
Continue: git rebase --continue or git commit
This workflow keeps your fork up-to-date while preserving your custom changes!
