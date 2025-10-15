FactoryBot.define do
  factory :comment do
    body {"Test Comment"}
    is_reported {false}
  end
  factory :reported_comment do
    body {"Offensive Content Here"}
    is_reported {true}
  end
end
