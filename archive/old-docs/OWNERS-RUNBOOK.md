# 📋 OWNER'S RUNBOOK - The Best in London

*Last updated: October 15, 2025*

---

## 🔄 WEEKLY MAINTENANCE CHECKLIST

### Monday Morning (30 minutes)
- [ ] Check Google Search Console for new errors
- [ ] Review Analytics: top pages, bounce rates, new referrers
- [ ] Verify uptime (should be 99.9%+)
- [ ] Check automated backup status

### Wednesday (15 minutes)
- [ ] Scan for broken links using Broken Link Checker
- [ ] Review "Report an Issue" submissions
- [ ] Check FSA API quota usage

### Friday (20 minutes)
- [ ] Review new user comments/feedback
- [ ] Update 3-5 venue descriptions if needed
- [ ] Check competitor sites for new features
- [ ] Plan content updates for next week

---

## 🔍 MONTHLY DEEP CHECKS

### Data Quality (1st of month)
- [ ] Audit 20 random venues for accuracy
- [ ] Update closed/moved restaurants
- [ ] Refresh FSA hygiene ratings (batch API call)
- [ ] Verify Google Places data freshness

### SEO Health (10th of month)
- [ ] Run full Lighthouse audit (all core pages)
- [ ] Check indexation status in GSC
- [ ] Review top 20 keyword rankings
- [ ] Update meta descriptions for underperforming pages
- [ ] Add 2-3 new long-tail keyword pages

### Technical Maintenance (20th of month)
- [ ] Update dependencies (`npm audit fix`)
- [ ] Review and rotate API keys
- [ ] Test backup restoration process
- [ ] Check CDN cache hit rates
- [ ] Review server logs for errors

---

## 🚨 EMERGENCY PROCEDURES

### Site Down
1. Check Vercel status dashboard
2. Review recent deployments (rollback if needed)
3. Check DNS propagation
4. Contact: Vercel support or hosting provider
5. Post status update on social if >30min downtime

### Data Breach
1. Immediately rotate all API keys
2. Review access logs
3. Notify users if personal data compromised (GDPR)
4. Document incident
5. Update security measures

### SEO Penalty
1. Check GSC for manual actions
2. Review recent content changes
3. Check for toxic backlinks
4. Submit reconsideration request if needed
5. Consult SEO specialist

---

## 📊 KEY METRICS TO MONITOR

### Performance Targets
- **Page Load (LCP):** <2.5s
- **Cumulative Layout Shift (CLS):** <0.1
- **Time to Interactive (TTI):** <4s
- **First Contentful Paint (FCP):** <1.8s

### SEO Targets
- **Indexed Pages:** 100% of sitemap
- **Organic Traffic:** +15% MoM
- **Top 3 Rankings:** 20+ keywords
- **Domain Authority:** Improve quarterly

### User Engagement
- **Bounce Rate:** <55%
- **Avg Session Duration:** >2min
- **Pages per Session:** >2.5
- **Return Visitors:** >30%

---

## 🔧 COMMON FIXES

### "Venue not showing up"
1. Check if venue exists in `venues.json`
2. Verify filters aren't excluding it
3. Clear cache and rebuild
4. Check if venue is marked as closed

### "Images not loading"
1. Check Unsplash API quota
2. Verify image URLs in database
3. Check CDN status
4. Test fallback images

### "Search not working"
1. Check search index
2. Verify Algolia/search service connection
3. Review recent search queries in logs
4. Test with different browsers

### "Slow page load"
1. Run Lighthouse audit
2. Check image sizes (should be <500KB each)
3. Review third-party scripts
4. Check server response times
5. Enable/check caching

---

## 📈 GROWTH STRATEGIES

### Content Calendar
- **Weekly:** 1 new niche page (e.g., "Best Brunch in Chelsea")
- **Bi-weekly:** 1 area guide update
- **Monthly:** 1 major content piece (e.g., "Top 50 Romantic Restaurants")

### Link Building
- Partner with local food bloggers
- Get listed in London tourism directories
- Reach out to featured restaurants for backlinks
- Create shareable infographics

### Social Media
- Post 3x/week: new openings, top-rated venues, food guides
- Engage with London food community
- Run monthly giveaways
- Partner with influencers

---

## 🛠️ TECHNICAL STACK REFERENCE

### Hosting & Deployment
- **Platform:** Vercel
- **Domain:** thebestinlondon.co.uk
- **Deploy:** Automatic on `main` branch push
- **Staging:** `staging` branch

### APIs & Services
- **Google Places API:** Venue data
- **FSA API:** Hygiene ratings
- **TripAdvisor API:** Reviews
- **Google Analytics 4:** Analytics
- **Google Search Console:** SEO monitoring

### Database & Storage
- **Venue Data:** `public/venues.json`
- **Images:** CDN + Unsplash
- **Backups:** Daily automated to S3

---

## 📞 EMERGENCY CONTACTS

### Technical Support
- **Hosting:** Vercel Support (support@vercel.com)
- **Domain:** Registrar support
- **Developer:** [Your contact]

### Service Providers
- **Google API Support:** Google Cloud Console
- **FSA API:** ratings@food.gov.uk
- **CDN:** Support email

---

## 📝 CHANGE LOG

### October 2025
- ✅ Launched premium dark theme
- ✅ Added FSA badges and TripAdvisor reviews
- ✅ Created niche landing pages (Halal, Vegan)
- ✅ Implemented security headers
- ✅ Generated complete sitemaps

### Planned for November 2025
- [ ] Add user reviews system
- [ ] Implement reservation integration
- [ ] Launch mobile app
- [ ] Add restaurant owner dashboard

---

## 💡 OPTIMIZATION IDEAS

### Quick Wins (implement any time)
- Add "Recently Viewed" section
- Implement dark/light mode toggle
- Add print-friendly venue pages
- Create email digest of new restaurants
- Add map view for search results

### Medium-term Projects (1-3 months)
- User accounts and favorites
- Restaurant comparison tool
- Advanced filters (outdoor seating, live music, etc.)
- Editorial blog section
- Events calendar

### Long-term Vision (6+ months)
- AI-powered restaurant recommendations
- Integration with booking platforms
- Restaurant owner portal
- Mobile app
- Expand to other UK cities

---

**Remember:** This is a living document. Update it monthly with new learnings and procedures.

**Need help?** Email: hello@thebestinlondon.co.uk
