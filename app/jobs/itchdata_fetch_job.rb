require "redis"

class ItchdataFetchJob < ApplicationJob
  queue_as :default

  def perform(*args)
    redis = Redis.new(host: "localhost", port: 6379)

    puts "Starting itch data update job..."
    Itchdatum.find_each do |itch_datum|
      begin
        datum = Rails.cache.fetch("itch-datum-#{itch_datum.id}", expires_in: 3.minutes) do
          puts "Cache missing : Fetching data from itch.io"
          response = HTTParty.get("https://itch.io/api/1/#{ENV['ITCH_API_KEY']}/my-games")
          if response.success?
            puts "Fetch successful"
          end
          puts "response body here"
          response
        end

        # Returns an array, must get element 0
        pluck_brew = datum["games"].filter { |game| game["title"] == "Pluck & Brew v0.2" }
        views_count = pluck_brew[0]["views_count"]
        downloads_count = pluck_brew[0]["downloads_count"]

        itch_datum.update!(
          views_count: views_count,
          downloads_count: downloads_count
        )
      rescue StandardError => e
        Rails.logger.error "Itch API error for Datum ID: #{itch_datum.id}: #{e.message}"
        next
      end
    end
    puts "Finished itch data update job."
  end
end
