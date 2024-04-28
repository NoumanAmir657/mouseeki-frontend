const BGFOCUSCOLOR = '#F6654B26'
const FONTFOCUSCOLOR = '#F6654B'
const BGCOLOR = '#FFF'
const FONTCOLOR = '#ACACAC'

const sideBarItems =
[
    {
        backgroundColor: BGFOCUSCOLOR,
        color: FONTFOCUSCOLOR,
        src: 'speaker_focus.svg',
        text: 'Accompaniment',
        link: '/accompaniment',
    },
    {
        backgroundColor: BGCOLOR,
        color: FONTCOLOR,
        src: 'levels.svg',
        text: 'Source Separation',
        link: '/sourceSeparation',
    },
    {
        backgroundColor: BGCOLOR,
        color: FONTCOLOR,
        src: 't_m.svg',
        text: 'Text-to-Music',
        link: '/textToMusic',
    },
    {
        backgroundColor: BGCOLOR,
        color: FONTCOLOR,
        src: 'mic.svg',
        text: 'Karaoke',
        link: '/karaoke',
    },
    // {
    //     backgroundColor: BGCOLOR,
    //     color: FONTCOLOR,
    //     src: 'tabs.svg',
    //     text: 'Guitar Tabs',
    //     link: '/guitarTabs',
    // },
    // {
    //     backgroundColor: BGCOLOR,
    //     color: FONTCOLOR,
    //     src: 'music.svg',
    //     text: 'Key Change',
    //     link: '/keyChange',
    // }
]

export default sideBarItems;