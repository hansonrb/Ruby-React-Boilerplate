# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

1000.times do |i|
    p i if i % 100 == 0
    User.create(
        name: Faker::Name.name,
        email: Faker::Internet.email,
        password: 'P@ssw0rd',
        role: rand(0 .. 2)
    )
end

50000.times do |i|
    p i if i % 500 == 0

    Timezone.create(
        name: Faker::Company.bs,
        city: Faker::Address.city,
        difference: rand(-24 .. 28).to_f / 2.to_f,
        user_id: rand(1 .. 1000)
    )
end
