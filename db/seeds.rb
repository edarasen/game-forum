# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
def rawgdata_seed
  puts "Fetching data from rawg.api..."

  game_slugs = ["strange-horticulture", "witchy-life-story", "potion-craft-alchemist-simulator"]
  begin
    game_slugs.each do |game|
      response = HTTParty.get("https://api.rawg.io/api/games/#{game}?key=#{ENV['RAWG_API_KEY']}")
      if response.success?
        name_original = response['name_original']
        background_image = response['background_image']
        website = response['website']
        
        # Convert response['developers'] into string object
        developer_array = response['developers']
        developer = []
        developer_array.each do |dev|
          developer << dev['name']
        end
        developer_string = developer.join(', ')

        # Convert response['genres'] into string object
        genres_array = response['genres']
        genres = []
        genres_array.each do |genre|
          genres << genre['name']
        end
        genres_string = genres.join(', ')

        Rawgdatum.create(name_original: name_original, background_image: background_image, website: website, developer: developer_string, genres: genres_string, game_slug: game)
      else
        puts "Rawg Data Error : Unsuccessful fetch // Rolling back database"
        raise ActiveRecord::Rollback
      end
      sleep (1.1)
    end
  rescue => e
    puts "Rawg Data Error : #{e.message} // Rolling back database"
    raise ActiveRecord::Rollback
  end
  
  puts "Finished seeding data from rawg.api"
end
def itchdata_seed
  puts "Fetching data from itch.io..."

  begin
      response = HTTParty.get("https://itch.io/api/1/#{ENV['ITCH_API_KEY']}/my-games")
      if response.success?
        # Returns an array, must get element 0
        pluck_brew = response['games'].filter {|game| game['title'] == 'Pluck & Brew v0.2'}
        views_count = pluck_brew[0]['views_count']
        downloads_count = pluck_brew[0]['downloads_count']
        
        Itchdatum.create(views_count: views_count, downloads_count: downloads_count)
      else
        puts "Itch Data Error : Unsuccessful fetch // Rolling back database"
        raise ActiveRecord::Rollback
      end
  rescue => e
    puts "Itch Data Error : #{e.message} // Rolling back database"
    raise ActiveRecord::Rollback
  end
  puts "Finished seeding data from itch.io"
end

rawgdata_seed
itchdata_seed