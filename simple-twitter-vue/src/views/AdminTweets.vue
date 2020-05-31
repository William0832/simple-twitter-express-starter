<template lang="pug">
   .container.py-5
    AdminNavs
    AdminTweetsIndex(
      :tweets='this.tweets'
      @after-delete-tweet =' afterDeleteTweet'
      )
</template>

<script>
import AdminNavs from "../components/AdminNavs";
import AdminTweetsIndex from "../components/AdminTweetsIndex";

const dummyTweets = {
  tweets: [
    {
      id: 12,
      description:
        "In voluptate deserunt. Nihil expedita unde adipisci ratione sit. Molestias soluta ex quis laboriosam voluptatem voluptatibus.",
      UserId: 3,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
        introduction: "enim",
        role: "user",
        createdAt: "2020-05-29T09:22:37.000Z",
        updatedAt: "2020-05-29T09:22:37.000Z"
      },
      Replies: [
        {
          id: 1,
          TweetId: 12,
          UserId: 3,
          comment: "laudantium",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 3,
            email: "user2@example.com",
            password:
              "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
            name: "user2",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
            introduction: "enim",
            role: "user",
            createdAt: "2020-05-29T09:22:37.000Z",
            updatedAt: "2020-05-29T09:22:37.000Z"
          }
        }
      ]
    },
    {
      id: 9,
      description:
        "Iure explicabo ut molestiae. Voluptate voluptas repellat doloribus. Qui nulla est quaerat quia.\n \rOmnis excepturi saepe perspiciatis sint qu",
      UserId: 3,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
        introduction: "enim",
        role: "user",
        createdAt: "2020-05-29T09:22:37.000Z",
        updatedAt: "2020-05-29T09:22:37.000Z"
      },
      Replies: [
        {
          id: 2,
          TweetId: 9,
          UserId: 2,
          comment: "qui",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        },
        {
          id: 5,
          TweetId: 9,
          UserId: 3,
          comment: "doloribus",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 3,
            email: "user2@example.com",
            password:
              "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
            name: "user2",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
            introduction: "enim",
            role: "user",
            createdAt: "2020-05-29T09:22:37.000Z",
            updatedAt: "2020-05-29T09:22:37.000Z"
          }
        }
      ]
    },
    {
      id: 25,
      description:
        "Libero et a. Aut dolores corrupti et exercitationem. Id officia deleniti iure sunt voluptatem atque. Dolorem eius ea ut assumenda consequatu",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: [
        {
          id: 3,
          TweetId: 25,
          UserId: 1,
          comment: "soluta",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 1,
            email: "root@example.com",
            password:
              "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
            name: "root",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
            introduction: "incidunt",
            role: "admin",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        },
        {
          id: 20,
          TweetId: 25,
          UserId: 2,
          comment:
            "Aut cum magnam. Omnis quibusdam maiores vel at sed. Velit excepturi aliquam ea quia optio recusandae ad vel. Porro totam laborum aut distinc",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        }
      ]
    },
    {
      id: 21,
      description:
        "Laborum blanditiis aut doloribus quidem. Est eveniet maiores est fugiat ea sit. Consequuntur optio voluptate molestias ipsam. Sed assumenda ",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: [
        {
          id: 4,
          TweetId: 21,
          UserId: 2,
          comment:
            "Voluptas veritatis architecto. Illum fugit est consequuntur ratione doloribus ut veniam. Laudantium molestiae maxime modi omnis omnis vitae ",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        }
      ]
    },
    {
      id: 18,
      description: "consequatur",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: [
        {
          id: 6,
          TweetId: 18,
          UserId: 2,
          comment: "et",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        }
      ]
    },
    {
      id: 15,
      description: "eum accusamus repellat",
      UserId: 1,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
        introduction: "incidunt",
        role: "admin",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: [
        {
          id: 7,
          TweetId: 15,
          UserId: 2,
          comment: "Qui odit quia.",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        },
        {
          id: 18,
          TweetId: 15,
          UserId: 2,
          comment: "in",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        }
      ]
    },
    {
      id: 16,
      description:
        "In tenetur sed. Esse magni non cum. Blanditiis facere sed. Voluptas debitis expedita non est officia.",
      UserId: 1,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
        introduction: "incidunt",
        role: "admin",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: [
        {
          id: 8,
          TweetId: 16,
          UserId: 2,
          comment: "architecto aut molestiae",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        },
        {
          id: 14,
          TweetId: 16,
          UserId: 1,
          comment: "Qui sit sed sequi atque.",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 1,
            email: "root@example.com",
            password:
              "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
            name: "root",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
            introduction: "incidunt",
            role: "admin",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        }
      ]
    },
    {
      id: 7,
      description: "veritatis porro aliquam",
      UserId: 3,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
        introduction: "enim",
        role: "user",
        createdAt: "2020-05-29T09:22:37.000Z",
        updatedAt: "2020-05-29T09:22:37.000Z"
      },
      Replies: [
        {
          id: 9,
          TweetId: 7,
          UserId: 2,
          comment:
            "Aut sit quaerat libero optio laborum quia atque nam ut.\nOdio unde sed fugiat nesciunt ut optio.\nConsectetur qui alias suscipit.",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        }
      ]
    },
    {
      id: 14,
      description: "Nisi natus aut eligendi sed facilis est eligendi.",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: [
        {
          id: 10,
          TweetId: 14,
          UserId: 3,
          comment: "Voluptatibus accusantium expedita vel aspernatur dolor ea.",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 3,
            email: "user2@example.com",
            password:
              "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
            name: "user2",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
            introduction: "enim",
            role: "user",
            createdAt: "2020-05-29T09:22:37.000Z",
            updatedAt: "2020-05-29T09:22:37.000Z"
          }
        },
        {
          id: 17,
          TweetId: 14,
          UserId: 2,
          comment:
            "Molestiae incidunt totam esse velit alias a at. Omnis impedit ad vel reiciendis aliquam. Debitis repellat nostrum explicabo amet alias. Laud",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        },
        {
          id: 26,
          TweetId: 14,
          UserId: 1,
          comment: "aaaa",
          createdAt: "2020-05-30T07:21:05.000Z",
          updatedAt: "2020-05-30T07:21:05.000Z",
          User: {
            id: 1,
            email: "root@example.com",
            password:
              "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
            name: "root",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
            introduction: "incidunt",
            role: "admin",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        },
        {
          id: 27,
          TweetId: 14,
          UserId: 1,
          comment: "sss",
          createdAt: "2020-05-30T07:24:18.000Z",
          updatedAt: "2020-05-30T07:24:18.000Z",
          User: {
            id: 1,
            email: "root@example.com",
            password:
              "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
            name: "root",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
            introduction: "incidunt",
            role: "admin",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        },
        {
          id: 33,
          TweetId: 14,
          UserId: 1,
          comment: "dddd",
          createdAt: "2020-05-30T07:31:05.000Z",
          updatedAt: "2020-05-30T07:31:05.000Z",
          User: {
            id: 1,
            email: "root@example.com",
            password:
              "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
            name: "root",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
            introduction: "incidunt",
            role: "admin",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        },
        {
          id: 34,
          TweetId: 14,
          UserId: 1,
          comment: "sss",
          createdAt: "2020-05-30T07:32:15.000Z",
          updatedAt: "2020-05-30T07:32:15.000Z",
          User: {
            id: 1,
            email: "root@example.com",
            password:
              "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
            name: "root",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
            introduction: "incidunt",
            role: "admin",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        },
        {
          id: 35,
          TweetId: 14,
          UserId: 1,
          comment: "sfaf",
          createdAt: "2020-05-30T07:34:34.000Z",
          updatedAt: "2020-05-30T07:34:34.000Z",
          User: {
            id: 1,
            email: "root@example.com",
            password:
              "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
            name: "root",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
            introduction: "incidunt",
            role: "admin",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        },
        {
          id: 36,
          TweetId: 14,
          UserId: 1,
          comment: "ggg",
          createdAt: "2020-05-30T07:35:16.000Z",
          updatedAt: "2020-05-30T07:35:16.000Z",
          User: {
            id: 1,
            email: "root@example.com",
            password:
              "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
            name: "root",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
            introduction: "incidunt",
            role: "admin",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        },
        {
          id: 37,
          TweetId: 14,
          UserId: 1,
          comment: "ddaf",
          createdAt: "2020-05-30T07:36:34.000Z",
          updatedAt: "2020-05-30T07:36:34.000Z",
          User: {
            id: 1,
            email: "root@example.com",
            password:
              "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
            name: "root",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
            introduction: "incidunt",
            role: "admin",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        },
        {
          id: 38,
          TweetId: 14,
          UserId: 1,
          comment: "dd",
          createdAt: "2020-05-30T07:37:05.000Z",
          updatedAt: "2020-05-30T07:37:05.000Z",
          User: {
            id: 1,
            email: "root@example.com",
            password:
              "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
            name: "root",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
            introduction: "incidunt",
            role: "admin",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        }
      ]
    },
    {
      id: 36,
      description:
        "Iste veniam aut explicabo qui excepturi enim error. Quis omnis vero laudantium ipsa placeat earum. Consequatur aut aut. Explicabo rem dolore",
      UserId: 3,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
        introduction: "enim",
        role: "user",
        createdAt: "2020-05-29T09:22:37.000Z",
        updatedAt: "2020-05-29T09:22:37.000Z"
      },
      Replies: [
        {
          id: 11,
          TweetId: 36,
          UserId: 2,
          comment:
            "Quis nihil odit omnis quaerat sed. Dicta expedita nostrum ea corporis. Illo et non possimus. Voluptatem velit voluptatem. Sed rem et quia eo",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        }
      ]
    },
    {
      id: 8,
      description:
        "Molestias perspiciatis aliquid beatae sequi harum dolorum nesciunt.",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: [
        {
          id: 12,
          TweetId: 8,
          UserId: 2,
          comment: "iusto molestias molestiae",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        }
      ]
    },
    {
      id: 39,
      description: "rerum",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: [
        {
          id: 13,
          TweetId: 39,
          UserId: 3,
          comment:
            "Itaque quae reprehenderit ut quisquam architecto.\nQui at delectus expedita quis natus et.\nOmnis quidem nam adipisci et qui.",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 3,
            email: "user2@example.com",
            password:
              "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
            name: "user2",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
            introduction: "enim",
            role: "user",
            createdAt: "2020-05-29T09:22:37.000Z",
            updatedAt: "2020-05-29T09:22:37.000Z"
          }
        }
      ]
    },
    {
      id: 44,
      description: "Iure dolores autem qui qui sit et eum est.",
      UserId: 3,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
        introduction: "enim",
        role: "user",
        createdAt: "2020-05-29T09:22:37.000Z",
        updatedAt: "2020-05-29T09:22:37.000Z"
      },
      Replies: [
        {
          id: 15,
          TweetId: 44,
          UserId: 2,
          comment: "Dolores consequatur dolores.",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        }
      ]
    },
    {
      id: 45,
      description: "quo",
      UserId: 3,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
        introduction: "enim",
        role: "user",
        createdAt: "2020-05-29T09:22:37.000Z",
        updatedAt: "2020-05-29T09:22:37.000Z"
      },
      Replies: [
        {
          id: 16,
          TweetId: 45,
          UserId: 2,
          comment:
            "Autem quas consequatur qui quae. Doloribus sint alias et. Exercitationem dignissimos repellat iusto odit qui id. Et modi sunt ratione quia d",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        },
        {
          id: 25,
          TweetId: 45,
          UserId: 3,
          comment:
            "Autem fugit dolores autem corporis dolor cumque et iusto. Et laudantium earum molestias excepturi est. Aut eaque officia ullam corrupti assu",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 3,
            email: "user2@example.com",
            password:
              "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
            name: "user2",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
            introduction: "enim",
            role: "user",
            createdAt: "2020-05-29T09:22:37.000Z",
            updatedAt: "2020-05-29T09:22:37.000Z"
          }
        }
      ]
    },
    {
      id: 6,
      description: "libero consequatur est",
      UserId: 1,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
        introduction: "incidunt",
        role: "admin",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: [
        {
          id: 19,
          TweetId: 6,
          UserId: 2,
          comment:
            "Porro dolore accusamus debitis omnis.\nSequi corporis fuga voluptatem.",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        }
      ]
    },
    {
      id: 23,
      description: "aperiam explicabo sequi",
      UserId: 1,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
        introduction: "incidunt",
        role: "admin",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: [
        {
          id: 21,
          TweetId: 23,
          UserId: 2,
          comment: "Non qui rerum quidem consequatur et est mollitia.",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        }
      ]
    },
    {
      id: 46,
      description: "ad id provident",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: [
        {
          id: 22,
          TweetId: 46,
          UserId: 2,
          comment:
            "Et dolores beatae et excepturi voluptatem nostrum placeat aliquid. Labore quo corrupti accusantium. Velit similique dignissimos at assumenda",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        }
      ]
    },
    {
      id: 28,
      description: "Corrupti quo qui provident quia error.",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: [
        {
          id: 23,
          TweetId: 28,
          UserId: 3,
          comment: "Labore ratione voluptas iusto.",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 3,
            email: "user2@example.com",
            password:
              "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
            name: "user2",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
            introduction: "enim",
            role: "user",
            createdAt: "2020-05-29T09:22:37.000Z",
            updatedAt: "2020-05-29T09:22:37.000Z"
          }
        },
        {
          id: 24,
          TweetId: 28,
          UserId: 2,
          comment:
            "Eveniet voluptatem rem ipsa et.\nAb aliquam amet illo dolor voluptates.\nAmet adipisci in ipsam quis voluptas sed in necessitatibus.",
          createdAt: "2020-05-29T09:22:46.000Z",
          updatedAt: "2020-05-29T09:22:46.000Z",
          User: {
            id: 2,
            email: "user1@example.com",
            password:
              "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
            name: "user1",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
            introduction:
              "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
            role: "user",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        }
      ]
    },
    {
      id: 52,
      description: "ggsfgs",
      UserId: 1,
      createdAt: "2020-05-29T14:57:21.000Z",
      updatedAt: "2020-05-29T14:57:21.000Z",
      User: {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
        introduction: "incidunt",
        role: "admin",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: [
        {
          id: 39,
          TweetId: 52,
          UserId: 1,
          comment: "afdaf",
          createdAt: "2020-05-30T12:46:31.000Z",
          updatedAt: "2020-05-30T12:46:31.000Z",
          User: {
            id: 1,
            email: "root@example.com",
            password:
              "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
            name: "root",
            avatar:
              "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
            introduction: "incidunt",
            role: "admin",
            createdAt: "2020-05-29T09:22:36.000Z",
            updatedAt: "2020-05-29T09:22:36.000Z"
          }
        }
      ]
    },
    {
      id: 1,
      description: "adipisci",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 2,
      description: "et veritatis quas",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 3,
      description:
        "Nihil magnam tenetur sit aut dolorem sapiente. Culpa eum eum soluta nihil quo impedit id. Et tempora aut quod. Molestiae consequatur reicien",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 4,
      description: "ex",
      UserId: 1,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
        introduction: "incidunt",
        role: "admin",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 5,
      description:
        "Et voluptatem aut nemo facere est alias. Velit repudiandae alias accusamus porro porro quod eveniet perferendis. Explicabo qui amet. Adipisc",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 10,
      description: "aut delectus ipsam",
      UserId: 3,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
        introduction: "enim",
        role: "user",
        createdAt: "2020-05-29T09:22:37.000Z",
        updatedAt: "2020-05-29T09:22:37.000Z"
      },
      Replies: []
    },
    {
      id: 11,
      description:
        "Quia at est dolorem perferendis.\nEt sit ut rem eum atque.\nAperiam sunt exercitationem et dolore.\nSequi natus minus dolore aliquam ut.\nQuas q",
      UserId: 1,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
        introduction: "incidunt",
        role: "admin",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 13,
      description: "consectetur",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 17,
      description:
        "Assumenda optio aut. Labore voluptate et ut asperiores maiores quibusdam velit quam. Sit impedit et suscipit. Aut ut ducimus libero accusamu",
      UserId: 3,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
        introduction: "enim",
        role: "user",
        createdAt: "2020-05-29T09:22:37.000Z",
        updatedAt: "2020-05-29T09:22:37.000Z"
      },
      Replies: []
    },
    {
      id: 19,
      description:
        "Delectus eius in. Eius dolorem neque. Corporis vel est nostrum molestias nulla est. Autem est facilis molestias neque non porro quisquam seq",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 20,
      description:
        "Ipsum aut iusto alias nam minus. Dicta eius corrupti deserunt. Ad aut minima impedit. Asperiores sit eveniet. Fugit id distinctio facere aut",
      UserId: 1,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
        introduction: "incidunt",
        role: "admin",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 22,
      description: "Velit omnis fugit omnis eos id culpa distinctio et.",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 24,
      description:
        "Molestiae consequatur temporibus.\nQuaerat dolore maxime ipsam.",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 26,
      description: "et",
      UserId: 1,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
        introduction: "incidunt",
        role: "admin",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 27,
      description:
        "Eum officiis earum repellat libero unde officiis. Temporibus necessitatibus est quasi ut dolore. Magnam non occaecati. Quaerat natus aut ass",
      UserId: 1,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
        introduction: "incidunt",
        role: "admin",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 29,
      description:
        "Facilis sapiente dolorum deserunt dicta eos facilis consectetur optio.",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 30,
      description:
        "Quis nulla aut laudantium fuga optio quam sit amet doloremque.",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 31,
      description:
        "Sed in soluta dicta et aperiam dolore. Occaecati quam voluptatibus provident omnis quaerat quia. Quis temporibus magnam consequatur et corru",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 32,
      description:
        "Corporis quia laboriosam voluptate.\nRerum accusantium commodi libero omnis.\nIn voluptatem sit dolorum ex.\nMagnam quia consequatur est sunt q",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 33,
      description:
        "In inventore rerum. Aut nam soluta voluptate voluptates hic dolore earum. Ut officiis beatae.",
      UserId: 3,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
        introduction: "enim",
        role: "user",
        createdAt: "2020-05-29T09:22:37.000Z",
        updatedAt: "2020-05-29T09:22:37.000Z"
      },
      Replies: []
    },
    {
      id: 34,
      description: "tenetur laboriosam magni",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 35,
      description: "nulla",
      UserId: 3,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
        introduction: "enim",
        role: "user",
        createdAt: "2020-05-29T09:22:37.000Z",
        updatedAt: "2020-05-29T09:22:37.000Z"
      },
      Replies: []
    },
    {
      id: 37,
      description: "maiores",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 38,
      description:
        "Aut reprehenderit dolorum dolorem soluta eos aut voluptatibus. Ex ut et omnis qui nemo velit. Rerum qui reiciendis occaecati ut fugit volupt",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 40,
      description:
        "Laudantium qui mollitia. Sapiente praesentium omnis veritatis. Omnis et inventore aliquid excepturi explicabo consectetur in. Sit consequunt",
      UserId: 1,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
        introduction: "incidunt",
        role: "admin",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 41,
      description:
        "Ducimus laborum doloribus nulla. Magni non sed nihil minus quibusdam. Fuga laudantium qui eos. Dicta minima quis sint vitae magnam dolor fac",
      UserId: 3,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
        introduction: "enim",
        role: "user",
        createdAt: "2020-05-29T09:22:37.000Z",
        updatedAt: "2020-05-29T09:22:37.000Z"
      },
      Replies: []
    },
    {
      id: 42,
      description: "Minima autem nihil consequuntur.",
      UserId: 3,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
        introduction: "enim",
        role: "user",
        createdAt: "2020-05-29T09:22:37.000Z",
        updatedAt: "2020-05-29T09:22:37.000Z"
      },
      Replies: []
    },
    {
      id: 43,
      description:
        "Asperiores hic nemo explicabo eveniet consequatur quidem corrupti. Est consequatur quaerat aut. Dolor expedita maxime. Nisi veniam pariatur ",
      UserId: 1,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
        introduction: "incidunt",
        role: "admin",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 47,
      description: "Quasi architecto eum dicta et a blanditiis sapiente.",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 48,
      description:
        "Maiores qui culpa.\nVoluptatem quam et deserunt qui enim dolore.",
      UserId: 3,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$714kdA7VvRb8GS6.WxBmFu.OIdvbuysDXoUQusvkSo8N8q6W6H3By",
        name: "user2",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=55.42792213290439",
        introduction: "enim",
        role: "user",
        createdAt: "2020-05-29T09:22:37.000Z",
        updatedAt: "2020-05-29T09:22:37.000Z"
      },
      Replies: []
    },
    {
      id: 49,
      description: "Ipsum assumenda quis.",
      UserId: 2,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$X.93jPbvSLJvPrAjMVyurOa82FZK0DpajNe0a4yDyo/A6PMndem4e",
        name: "user1",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=69.1250168900434",
        introduction:
          "Id vero temporibus similique deserunt ea. Et placeat repudiandae maiores vel ut. Aut aut doloremque nulla nostrum architecto illo ex quibusdam iusto. Dolor et alias ullam aliquid culpa natus facere.",
        role: "user",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 50,
      description:
        "Qui cupiditate quam. Dolores delectus iure eius aliquid. Molestiae iure et a voluptates ut. Asperiores et cum consequatur suscipit. Repellat",
      UserId: 1,
      createdAt: "2020-05-29T09:22:36.000Z",
      updatedAt: "2020-05-29T09:22:36.000Z",
      User: {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
        introduction: "incidunt",
        role: "admin",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 51,
      description: "ssss",
      UserId: 1,
      createdAt: "2020-05-29T14:56:43.000Z",
      updatedAt: "2020-05-29T14:56:43.000Z",
      User: {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
        introduction: "incidunt",
        role: "admin",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 53,
      description: "fff",
      UserId: 1,
      createdAt: "2020-05-30T16:38:27.000Z",
      updatedAt: "2020-05-30T16:38:27.000Z",
      User: {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
        introduction: "incidunt",
        role: "admin",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    },
    {
      id: 54,
      description: "sss",
      UserId: 1,
      createdAt: "2020-05-30T17:18:46.000Z",
      updatedAt: "2020-05-30T17:18:46.000Z",
      User: {
        id: 1,
        email: "root@example.com",
        password:
          "$2a$10$99njYFZOf1M0maJOd56qVOuu.MwZmji2bR6NJkTsWPdnj3rlGJ8Um",
        name: "root",
        avatar:
          "https://loremflickr.com/240/240/man,women/?random=52.91279172455272",
        introduction: "incidunt",
        role: "admin",
        createdAt: "2020-05-29T09:22:36.000Z",
        updatedAt: "2020-05-29T09:22:36.000Z"
      },
      Replies: []
    }
  ]
};

export default {
  components: {
    AdminNavs,
    AdminTweetsIndex
  },
  data() {
    return {
      tweets: []
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    fetchTweets() {
      this.tweets = dummyTweets.tweets;
    },
    afterDeleteTweet(tweetId) {
      console.log(tweetId);
    }
  }
};
</script>