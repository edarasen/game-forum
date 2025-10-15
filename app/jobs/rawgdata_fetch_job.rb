require 'redis'

class RawgdataFetchJob < ApplicationJob
  queue_as :default

  def perform(*args)
    redis = Redis.new(host: "localhost", port: 6379)

    game_slugs = ["strange-horticulture", "witchy-life-story", "potion-craft-alchemist-simulator"]

    puts "Starting rawg data update job..."
    Rawgdatum.find_each do |rawg_datum|
      begin
        datum = Rails.cache.fetch("rawg-datum-#{rawg_datum.id}", expires_in: 3.minutes) do
          puts "Cache missing : Fetching data from rawg api"
          response = HTTParty.get("https://api.rawg.io/api/games/#{rawg_datum.game_slug}?key=#{ENV['RAWG_API_KEY']}")
          if response.success?
            puts "Fetch successful"
          end
          response
        end
        
        name_original = datum['name_original']
        background_image = datum['background_image']
        website = datum['website']
        
        # Convert datum['developers'] into string object
        developer_array = datum['developers']
        developer = []
        developer_array.each do |dev|
          developer << dev['name']
        end
        developer_string = developer.join(', ')

        # Convert response['genres'] into string object
        genres_array = datum['genres']
        genres = []
        genres_array.each do |genre|
          genres << genre['name']
        end
        genres_string = genres.join(', ')

        rawg_datum.update!(
          name_original: name_original, 
          background_image: background_image, 
          website: website, 
          developer: developer_string, 
          genres: genres_string
        )
      rescue StandardError => e
        Rails.logger.error "Rawg API error for Datum ID: #{rawg_datum.id}: #{e.message}"
        next
      end
    end
    puts "Finished rawg data update job."
  end
end
