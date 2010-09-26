# Rakefile for HousePriceStalker

require 'rubygems'
require 'open-uri'
require 'nokogiri'
require 'yaml'

ROOT_DIR = File.expand_path(File.dirname(__FILE__)).freeze
CONFIG = YAML.load(File.read("#{ROOT_DIR}/config/config.yml")).freeze

log = File.new("log/rake.log", "a+")
STDOUT.reopen(log)
STDERR.reopen(log)

task :default => [ :scrape ]

desc "Scrape website and record house value"
task :scrape do 
  require 'lib/price'
  
  doc = Nokogiri::HTML(open(CONFIG['scrape_url']))
  est_value = doc.at_css(CONFIG['css_selector']).text.gsub(/[^\d]/,'')
  puts "Scraped #{est_value} at #{Date.today}" # Want to log this, since scraping is unreliable and records are good
  price = Price.new
  price.price = est_value
  price.save # TODO: make this robust
  
end