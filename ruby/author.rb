require 'sequel'
require 'json'
require 'logger'

logger = Logger.new($stdout)
logger.level = Logger::DEBUG
db = Sequel.connect('postgres://localhost/testing');
db.logger = logger

class Sequel::Model
  self.plugin :json_serializer
#  self.plugin :nested_attributes
end

class Author < Sequel::Model(:author)
#  set_dataset DB[:author, :book].where(:author_id => :author_id)
  one_to_many :book, key: :author_id, primary_key: :id
#  nested_attributes :book

  def get_author
    Author.each do |e|
      books = Array.new
      e.book.each do |f|
        books.push(f.values)
      end
      e.values[:books] = books
      puts JSON.pretty_generate(e.values)
    end
  end
end

class Book < Sequel::Model(:book)
end

#class AuthorBookTable < Sequel::Model
#  set_primary_key [:author__id, :book__id]
#  set_dataset db[:book, :author]
#end

author = Author.new
author.get_author

#AuthorBookTable.where(:author__id => 1, :book__author_id => 1).each do |e|
#  puts JSON.pretty_generate(e.values)
#end
