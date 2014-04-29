require 'sequel'
require 'json'

db = Sequel.connect('postgres://localhost/testing');

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

author = Author.new
author.get_author