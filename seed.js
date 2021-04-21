export function seedDatabase(firebase) {
    const users = [
        {
            userId: 'y0pKzZVg1xfY9dl02gbujqFGiQO2',
            username: 'foo',
            fullName: 'Foo Boo',
            emailAddress: 'foo@gmail.com',
            following: ['2', '3', '4'],
            dateCreated: Date.now(),
        },
        {
            userId: '2',
            username: 'raphael',
            fullName: 'Raffaello Sanzio da Urbino',
            emailAddress: 'raphael@sanzio.com',
            following: [],
            dateCreated: Date.now(),
        },
        {
            userId: '3',
            username: 'dali',
            fullName: 'Salvador Dalí',
            emailAddress: 'salvador@dali.com',
            following: [],
            dateCreated: Date.now(),
        },
        {
            userId: '4',
            username: 'orwell',
            fullName: 'George Orwell',
            emailAddress: 'george@orwell.com',
            following: [],
            dateCreated: Date.now(),
        },
    ]

    const posts = [
        {
            owner: 'NvPY9M9MzFTARQ6M816YAzDJxZ72',
            URL:
                'https://images.unsplash.com/photo-1617449743320-44a20500d167?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80',
            caption: 'sick photo',
            likes: ['2', '3'],
            dateCreated: Date.now(),
        },
        {
            owner: '1',
            URL:
                'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            caption: 'sick photo',
            likes: ['NvPY9M9MzFTARQ6M816YAzDJxZ72'],
            dateCreated: Date.now(),
        },
        {
            owner: '2',
            URL:
                'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixid=MXwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw4NTc5Njc0fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
            caption: 'sick photo',
            likes: ['2', '3'],
            dateCreated: Date.now(),
        },
    ]

    // eslint-disable-next-line prefer-const
    users.forEach((user) => {
        firebase.firestore().collection('users').doc(user.userId).set(user)
    })

    // eslint-disable-next-line prefer-const
    posts.forEach((post) => {
        firebase.firestore().collection('posts').add(post)
    })
}
