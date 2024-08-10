import prisma from '../src/utils/db'

async function seed(): Promise<void> {
    await createUsers()
    await createProfiles()
    await createPosts()
    await createComments()

    process.exit(0)
}

async function createUsers(): Promise<void> {
    const createdUsers = await prisma.user.createMany({
        data: [
            {
                username: 'alicemart',
                name: 'Alice Martin',
                email: 'alice@martin.com',
            },
            {
                username: 'johnapple',
                name: 'John Appleseed',
                email: 'john@apple.com',
            },
            {
                username: 'thojensen',
                name: 'Thomas Jensen',
                email: 'me@thojensen.com',
            },
        ],
    })

    console.log(`${createdUsers.count} users created`, createdUsers)
}

async function createProfiles(): Promise<void> {
    const createdProfiles = await prisma.profile.createMany({
        data: [
            {
                birthday: new Date(),
                bio: 'This is a bio',
                location: 'London, UK',
                avatar: 'https://www.gravatar.com/avatar',
                userId: 1,
            },
            {
                birthday: new Date(),
                bio: 'This is a bio',
                location: 'San Francisco, CA',
                avatar: 'https://www.gravatar.com/avatar',
                userId: 2,
            },
            {
                birthday: new Date(),
                bio: 'This is a bio',
                location: 'Arendal, Norway',
                avatar: 'https://www.gravatar.com/avatar',
                userId: 3,
            },
        ],
    })

    console.log(`${createdProfiles.count} profiles created`, createdProfiles)
}

async function createPosts(): Promise<void> {
    const createdPosts = await prisma.post.createMany({
        data: [
            {
                title: 'Monday Motivation 💪',
                content:
                    'It’s the start of a new week! 🌟 Remember, success doesn’t come from what you do occasionally, but from what you do consistently. Set your goals, stay focused, and make this week amazing! What’s one goal you’re working on? Drop it below! 👇 #MondayMotivation #Goals',
                userId: 1,
            },
            {
                title: 'Foodie Alert 🍕',
                content:
                    'Craving something delicious? Check out this mouthwatering Margherita pizza from my favorite local pizzeria! 🍕 Fresh basil, melted mozzarella, and that perfect crust—it’s a slice of heaven. Tag a friend you’d share this with! #Foodie #PizzaLovers #EatLocal',
                userId: 1,
                attachments:
                    'https://image.newyorkcity.ca/wp-content/uploads/2013/12/Best-Pizza-in-New-York.jpeg.webp',
            },
            {
                title: 'Travel Throwback 🌍',
                content:
                    'Missing those sunset beach walks and palm trees swaying in the breeze. 🌅 Take me back to Bali! 🌴 Where’s your dream destination? Let’s inspire each other with some travel vibes. Drop a pic or name a place you’ve been dreaming of visiting! ✈️ #ThrowbackThursday #Wanderlust #TravelGoals',
                userId: 2,
                attachments:
                    'https://balidave.com/wp-content/uploads/2022/11/best-hotel-bali.jpeg',
            },
            {
                title: 'Life Hack of the Day 💡',
                content:
                    'Tired of your headphones getting tangled? Try this simple hack: wrap them around a binder clip. No more knots, and you’ll always have them handy! 🎧 What’s a life hack you swear by? Share it with us! #LifeHack #TipsAndTricks #Genius',
                userId: 2,
            },
            {
                title: 'Fitness Friday 🏋️‍♀️',
                content:
                    'Kick off your weekend with a solid workout! Whether it’s lifting, running, or yoga—get that body moving and those endorphins flowing. 💥 What’s your favorite way to stay active? Let’s motivate each other! #FitnessFriday #WorkoutMotivation #HealthyLiving',
                userId: 3,
            },
            {
                title: 'Tech Talk 🚀',
                content:
                    'Just got my hands on the latest smartphone, and I’m blown away by the camera quality! 📱 The night mode is insane, and the battery life? Game-changer. Who else loves geeking out over new gadgets? Let’s chat tech in the comments! #TechTalk #GadgetLover #Innovation',
                userId: 3,
                attachments:
                    'https://thumbs.dreamstime.com/b/apple-iphone-pro-max-smartphone-new-models-demo-display-launch-store-modern-mobile-phone-technology-concept-bangkok-thailand-256484385.jpg',
            },
        ],
    })

    console.log(`${createdPosts.count} posts created`, createdPosts)
}

async function createComments(): Promise<void> {
    const createdComments = await prisma.comment.createMany({
        data: [
            {
                content: 'Wow! That pizza looks so yummy!',
                userId: 3,
                postId: 2,
            },
            {
                content: "I'm gonna try this right away!",
                userId: 1,
                postId: 4,
            },
            {
                content: 'Wowie! I really want this phone now!',
                userId: 2,
                postId: 6,
            },
        ],
    })

    console.log(`${createdComments.count} comments created`, createdComments)
}

seed().catch(async (error): Promise<void> => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
})
