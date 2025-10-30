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

  game_slugs = [ "strange-horticulture", "witchy-life-story", "potion-craft-alchemist-simulator" ]
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
        pluck_brew = response['games'].filter { |game| game['title'] == 'Pluck & Brew v0.2' }
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
  admin = User.create(username: "god_mode", email: "admin_test@test.com", password: "password", profile_picture: "https://cataas.com/cat", role: "admin")
  moderator_one = User.create(username: "moderater_one", email: "moderator_test@test.com", password: "password", profile_picture: "https://cataas.com/cat", role: "moderator", moderator_status: "approved")
  user_one = User.create(username: "user01", email: "user01_test@test.com", profile_picture: "https://cataas.com/cat", password: "password")
  user_two = User.create(username: "user02", email: "user02_test@test.com", profile_picture: "https://cataas.com/cat",  password: "password")
  user_three = User.create(username: "user03", email: "user03_test@test.com", profile_picture: "https://cataas.com/cat",  password: "password")
  puts "Users seeded!"

  # Channel Groups
  puts "Seeding Channel groups..."
  welcome_cg = Channelgroup.create(title: "Welcome!", description: "New to the forum? Keep to date with announcements and rules here!")
  pnb_cg = Channelgroup.create(title: "Pluck & Brew", description: "Anything and everything related to Pluck & Brew!")
  support_cg = Channelgroup.create(title: "Support", description: "Bug reports, suggestions, and feedback!")
  puts "Channel groups seeded!"

  # Channels
  puts "Seeding Channels..."
  delete_this_c = Channel.create(title: "Delete This", description: "For Testing Purposes", channelgroup: welcome_cg)

  rules_c = Channel.create(title: "Rules & FAQ", description: "All new users should check this out!", channelgroup: welcome_cg, post_permission: 'admin_moderator_only')
  announcements_c = Channel.create(title: "Announcements", description: "Stay updated on the game's development progress", channelgroup: welcome_cg, post_permission: 'admin_moderator_only')
  game_discussion_c = Channel.create(title: "Game Discussion", description: "Talk about the game here!", channelgroup: pnb_cg)
  guides_c = Channel.create(title: "Guides", description: "Stuck? Find guides here!", channelgroup: pnb_cg)

  bug_reports_c = Channel.create(title: "Bug Reports", description: "Found a bug?", channelgroup: support_cg)
  game_suggestions_c = Channel.create(title: "Game Suggestions", description: "The devs check this regularly", channelgroup: support_cg)
  forum_feedback_c = Channel.create(title: "Forum Feedback", description: "Moderators check this regularly", channelgroup: support_cg)
  puts "Channels seeded!"

  # Posts
  puts "Seeding Posts..."
  delete_post_test = Post.create(title: "Delete Post Test", body: "Delete This Please", channel: delete_this_c, user: user_two, user_id: user_two.id)

  game_post_test = Post.create(title: "The puzzles are hard!", body: "Is it just me? Am I just stupid? haha", channel: game_discussion_c, user: user_one, user_id: user_one.id)
  game_post_test_two = Post.create(title: "The puzzles are soooo easy", body: "When is it going to get harder!! I crave the challenge.", channel: game_discussion_c, user: user_three, user_id: user_three.id)
  game_post_test_three = Post.create(title: "The characters are really hot", body: "When do we get to romance them? Devs, I'm begging on my knees. Let me kiss Sebastien.", channel: game_discussion_c, user: user_two, user_id: user_two.id)

  guide_post_test = Post.create(title: "Here's how I solve the brewing puzzles every time", body: "Just count the number of lines coming from each node and make sure they're in the same position as the one on the chalkboard", channel: guides_c, user: user_two, user_id: user_two.id)

  support_post_test = Post.create(title: "Please add an inventory view outside of selling or foraging", body: "Would be nice to see everything I'm missing before I travel to a sanctum", channel: game_suggestions_c, user: user_one, user_id: user_one.id)
  support_post_test_test = Post.create(title: "The game crashes for me huhu", body: "I played the demo on itch and after a while, the brewing puzzle just bugs out.", channel: game_suggestions_c, user: user_three, user_id: user_three.id)
  puts "Posts seeded!"

  # Comments
  puts "Seeding Comments..."
  delete_comment_test = Comment.create(body: "Delete Comment Test", post: delete_post_test, user: user_one)

  game_comment_test = Comment.create(body: "You're not stupid. The puzzles take a while to get used to!", post: game_post_test, user: user_two)
  game_comment_test_two = Comment.create(body: "Nettle's my girlfriend.", post: game_post_test_three, user: user_three)
  game_comment_test_three = Comment.create(body: "Trevor is so tsundere-coded. I need him badly.", post: game_post_test_three, user: user_one)
  guide_comment_test = Comment.create(body: "Woah! I should try that!", post: guide_post_test, user: user_one)
  support_comment_test = Comment.create(body: "I would love that as well!", post: support_post_test, user: user_two)
  puts "Comments seeded!"

  # Reports
  puts "Seeding Reports..."
  report_post = Report.create(content_type: 'post', content_id: 1, user_id: 3, report_reason: 0)
  report_comment = Report.create(content_type: 'comment', content_id: 1, user_id: 4, report_reason: 0)
  puts "Reports seeded!"
end

test_data unless Rails.env.test?
rawgdata_seed unless Rails.env.test?
itchdata_seed unless Rails.env.test?
