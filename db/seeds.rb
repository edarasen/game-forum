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

def test_data
  # Users
  puts "Seeding Users..."
  user_one = User.create(email: "user01_test@test.com", password: "password")
  user_two = User.create(email: "user02_test@test.com", password: "password")
  puts "Users seeded!"

  # Channel Groups
  puts "Seeding Channel groups..."
  welcome_cg = Channelgroup.create(title: "Welcome!", description: "New to the forum? Keep to date with announcements and rules here!")
  pnb_cg = Channelgroup.create(title: "Pluck & Brew", description: "Anything and everything related to Pluck & Brew!")
  support_cg = Channelgroup.create(title: "Support", description: "Bug reports, suggestions, and feedback!")
  puts "Channel groups seeded!"

  # Channels
  puts "Seeding Channels..."
  rules_c = Channel.create(title:"Rules & FAQ", description:"All new users should check this out!", channelgroup: welcome_cg)
  announcements_c = Channel.create(title:"Announcements", description:"Stay updated on the game's development progress", channelgroup: welcome_cg)
  game_discussion_c = Channel.create(title:"Game Discussion", description:"Talk about the game here!", channelgroup: pnb_cg)
  guides_c = Channel.create(title:"Guides", description:"Stuck? Find guides here!", channelgroup: pnb_cg)

  bug_reports_c = Channel.create(title:"Bug Reports", description:"Found a bug?", channelgroup: support_cg)
  game_suggestions_c = Channel.create(title:"Game Suggestions", description:"The devs check this regularly", channelgroup: support_cg)
  forum_feedback_c = Channel.create(title:"Forum Feedback", description:"Moderators check this regularly", channelgroup: support_cg)
  puts "Channels seeded!"
  
  # Posts
  puts "Seeding Posts..."
  game_post_test = Post.create(title:"The puzzles are hard!", body:"Is it just me? Am I just stupid? haha", channel:game_discussion_c, user: user_one)
  guide_post_test = Post.create(title:"Here's how I solve the brewing puzzles every time", body:"Just count the number of lines coming from each node and make sure they're in the same position as the one on the chalkboard", channel:guides_c, user: user_two)
  support_post_test = Post.create(title:"Please add an inventory view outside of selling or foraging", body:"Would be nice to see everything I'm missing before I travel to a sanctum", channel:game_suggestions_c, user: user_one)
  puts "Posts seeded!"

  # Comments
  puts "Seeding Comments..."
  game_comment_test = Comment.create(body:"You're not stupid. The puzzles take a while to get used to!", post: game_post_test, user: user_two)
  guide_comment_test = Comment.create(body:"Woah! I should try that!", post:guide_post_test, user:user_one)
  support_comment_test = Comment.create(body:"I would love that as well!", post:support_post_test, user: user_two)
  puts "Comments seeded!"
end

rawgdata_seed
itchdata_seed
test_data