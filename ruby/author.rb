require 'sequel'
require 'json'
require 'logger'

logger = Logger.new($stdout)
logger.level = Logger::DEBUG
db = Sequel.connect('postgres://localhost/testing');
db.logger = logger

class Sequel::Model
  self.plugin :json_serializer
  self.plugin :association_pks
#  self.plugin :nested_attributes
end

class Author < Sequel::Model(:author)
  many_to_many :book, left_key: :author_id, right_key: :book_id, :join_table => :author_book
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
#  unrestrict_primary_key
  many_to_many :author, left_key: :book_id, right_key: :author_id, :join_table => :author_book
#  nested_attributes :author
end

author = Author.new(:name => "blah")
author.save
author.book_pks = [1, 2]
