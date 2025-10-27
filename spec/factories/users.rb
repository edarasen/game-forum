FactoryBot.define do
  factory :user do
    email {"user_test@test.com"}
    username {"test_user"}
    role {"user"}
    password {"password"}
  end
end
