require 'dm-core'
require 'dm-validations'
require 'dm-timestamps'
require 'dm-serializer'
require 'dm-migrations'

DataMapper.setup(:default, "sqlite3://#{ROOT_DIR}/db/housepricestalker.sqlite3")

# SQLite makes sense given the low use of this application. It needs to scale to one user.
# And if it ever did, it's no huge trauma to move the data to MySQL or something.

class Price
  include DataMapper::Resource

  property :id,         Serial
  property :price,       Integer
  property :created_at, DateTime
  property :updated_at, DateTime
  
  def self.prices
    prices = []
    all(:order => [:created_at.asc]).each do | entry |
      prices << [ entry.created_at.to_time.to_i * 1000 , entry.price] # Timestamp * 1000 is to get a JavaScript timestamp for graphing
    end
    
    return prices
    
  end

end

DataMapper.auto_upgrade!