# 🔐 GitHub身份验证指南

## 问题说明
推送代码时遇到403权限错误，需要配置GitHub身份验证。

## 解决方案

### 方案1：Personal Access Token（推荐）

#### 步骤1：创建Personal Access Token
1. 登录GitHub，点击右上角头像
2. 选择 "Settings"
3. 在左侧菜单最底部找到 "Developer settings"（如果没有看到，请向下滚动）
4. 点击 "Personal access tokens" → "Tokens (classic)"
5. 点击 "Generate new token" → "Generate new token (classic)"

**如果找不到"Developer settings"，请尝试：**
- 直接访问：https://github.com/settings/tokens
- 或者在Settings页面向下滚动到最底部
- 确保你已经完全登录GitHub
6. 填写信息：
   - Note: `aigrantwriter.xyz deployment`
   - Expiration: `90 days` 或 `No expiration`
   - 勾选权限：
     - ✅ `repo` (完整仓库访问权限)
     - ✅ `workflow` (GitHub Actions权限)
7. 点击 "Generate token"
8. **重要：立即复制token，离开页面后无法再次查看**

#### 步骤2：使用Token推送代码
```bash
# 方法1：在推送时输入用户名和token
git push -u origin main
# 用户名：YUHONGDIM1983
# 密码：粘贴你的Personal Access Token

# 方法2：在URL中包含token
git remote set-url origin https://YUHONGDIM1983:YOUR_TOKEN@github.com/YUHONGDIM1983/aigrantwriter.xyz.git
git push -u origin main
```

### 方案2：SSH密钥（更安全）

#### 步骤1：生成SSH密钥
```bash
ssh-keygen -t ed25519 -C "admin@aigrantwriter.xyz"
# 按Enter使用默认文件位置
# 可以设置密码或直接按Enter
```

#### 步骤2：添加SSH密钥到GitHub
```bash
# 复制公钥内容
cat ~/.ssh/id_ed25519.pub
```
1. 复制输出的公钥内容
2. 在GitHub Settings → SSH and GPG keys
3. 点击 "New SSH key"
4. 粘贴公钥内容并保存

#### 步骤3：使用SSH推送
```bash
git remote set-url origin git@github.com:YUHONGDIM1983/aigrantwriter.xyz.git
git push -u origin main
```

### 方案3：GitHub CLI（最简单）

#### 安装GitHub CLI
```bash
# Windows (使用winget)
winget install --id GitHub.cli

# 或下载安装包
# https://github.com/cli/cli/releases
```

#### 认证并推送
```bash
gh auth login
# 选择 GitHub.com
# 选择 HTTPS
# 选择 Login with a web browser
# 按提示完成认证

git push -u origin main
```

## 🚀 推送成功后的下一步

### 1. 验证推送
访问：https://github.com/YUHONGDIM1983/aigrantwriter.xyz

### 2. 设置自动部署

#### Netlify部署
1. 访问 [Netlify.com](https://netlify.com)
2. 点击 "New site from Git"
3. 选择 "GitHub"
4. 选择 `aigrantwriter.xyz` 仓库
5. 部署设置：
   - Build command: 留空
   - Publish directory: `/`
6. 点击 "Deploy site"

#### GitHub Pages部署
1. 在GitHub仓库中，进入 "Settings"
2. 滚动到 "Pages" 部分
3. Source选择 "Deploy from a branch"
4. Branch选择 "main"
5. Folder选择 "/ (root)"
6. 点击 "Save"

### 3. 配置自定义域名
- 在部署平台中添加 `aigrantwriter.xyz`
- 配置DNS记录指向部署平台

## 📞 需要帮助？
如果遇到问题，可以：
1. 检查token权限设置
2. 确认仓库访问权限
3. 验证网络连接
4. 查看GitHub状态页面

---
🎉 **完成身份验证后，你的网站就可以成功部署了！**