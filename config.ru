require 'rubygems'
require 'sinatra'

ROOT_DIR = File.expand_path(File.dirname(__FILE__)).freeze
CONFIG = YAML.load(File.read("#{ROOT_DIR}/config/config.yml")).freeze


Sinatra::Application.set(
:run         => false,
:environment => :development
)

log = File.new("log/sinatra.log", "a+")
STDOUT.reopen(log)
STDERR.reopen(log)

require 'application.rb'
run Sinatra::Application
