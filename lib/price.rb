require 'dm-core'
require 'dm-validations'
require 'dm-timestamps'
require 'dm-serializer'

DataMapper.setup(:default, "sqlite3://#{ROOT_DIR}/db/housepricestalker.sqlite3")

class Price
  include DataMapper::Resource

  property :id,         Serial
  property :price,       Integer
  property :created_at, DateTime
  property :updated_at, DateTime
  
  def self.prices
    prices = []
    all(:order => [:created_at.asc]).each do | entry |
      prices << entry.price
    end
    
    return prices
    
  end


end

DataMapper.auto_upgrade!