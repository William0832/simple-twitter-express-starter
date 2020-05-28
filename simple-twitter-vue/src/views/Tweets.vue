<template lang="pug">
  .container.py-5
      .row
        .col-md-8
          TweetNew(:user-id='currentUser.id' @after-create-tweet='afterCreateTweet')
          TweetIndex( :init-tweets='tweets')
        .col-md-4
          UserTop
</template>

<script>
import TweetNew from "../components/TweetNew";
import TweetIndex from "../components/TweetIndex";
import UserTop from "../components/UserTop";

const dummyTweets = {
  tweets: [
    {
      id: 52,
      description: "asdsdasdasdasdasdasd",
      UserId: 1,
      createdAt: "2020-05-27T07:46:45.000Z",
      updatedAt: "2020-05-27T07:46:45.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 51,
      description: "asdsdasdasdasdasdasd",
      UserId: 1,
      createdAt: "2020-05-27T07:45:27.000Z",
      updatedAt: "2020-05-27T07:45:27.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 44,
      description:
        "Et sit tenetur sequi asperiores nam ratione aut beatae. Placeat neque facilis adipisci nesciunt sit non. Mollitia nihil quis. Reiciendis ex ",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 2,
      Likes_count: 2,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 42,
      description:
        "Mollitia odio deleniti sunt sit reprehenderit quam. Consequatur dolore repellendus qui veritatis atque doloremque eum illo. Repellendus quas",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 2,
      Likes_count: 2,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 18,
      description:
        "Rerum rerum ullam provident. Dolorum ipsum aut consequatur aut consequatur facilis. Consequatur consequatur nobis quisquam sunt nulla volupt",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 1,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 47,
      description: "Possimus doloremque tempora eos.",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 1,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 49,
      description: "expedita consectetur sed",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 32,
      description:
        "Blanditiis velit repellendus molestiae autem aut animi quod.",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 1,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 25,
      description:
        "Cumque in quis. Quas ipsam suscipit ipsum vel ducimus iusto. Voluptas nobis recusandae saepe aut in sunt alias omnis et. Voluptatem tenetur ",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 3,
      Likes_count: 3,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 30,
      description:
        "Similique voluptas sint natus vitae quia. Debitis ipsum dolores eligendi et qui eum corrupti similique. Quisquam officia minus exercitatione",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 1,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 6,
      description:
        "Nam dolorem exercitationem mollitia vero. Ipsa asperiores qui. Harum vero eligendi vitae. Saepe at veniam fugiat fugiat inventore maxime eos",
      UserId: 1,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 50,
      description: "rerum",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 29,
      description:
        "Excepturi dicta veritatis explicabo et ducimus nihil illum facilis adipisci. Reiciendis aut quia molestias. Ea rerum et exercitationem molli",
      UserId: 3,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 2,
      User: {
        id: 3,
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=56.34877453348142"
      }
    },
    {
      id: 35,
      description:
        "Aut sed molestiae sed maiores accusantium dolorem dolore est. Veniam eius nostrum totam illum. Magnam mollitia dolorem ut quidem aut sed acc",
      UserId: 1,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 1,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 34,
      description:
        "Sunt omnis sint labore est odit officia. Assumenda dignissimos ad ea quia amet id. Ex sed iste et nulla voluptas dolores dignissimos laborum",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 1,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 9,
      description:
        "Consequatur et sunt corporis repellat ab ex. Voluptates nesciunt aut sit vel. Reiciendis nulla et blanditiis at in incidunt ut.\n \rSoluta rer",
      UserId: 1,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 4,
      description: "Et similique porro voluptatum.",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 11,
      description: "magnam aspernatur est",
      UserId: 3,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 3,
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=56.34877453348142"
      }
    },
    {
      id: 31,
      description:
        "Quia nemo quos.\nUt labore aut dolore animi quod quo.\nEarum quae adipisci voluptates beatae reiciendis exercitationem voluptas deserunt.\nAper",
      UserId: 3,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 1,
      Likes_count: 1,
      User: {
        id: 3,
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=56.34877453348142"
      }
    },
    {
      id: 21,
      description:
        "Odio nobis fugiat corrupti neque incidunt est dolorum natus nesciunt. Dolorem atque deleniti labore natus rem recusandae aut porro. Doloribu",
      UserId: 3,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 1,
      User: {
        id: 3,
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=56.34877453348142"
      }
    },
    {
      id: 10,
      description:
        "Dignissimos nihil ut aut laboriosam nostrum animi consequatur.\nSit excepturi consequatur autem qui.\nPariatur nihil aut.\nUt aut tenetur rem.\n",
      UserId: 3,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 1,
      User: {
        id: 3,
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=56.34877453348142"
      }
    },
    {
      id: 15,
      description:
        "Neque ipsum labore et ut officiis in expedita provident facilis. Id officia explicabo et vero totam error consequatur. Et et eveniet repelle",
      UserId: 1,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 1,
      Likes_count: 0,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 13,
      description:
        "Quos et vero. Nihil assumenda dolores excepturi enim placeat rerum omnis quod voluptates. Aut dolores consequatur et est omnis.\n \rDeserunt e",
      UserId: 1,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 7,
      description: "dolorem qui tempora",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 24,
      description: "ducimus dicta expedita",
      UserId: 3,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 3,
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=56.34877453348142"
      }
    },
    {
      id: 17,
      description: "Voluptatem dolore repellat sint ea qui non.",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 2,
      Likes_count: 2,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 8,
      description: "veritatis",
      UserId: 1,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 2,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 45,
      description: "Quia unde sapiente ut.",
      UserId: 1,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 1,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 14,
      description:
        "Itaque ut temporibus amet provident qui sed ipsam deserunt id.",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 3,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 20,
      description: "Est commodi doloremque ipsa est.",
      UserId: 1,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 26,
      description:
        "Beatae non est est at quos voluptate sit autem.\nIllum optio omnis animi dicta recusandae porro et asperiores dolore.\nAliquam debitis perfere",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 27,
      description:
        "Rerum illo non nemo harum vel ducimus et. Pariatur distinctio quisquam aut repellat ut non. Nam ea est non et. Iste et possimus eaque eligen",
      UserId: 3,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 3,
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=56.34877453348142"
      }
    },
    {
      id: 37,
      description:
        "Harum ducimus impedit vel in quod.\nIusto vel nesciunt est ut molestias tenetur iste quibusdam.\nIncidunt iure pariatur veritatis voluptates.\n",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 1,
      Likes_count: 1,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 23,
      description:
        "Illo vero repudiandae quia cumque numquam reprehenderit iure.\nVeniam recusandae beatae.\nVelit odit qui nihil nam recusandae officiis minus.\n",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 2,
      Likes_count: 2,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 2,
      description: "dolor",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 1,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 5,
      description:
        "Soluta quis a. Est excepturi qui voluptatem excepturi nostrum minima quas delectus sequi. Libero voluptas et nam repellendus numquam hic nih",
      UserId: 1,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 1,
      Likes_count: 0,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 22,
      description: "Sunt odit enim ab sunt et.",
      UserId: 1,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 28,
      description: "corrupti et quo",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 39,
      description:
        "Architecto similique fugit optio sed explicabo ea aliquid quo nostrum.",
      UserId: 3,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 3,
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=56.34877453348142"
      }
    },
    {
      id: 3,
      description:
        "Maiores ex sed unde provident placeat. Fugit iusto doloremque. Veritatis commodi consequatur natus rem. Ipsam quo accusamus odio placeat. At",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 2,
      Likes_count: 2,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 19,
      description:
        "Quis et dolorem modi porro odit iste ex vel est.\nConsequatur iusto debitis.",
      UserId: 1,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 2,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 48,
      description:
        "Consequatur sit aut eos ut sunt in sint rem. Autem praesentium et. Corporis voluptatibus enim esse odio nihil consectetur commodi quia.",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 1,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 16,
      description:
        "Sit voluptatem aliquam omnis voluptatem sit sunt beatae. Magnam voluptatem non. Reiciendis est molestiae. Quasi quaerat vel. Accusamus velit",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 1,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 36,
      description: "ea",
      UserId: 1,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 33,
      description:
        "Itaque nihil excepturi qui officiis. Numquam in dignissimos maxime dicta enim beatae quas qui ab. Ad ad perferendis.",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 46,
      description: "Consectetur itaque laborum nisi similique incidunt.",
      UserId: 3,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 3,
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=56.34877453348142"
      }
    },
    {
      id: 41,
      description:
        "In error itaque modi dolores. Facere animi voluptatem. Est quaerat temporibus ut distinctio adipisci nulla aut minus.",
      UserId: 1,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 1,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 12,
      description:
        "Quia doloremque mollitia commodi voluptates eos eligendi qui. Modi illum quas alias ex occaecati. Qui quo qui quas alias quaerat ad dolor au",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 1,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 40,
      description:
        "Voluptas commodi quos et. Ex minus hic autem illum. Incidunt reprehenderit molestiae rem est et itaque.",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 2,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    },
    {
      id: 1,
      description:
        "Tempora saepe odit odit dolores. Animi quis porro mollitia blanditiis explicabo earum eveniet enim libero. Vel et eum impedit sit eligendi e",
      UserId: 1,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 1,
      Likes_count: 0,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 38,
      description:
        "Consequatur quod et reprehenderit earum. Maiores ut veniam natus in. Et optio id aliquam culpa animi sit impedit est officiis.\n \rRerum eum m",
      UserId: 1,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 1,
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=90.59691100585958"
      }
    },
    {
      id: 43,
      description:
        "Non culpa consequatur hic. Harum dolor qui rerum ipsum. Reiciendis vitae perspiciatis soluta maiores. Tenetur veniam veniam iste iusto inven",
      UserId: 2,
      createdAt: "2020-05-27T06:49:21.000Z",
      updatedAt: "2020-05-27T06:49:21.000Z",
      Replies_count: 0,
      Likes_count: 0,
      User: {
        id: 2,
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=42.683943627946455"
      }
    }
  ]
};

const dummyUser = {
  currentUser: {
    id: 1,
    name: "root",
    email: "root@example.com",
    avatar:
      "https://loremflickr.com/240/240/man,women/?random=76.38409798671886",
    role: "admin"
  },
  isAuthenticated: true
};

export default {
  components: {
    TweetNew,
    TweetIndex,
    UserTop
  },
  data() {
    return {
      tweets: [],
      currentUser: dummyUser.currentUser
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    fetchTweets() {
      this.tweets = dummyTweets.tweets;
    },
    afterCreateTweet(tweet) {
      // console.log(tweet);
      this.tweets.unshift({
        id: tweet.id,
        description: tweet.description,
        UserId: this.currentUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        Replies_count: 0,
        Likes_count: 0,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          avatar: this.currentUser.avatar
        }
      });
    }
  }
};
</script>