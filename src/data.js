import img from './assets/imglesson.png'
import video from './assets/video.png'

const questions = [
    {
        lessonType: 'Overview',
        lessonDescOverview: 'The Mastering Front-End Development course is designed to equip students with the essential skills and knowledge needed to become proficient front-end developers. Front-end development focuses on the client-side of web development, encompassing the creation of visually appealing, interactive, and user-friendly interfaces.',
        lessonDescOutcome: 'Upon successful completion of the Mastering Front-End Development course, students will possess the knowledge and skills necessary to create responsive, interactive, and visually appealing front-end interfaces for websites and web applications. Graduates will be well-equipped to pursue careers as front-end developers, web designers',
        lessonImg: img
    },
    {
        lessonType: 'Video Lesson',
        lessonImg: video
    },
    {
        lessonType: 'Test - multiple choice',
        question: 'Javascript first question title?',
        answerOptions: ['First option', 'Second option', 'Third option', 'Fourth option'],
        correctAnswer: ['First option']
    },
    {
        lessonType: 'input'
    },
    {
        lessonType: 'Test - one choice'
    },
    {
        lessonType: 'upload file'
    }
]

export default questions