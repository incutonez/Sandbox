require 'sequel'
require 'json'
require 'logger'

logger = Logger.new($stdout)
logger.level = Logger::DEBUG
db = Sequel.connect('postgres://localhost/testing');
db.logger = logger

class Sequel::Model
  self.plugin :json_serializer
  self.plugin :nested_attributes
end

class Author < Sequel::Model(:author)
#  set_dataset DB[:author, :book].where(:author_id => :author_id)
  many_to_many :book, left_key: :author_id, right_key: :book_id, :join_table => :author_book
  nested_attributes :book

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
  unrestrict_primary_key
  many_to_many :author, left_key: :book_id, right_key: :author_id, :join_table => :author_book
  nested_attributes :author
end

#class AuthorBookTable < Sequel::Model
#  set_primary_key [:author__id, :book__id]
#  set_dataset db[:book, :author]
#end

#author = Author.new(:name => "blah", :book => [{:book_id => 1}, {:book_id => 2}])
author = Author.new(:name => "blah")
#author.save
#author.add_book(Book[1])
author.save

author.add_book(Book[1])
author.add_book(Book[2])
#author.get_author

#AuthorBookTable.where(:author__id => 1, :book__author_id => 1).each do |e|
#  puts JSON.pretty_generate(e.values)
#end
