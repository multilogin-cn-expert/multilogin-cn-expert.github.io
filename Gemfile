source "https://rubygems.org"

# GitHub Pages dependency
gem "github-pages", "~> 229", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jemoji", "~> 0.12"
  gem "jekyll-mentions", "~> 1.6"
  gem "jekyll-redirect-from", "~> 0.16"
  gem "jekyll-relative-links", "~> 0.6"
  gem "jekyll-titles-from-headings", "~> 0.5"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
platforms :mingw, :mswin, :x64_mingw, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :mswin, :x64_mingw, :jruby]

# Lock `http_parser.rb` to `v0.6.x` on JRuby builds, because newer versions of this gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
