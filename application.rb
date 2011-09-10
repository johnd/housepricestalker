require 'lib/price'

get '/prices.json' do
  Price.prices.to_json
end

get '/target.json' do # TODO: find a less ugly way of doing this
  target = CONFIG['target']
  data = []
  Price.prices.each do | thing |
    data << [ thing[0], target]
  end
  
  data.to_json
  
end

get '/' do
  redirect '/index.html'
end