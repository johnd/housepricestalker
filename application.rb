require 'lib/price'

get '/prices.json' do
  Price.prices.to_json
end

get '/debt.json' do # TODO: find a less ugly way of doing this
  debt = CONFIG['debt']
  data = []
  Price.prices.each do | thing |
    data << [ thing[0], debt]
  end
  
  data.to_json
  
end

get '/' do
  redirect '/index.html'
end