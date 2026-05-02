# 🚀 Website Deployment Guide

## Option 1: GitHub Pages (Recommended - Free)

### Prerequisites
- GitHub account
- Git installed on your computer
- Repository created: `multilogin-cn-expert.github.io`

### Step 1: Initialize Git Repository
```bash
cd d:\WebGitHub\multilogin-cn-expert.github.io
git init
git add .
git commit -m "Initial commit: SEO-optimized Multilogin website"
```

### Step 2: Add Remote Repository
```bash
git remote add origin https://github.com/YOUR_USERNAME/multilogin-cn-expert.github.io.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to GitHub repository settings
2. Scroll to "GitHub Pages" section
3. Select "Deploy from a branch"
4. Choose branch: `main`
5. Root folder: `/ (root)`
6. Click "Save"

### Step 4: Configure Custom Domain (Optional)
1. Create `CNAME` file in root with your domain:
```
multilogin-cn-expert.com
```
2. In GitHub repository settings, add the domain
3. Update DNS records at your domain registrar:
```
A record:    185.199.108.153
A record:    185.199.109.153
A record:    185.199.110.153
A record:    185.199.111.153
CNAME:       yourname.github.io (for www)
```

### Step 5: Enable HTTPS
- GitHub Pages automatically provides HTTPS
- Wait 24 hours for certificate validation
- Check "Enforce HTTPS" in repository settings

### Deployment Complete!
Your site is now live at: `https://multilogin-cn-expert.github.io`

---

## Option 2: Netlify (Free CDN + Advanced Features)

### Prerequisites
- Netlify account (free)
- GitHub repository

### Step 1: Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect GitHub account
4. Select repository: `multilogin-cn-expert.github.io`

### Step 2: Configure Build Settings
- **Build command**: (Leave empty for static site)
- **Publish directory**: `.` (root)
- **Base directory**: `/`

### Step 3: Deploy
1. Netlify automatically deploys from `main` branch
2. Wait for build to complete (usually < 1 minute)
3. Access site at assigned Netlify URL

### Step 4: Custom Domain (Optional)
1. In Netlify site settings, go to "Domain management"
2. Add custom domain
3. Update DNS records as shown by Netlify

### Features
- ✅ Automatic HTTPS
- ✅ CDN worldwide
- ✅ Automatic redeploy on push
- ✅ Form submissions
- ✅ Analytics

---

## Option 3: Vercel (Free)

### Prerequisites
- Vercel account (free)
- GitHub repository

### Step 1: Import Project
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import GitHub repository
4. Select: `multilogin-cn-expert.github.io`

### Step 2: Configure
- **Framework**: "Other" (static site)
- **Build command**: (Leave empty)
- **Output directory**: `.`

### Step 3: Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Site is live at Vercel URL

### Custom Domain
1. In project settings, go to "Domains"
2. Add domain and follow DNS instructions

---

## Option 4: Self-Hosted VPS/Shared Hosting

### Using Apache Web Server

#### Prerequisites
- Web hosting with Apache
- FTP/SSH access
- SSH enabled (for .htaccess support)

#### Step 1: Upload Files
```bash
# Using SFTP/FTP
ftp your-domain.com
put -r * /public_html/
```

#### Step 2: Configure Apache
1. Ensure `.htaccess` is uploaded
2. Enable mod_rewrite:
   ```bash
   sudo a2enmod rewrite
   sudo a2enmod deflate
   sudo a2enmod expires
   sudo systemctl restart apache2
   ```

3. Update virtual host configuration:
   ```apache
   <VirtualHost *:80>
       ServerName your-domain.com
       ServerAlias www.your-domain.com
       DocumentRoot /var/www/your-domain
       
       <Directory /var/www/your-domain>
           AllowOverride All
           Require all granted
       </Directory>
       
       # Redirect HTTP to HTTPS
       RewriteEngine On
       RewriteCond %{HTTPS} off
       RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   </VirtualHost>
   ```

#### Step 3: Enable HTTPS
```bash
# Using Let's Encrypt (free)
sudo apt-get install certbot python3-certbot-apache
sudo certbot --apache -d your-domain.com -d www.your-domain.com
```

#### Step 4: Verify
- Visit `https://your-domain.com`
- Check SSL certificate is valid

### Using Nginx Web Server

#### Step 1: Upload Files via SFTP
```bash
sftp user@your-server.com
put -r * /var/www/your-domain/
```

#### Step 2: Configure Nginx
Create `/etc/nginx/sites-available/your-domain`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/your-domain;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    
    # Browser caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    root /var/www/your-domain;
    
    # SSL certificates (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    
    # Cache
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 30d;
    }
    
    # Prevent access to hidden files
    location ~ /\. {
        deny all;
    }
    
    index index.html;
    error_page 404 /404.html;
}
```

#### Step 3: Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/your-domain /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 4: SSL Certificate
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## Post-Deployment Checklist

### Immediately After Deployment

- [ ] **Verify Site Loads**
  ```bash
  curl https://your-domain.com
  ```

- [ ] **Check HTTPS**
  - Verify SSL certificate is valid
  - No "insecure" warnings

- [ ] **Test Responsiveness**
  - Open on mobile (iPhone + Android)
  - Test on tablet
  - Check desktop

- [ ] **Test All Links**
  - Click every navigation link
  - Verify internal links work
  - Test external affiliate links

- [ ] **Test Forms**
  - Fill out contact form
  - Verify submission works
  - Test discount code copy button

- [ ] **Test Navigation**
  - Smooth scrolling works
  - Breadcrumbs appear
  - Footer links work

### SEO Verification

- [ ] **Google Search Console**
  ```
  1. Go to search.google.com/search-console
  2. Add property
  3. Verify domain ownership
  4. Submit sitemap.xml
  5. Monitor crawl errors
  ```

- [ ] **Bing Webmaster Tools**
  ```
  1. Go to bing.com/webmasters
  2. Add site
  3. Submit sitemap.xml
  ```

- [ ] **Schema Markup Test**
  ```
  Go to: https://schema.org/validator
  Paste your homepage URL
  Verify all schema types are detected
  ```

- [ ] **Page Speed Test**
  ```
  Go to: https://pagespeed.web.dev/
  Test both mobile and desktop
  Address any critical issues
  ```

- [ ] **Rich Snippet Preview**
  ```
  Go to: https://metatags.io/
  Enter your URL
  Preview how it appears on social media
  ```

### Analytics Setup

- [ ] **Add Google Analytics**
  1. Create GA4 property
  2. Add tracking code to `<head>`
  3. Wait 24 hours for data
  4. Verify pageviews are recorded

- [ ] **Enable Conversion Tracking**
  1. Setup goals for affiliate clicks
  2. Track form submissions
  3. Monitor discount code usage

---

## Continuous Deployment

### Auto-Deploy on Git Push

**GitHub Pages**: Automatic (just push to main branch)

**Netlify**: Automatic (connected to repository)

**Vercel**: Automatic (connected to repository)

### Manual Update Workflow
```bash
# 1. Make changes locally
# Edit files in editor

# 2. Commit changes
git add .
git commit -m "Update: description of changes"

# 3. Push to GitHub
git push origin main

# 4. Site auto-deploys (wait 1-2 minutes)

# 5. Verify deployment
# Visit https://your-domain.com
```

---

## Rollback Procedure

If something goes wrong:

```bash
# 1. View commit history
git log --oneline

# 2. Revert to previous commit
git revert <commit-hash>
git push origin main

# 3. Or reset to previous commit (careful!)
git reset --hard <commit-hash>
git push -f origin main

# 4. Site will redeploy with previous version
```

---

## Monitoring & Maintenance

### Daily
- Check site loads without errors
- Monitor uptime (use free service like UptimeRobot)

### Weekly
- Monitor Google Search Console
- Check analytics for unusual traffic
- Review server logs (if self-hosted)

### Monthly
- Full SEO audit
- Check all links
- Review analytics
- Update content if needed

---

## Troubleshooting

### Site Not Loading
```bash
# Check Git status
git status

# Check remote
git remote -v

# Verify files uploaded
ls -la
```

### SSL Certificate Issues
- **GitHub Pages**: Automatic, no action needed
- **Netlify**: Automatic, no action needed
- **Self-hosted**: Renew using Let's Encrypt
  ```bash
  sudo certbot renew
  ```

### 404 Errors
- Verify `.htaccess` is uploaded (Apache)
- Check `_config.yml` (Jekyll)
- Verify file names don't have .html extensions

### Slow Loading
- Optimize images
- Enable Gzip compression
- Use CDN
- Minify CSS/JavaScript

---

## Support Resources

- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Netlify Docs**: https://docs.netlify.com
- **Vercel Docs**: https://vercel.com/docs
- **Let's Encrypt**: https://letsencrypt.org/

---

**Last Updated**: May 2, 2026
**Recommended**: GitHub Pages (easiest) or Netlify (best features)
